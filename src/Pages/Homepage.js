import React, { useEffect, useState } from "react";
import str from "../img/Icon_Str.png";
import agi from "../img/Icon_Agi.png";
import int from "../img/Icon_Int.png";
import malee from "../img/malee-icon.png";
import bow from "../img/bow-icon.png";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

function Homepage() {
  const [dataherose, setDataherose] = useState([]);
  const [dataherosefilter, setDataherosefilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [datastate, setDatastate] = useState();
  const [checked, setChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setShow(true);
    setDatastate(row);
  };
  const apiopendota = "https://api.opendota.com";

  const fetchData = async () => {
    setLoading(true);

    try {
      const rp = await axios.get(`https://api.opendota.com/api/heroStats`);
      let datasort = rp.data.sort((a, b) =>
        a.localized_name > b.localized_name ? 1 : -1
      );

      setDataherose(datasort);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filtersearchHero = (search) => {
    setDataherosefilter(
      dataherose.filter(
        (hero) =>
          hero?.localized_name.toLowerCase().includes(search) ||
          hero?.localized_name.toUpperCase().includes(search)
      )
    );
  };

  const filterattrHero = (attribute) => {
    setChecked(!checked);
    if (!checked) {
      setDataherosefilter(
        dataherose.filter((hero) =>
          hero?.primary_attr.toLowerCase().includes(attribute)
        )
      );
    } else {
      setDataherosefilter(dataherose);
    }
  };
  const filterattackHero = (attacktype) => {
    setChecked(!checked);
    if (!checked) {
      setDataherosefilter(
        dataherose.filter((hero) =>
          hero?.attack_type.toLowerCase().includes(attacktype)
        )
      );
    } else {
      setDataherosefilter(dataherose);
    }
  };

  useEffect(() => {
    setDataherosefilter(dataherose);
  }, [dataherose]);

  const calculatorAttack = () => {
    if (datastate.primary_attr === "int") {
      return (
        <>
          <span>
            {datastate.base_attack_min + datastate.base_int} -
            {datastate.base_attack_max + datastate.base_int}
          </span>
        </>
      );
    } else if (datastate.primary_attr === "str") {
      return (
        <>
          <span>
            {datastate.base_attack_min + datastate.base_str} -
            {datastate.base_attack_max + datastate.base_str}
          </span>
        </>
      );
    } else if (datastate.primary_attr === "agi") {
      return (
        <>
          <span>
            {datastate.base_attack_min + datastate.base_agi} -
            {datastate.base_attack_max + datastate.base_agi}
          </span>
        </>
      );
    } else {
      return <></>;
    }
  };
  const [favorites, setFavorites] = useState([]);

  const addFavHero = (fav) => {
    const Favlist = [...favorites, fav];
    setFavorites(Favlist);
  };

  const removeFavHero = (fav) => {
    const Removeist = favorites.filter((favorites) => favorites.id !== fav);
    setFavorites(Removeist);
    console.log(dataherose.id);
  };
  cookies.set("favHero", favorites, { path: "/" });

  return (
    <>
      <div className="flex flex-col	 items-center text-white  font-font-icon ">
        <div className="flex flex-col justify-center mt-10 ">
          <span className="text-4xl font-bold font-font-icon text-center	">
            CHOOSE YOUR HERO
          </span>
          <span className="text-xl font-bold font-font-icon text-center w-[1000px]">
            From magical tacticians to fierce brutes and cunning rogues, Dota
            2's hero pool is massive and limitlessly diverse. Unleash incredible
            abilities and devastating ultimates on your way to victory.
          </span>
        </div>
      </div>
      <div className="container mx-auto mt-10 flex justify-between gap-x-8 items-center bg-gradient-to-r from-[#0d1013] to-[#444b52] rounded-md py-4 px-6 w-[1200px] font-font-icon text-white border-black	border-2">
        <span>FILTER HEROES</span>

        <div className="flex space-x-0.5 item-center">
          <p className="mr-3 mt-1.5">ATTRIBUTE</p>
          <img
            className={`item-center flex grayscale hover:grayscale-0	 cursor-pointer  ${
              checked != "str" ? "grayscale" : "grayscale-0	"
            }`}
            src={str}
            alt="str"
            value="str"
            onClick={() => {
              filterattrHero("str");
            }}
          ></img>
          <img
            className="item-center flex grayscale hover:grayscale-0	 cursor-pointer"
            src={agi}
            alt="agi"
            value="agi"
            onClick={() => {
              filterattrHero("agi");
            }}
          ></img>
          <img
            className="item-center flex grayscale hover:grayscale-0	 cursor-pointer "
            src={int}
            alt="int"
            value="int"
            onClick={() => {
              filterattrHero("int");
            }}
          ></img>
        </div>
        <div className="flex space-x-0.5 item-center gap-x-2 ">
          <span className="mr-3 mt-1.5">ATTACK TYPE</span>
          <img
            className={`item-center flex grayscale hover:grayscale-0	 cursor-pointer  ${
              !checked ? "grayscale" : "grayscale-0	"
            }`}
            src={malee}
            alt="malee"
            width={"40px"}
            height={"40px"}
            onClick={() => filterattackHero("melee")}
          ></img>
          <img
            className={`item-center flex grayscale hover:grayscale-0	 cursor-pointer  ${
              !checked ? "grayscale" : "grayscale-0	"
            }`}
            src={bow}
            alt="bow"
            width={"40px"}
            height={"40px"}
            onClick={() => filterattackHero("ranged")}
          ></img>
        </div>
        <div className="flex justify-center items-center  bg-[#25282a] w-[250px] h-[50px]">
          <i className="bx bx-search bx-md"></i>
          <label className="relative block ">
            <input
              className="placeholder:italic placeholder:text-base w-[190px] h-[30px] bg-[#25282a] p-1 focus:bg-[#606d75] focus:outline-none"
              type="text"
              name="search"
              onChange={(e) => filtersearchHero(e.target.value)}
              // value={search}
            />
          </label>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center  py-5 ">
          <span className="text-2xl">Loading..........</span>
        </div>
      ) : (
        <div className="container  items-center flex  flex-wrap justify-start gap-x-4 gap-y-4	 py-2  w-[1200px] h-auto font-font-icon text-white   ">
          {dataherosefilter.map((val, id) => {
            return (
              <div key={id}>
                <div className=" relative inline-block transition  ease-out hover:cursor-pointer z-40  transform  hover:scale-125  ease-in z-40 	 ">
                  <img
                    className="shadow-lg shadow-cyan-500 z-0  flex justify-item-start text-center "
                    src={apiopendota + val?.img}
                    alt={apiopendota + val.img}
                    width="225px"
                    height="127px"
                    onClick={() => handleShow(val)}
                  ></img>
                  <div className="absolute top-[105px]  w-[100%] backdrop-blur-sm bg-white/20">
                    <span className="ml-2 drop-shadow-lg">
                      {val.localized_name.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {show == false ? (
        <></>
      ) : (
        <div
          aria-hidden="true"
          className=" fixed translate-y-[6rem]	translate-x-[30rem] w-[500px] z-50 "
        >
          <div className="relative p-4   w-full max-w-2xl h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-gradient-to-t from-[#15191a] to-[#1f2223]  rounded-lg shadow  ">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center p-4 rounded-t border-b">
                <h3 className="text-xl font-semibold text-white">
                  HERO DETAIL
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                  onClick={handleClose}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              {/* <!-- Modal body --> */}

              <div
                className="p-2 flex
              justify-around text-white		"
              >
                <div className="flex flex-col">
                  <p className="text-center mb-2 font-bold underline-offset-4 underline">
                    ATTRIBUTE
                  </p>
                  <div>
                    <img
                      className=" z-0  flex justify-item-start text-center  "
                      src={apiopendota + datastate?.img}
                      alt="profile-hero"
                      width={"200px"}
                    ></img>
                    <div className=" flex justify-center space-x-8 pl-12  text-white bg-gradient-to-r from-[#2d6c25] to-[#74e63a] w-[200px]">
                      <div className="flex  items-center space-x-4">
                        <p>{datastate.base_health + datastate.base_str * 20}</p>
                        <p className="text-xs">
                          +
                          {(
                            datastate.base_health_regen +
                            datastate.base_str * 0.1
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 1,
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-8 pl-12 text-white bg-gradient-to-r from-[#1863de] to-[#6feefd] w-[200px]">
                      <div className="flex items-center space-x-4">
                        <p className="flex flex-warp justify-center	 text-center">
                          {datastate.base_mana + datastate.base_int * 12}
                        </p>
                        <p className="text-xs ">
                          +
                          {(datastate.base_mana_regen,
                          datastate.base_int * 0.05).toLocaleString(undefined, {
                            maximumFractionDigits: 1,
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col  text-center text-white pt-2">
                      <div className="flex space-x-4">
                        <img
                          className=" z-0  flex justify-item-start text-center  "
                          src={str}
                          alt="profile-hero"
                          width={"30px"}
                          height={"30px"}
                        ></img>
                        <div className="flex  items-center space-x-4">
                          <p className="text-xl">{datastate.base_str}</p>
                          <p className="text-md">+{datastate.str_gain}</p>
                        </div>
                      </div>
                      <div className="flex space-x-4 text-center">
                        <img
                          className=" z-0  flex justify-item-start text-center  "
                          src={agi}
                          alt="profile-hero"
                          width={"30px"}
                          height={"30px"}
                        ></img>
                        <div className="flex  items-center space-x-4">
                          <p className="text-xl">{datastate.base_agi}</p>
                          <p className="text-md ">+{datastate.agi_gain}</p>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <img
                          className=" z-0  flex justify-item-start text-center  "
                          src={int}
                          alt="profile-hero"
                          width={"30px"}
                          height={"30px"}
                        ></img>
                        <div className="flex  items-center space-x-4">
                          <p className="text-xl">{datastate.base_int}</p>
                          <p className="text-md">+{datastate.int_gain}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-center ">
                  <p className="font-bold underline-offset-4 underline">
                    ROLES
                  </p>
                  {datastate.roles.map((roles, key) => {
                    return (
                      <div key={key}>
                        <p className="space-x-2">{roles}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="text-center text-white ">
                <p className="font-bold underline-offset-4 underline">STATS</p>
                <div className="flex justify-around text-white	mt-2">
                  <div className="flex flex-col ">
                    <p>ATTACK</p>
                    <span>Damage: {calculatorAttack()}</span>
                    <span>Attack Rate: {datastate.attack_rate}</span>
                    <span>Attack Range: {datastate.attack_range}</span>
                  </div>
                  <div>
                    <p>DEFENSE</p>
                    <span>
                      Armor:
                      {(
                        datastate.base_armor +
                        datastate.base_agi * 0.167
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 1,
                      })}
                    </span>
                  </div>
                  <div>
                    <p>MOBILITY</p>
                    <span>Move Speed: {datastate.move_speed}</span>
                  </div>
                </div>
              </div>
              {/* <!-- Modal footer --> */}
              {/* {buttonfav ? ( */}
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                <button
                  movie={datastate}
                  onClick={() => addFavHero(datastate)}
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-white bg-[#25282a] hover:bg-[#3A3C3E]  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  ADD TO FAVORITE
                </button>
                <button
                  onClick={() => removeFavHero(datastate.id)}
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-white bg-[#25282a] hover:bg-[#3A3C3E]  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  REMOVE FROM FAVORITES
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Favheroes remove={removeFavHero} /> */}
    </>
  );
}

export default Homepage;
