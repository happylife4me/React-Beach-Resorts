import React from "react";

import { useContext } from "react";
import { RoomContext } from "../Context";
import Title from "../components/Title";

const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

export default function RoomsFilter({ rooms }) {
  const context = useContext(RoomContext);
  console.log("RoomsFilter = > ", context);

  const {
    handleChange,
    type,
    capacity,
    price,
    maxPrice,
    minprice,
    minSize,
    maxSize,
    breakfast,
    pets
  } = context;

  //get unique types
  let types = getUnique(rooms, "type");
  types = ["all", ...types];

  //map to jsx
  types = types.map((item, index) => (
    <option value={item} key={index}>
      {item}
    </option>
  ));

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="from=control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
      </form>
    </section>
  );
}
