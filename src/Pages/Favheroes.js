import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import str from "../img/Icon_Str.png";
import agi from "../img/Icon_Agi.png";
import int from "../img/Icon_Int.png";

function Favheroes(props) {
  const cookies = new Cookies();
  const apiopendota = "https://api.opendota.com";

  const [dataherose, setDataherose] = useState([]);

  const fetchCookie = () => {
    setDataherose(cookies.get("favHero"));
  };
  useEffect(() => {
    fetchCookie();
  }, []);



  const calculatorAttack = () => {
    if (dataherose.primary_attr === "int") {
      return (
        <>
          <span>
            {dataherose.base_attack_min + dataherose.base_int} -
            {dataherose.base_attack_max + dataherose.base_int}
          </span>
        </>
      );
    } else if (dataherose.primary_attr === "str") {
      return (
        <>
          <span>
            {dataherose.base_attack_min + dataherose.base_str} -
            {dataherose.base_attack_max + dataherose.base_str}
          </span>
        </>
      );
    } else if (dataherose.primary_attr === "agi") {
      return (
        <>
          <span>
            {dataherose.base_attack_min + dataherose.base_agi} -
            {dataherose.base_attack_max + dataherose.base_agi}
          </span>
        </>
      );
    } else {
      return <></>;
    }
  };
  const [show, setShow] = useState(false);
  const [datastate, setDatastate] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (dataherose) => {
    setShow(true);
    setDatastate(dataherose);
  };

  const [dataherosefilter, setDataherosefilter] = useState([]);

  useEffect(() => {
    setDataherosefilter(dataherose);
  }, [dataherose]);
  return (
    <>
      {dataherose && (
        <div className="container  items-center flex  flex-wrap justify-start gap-x-4 gap-y-4	 py-2  w-[1200px] h-auto font-font-icon text-white   ">
          {dataherosefilter.map((val, id) => {
            return (
              <div
                key={id}
                className=" relative inline-block transition  ease-out hover:cursor-pointer z-40  transform  hover:scale-125  ease-in z-40 	 "
              >
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
                    {val.localized_name}
                  </span>
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
            <div className="relative bg-gradient-to-t from-[#15191a] to-[#1f2223]  rounded-lg shadow  ">
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
                        <p>
                          {datastate?.base_health + datastate?.base_str * 20}
                        </p>
                        <p className="text-xs">
                          +
                          {(
                            datastate?.base_health_regen +
                            datastate?.base_str * 0.1
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 1,
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-8 pl-12 text-white bg-gradient-to-r from-[#1863de] to-[#6feefd] w-[200px]">
                      <div className="flex items-center space-x-4">
                        <p className="flex flex-warp justify-center	 text-center">
                          {datastate?.base_mana + datastate?.base_int * 12}
                        </p>
                        <p className="text-xs ">
                          +
                          {(datastate?.base_mana_regen,
                          datastate?.base_int * 0.05).toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 1,
                            }
                          )}
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
                          <p className="text-xl">{datastate?.base_str}</p>
                          <p className="text-md">+{datastate?.str_gain}</p>
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
                          <p className="text-xl">{datastate?.base_agi}</p>
                          <p className="text-md ">+{datastate?.agi_gain}</p>
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
                          <p className="text-xl">{datastate?.base_int}</p>
                          <p className="text-md">+{datastate?.int_gain}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-center ">
                  <p className="font-bold underline-offset-4 underline">
                    ROLES
                  </p>
                  {datastate?.roles.map((roles, key) => {
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
                    <span>Attack Rate: {datastate?.attack_rate}</span>
                    <span>Attack Range: {datastate?.attack_range}</span>
                  </div>
                  <div>
                    <p>DEFENSE</p>
                    <span>
                      Armor:
                      {(
                        datastate?.base_armor +
                        datastate?.base_agi * 0.167
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 1,
                      })}
                    </span>
                  </div>
                  <div>
                    <p>MOBILITY</p>
                    <span>Move Speed: {datastate?.move_speed}</span>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Favheroes;
