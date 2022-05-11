import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/Dota2-icon.png";
function Navbar() {
  return (
    <>
      <div className="flex items-center  drop-shadow-lg justify-start sm:justify-start flex-wrap bg-zinc-800 p-6 text-white ">
        <div className="flex items-center justify-start ml-2 ">
          <img className="w-12 h-15 sm:w-35" src={Logo} alt="icon-dota"></img>
          <span className=" font-font-icon text-3xl tracking-tight ml-2  ">
            DOTA 2
          </span>
        </div>
        <Link
          to="/"
          className="font-font-icon text-3xl  tracking-tight ml-10 sm:text-2xl  md:text-3xl  hover:bg-gray-200 "
        >
          HEROES
        </Link>
        <Link
          to="/favoriteheroes"
          className="font-font-icon text-3xl tracking-tight ml-10 sm:text-2xl  md:text-3xl  hover:bg-gray-200 "
        >
          FAVORITE HEROES
        </Link>
      </div>
    </>
  );
}

export default Navbar;
