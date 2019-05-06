import React, { Component } from "react";
import { RoomContext } from "../Context";

import Room from "./Room";
import Title from "./Title";

export default class FeaturedRooms extends Component {
  static contextType = RoomContext;
  render() {
    let { loading, featuredRoom: rooms } = this.context;
    console.log(this.context, rooms);
    const fRooms = rooms.map(room => {
      return <Room key={room.id} room={room} />;
    });
    console.log(fRooms);

    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-rooms-center">
          {loading ? "loading" : fRooms}
        </div>
      </section>
    );
  }
}
