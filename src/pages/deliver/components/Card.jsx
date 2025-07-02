import React from "react";

const Card = ({ img, title, location, soni }) => {
  return (
    <div className="flex items-center p-[15px] border-2 border-[#1D61E7] rounded-[20px] gap-3">
      <img className="w-20 h-[75px] rounded-xl" src={img} alt="" />
      <div className="flex justify-between w-full text-black">
        <div>
          <p className="text-lg m-0 mb-1">{title}</p>
          <p className="text-gray-700 m-0">{location}</p>
        </div>
        <p className="m-0 text-[14px]">{soni}</p>
      </div>
    </div>
  );
};

export default Card;
