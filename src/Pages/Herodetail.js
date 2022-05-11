function Herodetail(props) {
  return (
    <>
      <div
        show={props.show}
        onHide={props.onHide}
        className="w-[40%] h-[100%] rounded overflow-hidden shadow-lg text-center bg-red-500"
      >
        {/* 5
        <img
          class="w-full"
          src="/img/card-top.jpg"
          alt="Sunset in the mountains"
        /> */}
        <div className="px-6 py-10">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div>
          <button
            onClick={props.onHide}
            className="bg-transparent hover:bg-yellow-500 text-white font-semibold hover:text-white py-2 px-4 border  hover:border-transparent rounded"
          >
            ADD TO FAVORITE
          </button>
          <button
            onClick={props.onHide}
            className="bg-transparent hover:bg-yellow-500 text-white font-semibold hover:text-white py-2 px-4 border  hover:border-transparent rounded"
          >
            close
          </button>
        </div>
      </div>
    </>
  );
}
export default Herodetail;
