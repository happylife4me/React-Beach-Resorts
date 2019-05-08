import React, { Component } from "react";

import items from "./data";
import { all } from "q";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRoom: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    maxPrice: 0,
    minprice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    console.log("RoomProvider => componentDidMount", rooms);
    let featuredRoom = rooms.filter(room => room.featured === true);
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));

    this.setState({
      rooms,
      featuredRoom,
      sortedRooms: rooms,
      loading: false,
      maxPrice,
      maxSize,
      price: maxPrice
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(img => img.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  handleChange = event => {
    const { target } = event;
    //const { type } = target;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    //console.log("RoomProvider => handleChange", target.type, name, value);

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    console.log("RoomProvider => filterRooms");
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    //room filter
    let tempRooms = [...rooms];
    console.log("RoomProvider => filterRooms  => type object", this.state.type);
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    console.log(
      "RoomProvider => filterRooms  =>type  filter => tempRooms object",
      tempRooms
    );

    //capacity filter
    capacity = parseInt(capacity);
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    console.log(
      "RoomProvider => filterRooms  =>capacity  filter => tempRooms object",
      tempRooms
    );

    // price filter
    price = parseInt(price);
    tempRooms = tempRooms.filter(room => room.price <= price);
    console.log(
      "RoomProvider => filterRooms  =>price  filter => tempRooms object",
      tempRooms
    );

    //min & max room size filter
    console.log(
      "RoomProvider => filterRooms  =>room size filter => min & max object",
      minSize,
      maxSize
    );
    minSize = parseInt(minSize);
    maxSize = parseInt(maxSize);
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );
    console.log(
      "RoomProvider => filterRooms  =>room size filter => tempRooms object",
      tempRooms
    );

    // break fast filter
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === breakfast);
    }
    console.log(
      "RoomProvider => filterRooms  =>breakfast filter => tempRooms object",
      tempRooms
    );

    //pet filter
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === pets);
    }
    console.log(
      "RoomProvider => filterRooms  =>pet filter => tempRooms object",
      tempRooms
    );

    // change state after all filters
    console.log("RoomProvider => filterRooms  => tempRooms object", tempRooms);
    this.setState({ sortedRooms: tempRooms });
    console.log(
      "RoomProvider => filterRooms  => sortedRooms object",
      this.state.sortedRooms
    );
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
