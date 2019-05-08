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

  let people = getUnique(rooms, "capacity");
  people = people.map((item, index) => (
    <option value={item} key={index}>
      {item}
    </option>
  ));

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      {/* room select type */}
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

        {/* capacity select type */}
        <div className="form-group">
          <label htmlFor="type">Guests</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="from=control"
            onChange={handleChange}
          >
            {people}
          </select>
        </div>

        {/* Room Price */}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input
            type="range"
            name="price"
            min={minprice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
            className="from=control"
          />
        </div>

        {/*Room size*/}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div type="size-inputs">
            {/*Room min size*/}
            <input
              type="number"
              name="minSize"
              min={minSize}
              id="size"
              value={minSize}
              onChange={handleChange}
              className="from=control"
            />
            {/*Room max size*/}
            <input
              type="number"
              name="maxSize"
              min={maxSize}
              id="size"
              value={maxSize}
              onChange={handleChange}
              className="from=control"
            />
          </div>
        </div>

        {/*room extra*/}
        <div className="form-group">
          {/*break fast*/}
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          {/*pet*/}
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
      </form>
    </section>
  );
}
