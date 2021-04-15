import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../Components/Banner";
import Services from "../components/Services";
import FeaturedRooms from "../Components/FeaturedRooms";
const home = () => {
  return (
    <>
      <Hero>
        <Banner
          title="luxurious rooms"
          subtitle="deluxe rooms starting at $299"
        >
          <Link to="/rooms" className="btn-primary">
            our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </>
  );
};

export default home;
