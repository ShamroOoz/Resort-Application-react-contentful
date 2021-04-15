import React, { createContext, useState, useEffect, useContext } from "react";
import items from "./data";

const RoomContext = createContext();

const initialState = {
  rooms: [],
  sortedRooms: [],
  featuredRooms: [],
  loading: true,
};
export const RoomProvider = ({ children }) => {
  const formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  //Hooks
  const [data, setdata] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        let rooms = await formatData(items);
        let featuredRooms = rooms.filter((room) => room.featured === true);
        //
        let maxPrice = Math.max(...rooms.map((item) => item.price));
        let maxSize = Math.max(...rooms.map((item) => item.size));
        setdata((precData) => ({
          ...precData,
          rooms,
          featuredRooms,
          sortedRooms: rooms,
          loading: false,
          price: maxPrice,
          maxPrice,
          maxSize,
        }));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const getRoom = (slug) => {
    let tempRooms = [...data.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  const handleChange = (event) => {
    let { rooms } = data;
    let state = {
      type: "all",
      capacity: 1,
      price: 0,
      minPrice: 0,
      maxPrice: 0,
      minSize: 0,
      maxSize: 0,
      breakfast: false,
      pets: false,
    };
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);
    state = { [name]: value };

    console.log(state);

    // let tempRooms = [...rooms];
    // if (value !== "all") {
    //   tempRooms = tempRooms.filter((room) => room.type === value);
    // }

    //   if (value !== 1) {
    //     tempRooms = tempRooms.filter((room) => room.capacity >= value);
    //   }

    // setdata((prevData) => ({
    //   ...prevData,
    //   sortedRooms: tempRooms,
    // }));
  };

  //   capacity = parseInt(capacity);
  //   price = parseInt(price);
  //   // filter by type

  //   // filter by capacity
  //   if (capacity !== 1) {
  //     tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
  //   }
  //   // filter by price
  //   tempRooms = tempRooms.filter((room) => room.price <= price);
  //   //filter by size
  //   tempRooms = tempRooms.filter(
  //     (room) => room.size >= minSize && room.size <= maxSize
  //   );
  //   //filter by breakfast
  //   if (breakfast) {
  //     tempRooms = tempRooms.filter((room) => room.breakfast === true);
  //   }
  //   //filter by pets
  //   if (pets) {
  //     tempRooms = tempRooms.filter((room) => room.pets === true);
  //   }
  //   setdata((prevData) => ({
  //     ...prevData,
  //     sortedRooms: tempRooms,
  //   }));
  // };

  return (
    <RoomContext.Provider
      value={{
        ...data,
        getRoom: getRoom,
        handleChange: handleChange,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useData = () => {
  return useContext(RoomContext);
};