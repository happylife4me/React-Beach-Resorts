import React, { Component } from "react";

import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

import Title from "./Title";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "Free Cocktailes",
        info: "some djkshk  sdhfkf jhfsdfkofkljsdk j jskfjsk iojofjsdfj"
      },
      {
        icon: <FaHiking />,
        title: "Endless Hiking",
        info: "some djkshk  sdhfkf jhfsdfkofkljsdk j jskfjsk iojofjsdfj"
      },
      {
        icon: <FaShuttleVan />,
        title: "free shuttle van",
        info: "some djkshk  sdhfkf jhfsdfkofkljsdk j jskfjsk iojofjsdfj"
      },
      {
        icon: <FaBeer />,
        title: "Strongest Beer",
        info: "some djkshk  sdhfkf jhfsdfkofkljsdk j jskfjsk iojofjsdfj"
      }
    ]
  };

  render() {
    return (
      <div>
        <section className="services">
          <Title title="services" />
          <div className="services-center">
            {this.state.services.map((item, index) => {
              return (
                <article key={index} className="service">
                  <span>{item.icon}</span>
                  <h6>{item.title}</h6>
                  <p>{item.info}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}
