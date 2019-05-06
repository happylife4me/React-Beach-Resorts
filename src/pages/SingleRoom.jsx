import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../Context";
import StyledHero from "../components/StyledHero";

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    console.log(" from constructor ", this.props);

    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    };
  }

  static contextType = RoomContext;

  componentDidMount() {
    //console.log(" from componentDidMount ", this.props);
  }

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    console.log("from SingleRoom => render ", room);
    if (!room) {
      console.log("from SingleRoom => render => if ", room);
      return (
        <div className="error">
          <h3>no such room cloud be found ...</h3>

          <Link to="/rooms" className="btn-promary">
            Back to rooms
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = room;

    const [mainImg, ...defaultImg] = images;
    return (
      <>
        <StyledHero hero="roomsHero" img={images[0]}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              Back to rooms
            </Link>{" "}
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {images.map((item, index) => (
              <img key={index} src={item} alt={name} />
            ))}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>price : {size} SQFT</h6>
              <h6>
                max capcity :{" "}
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? `pets allowed` : `no pets allowed`}</h6>
              <h6>{breakfast && "free brekfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => (
              <li key={index}>-{item}</li>
            ))}
          </ul>
        </section>
      </>
    );
  }
}
