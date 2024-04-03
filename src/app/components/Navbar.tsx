import React from "react";

// ICONS
import { FaArrowLeft } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 flex justify-between sticky">
      <div className="flex gap-x-4">
        <FaArrowLeft />
        <div className="flex items-center gap-x-2">
          <div className="avatar">
            <img src="/avatar.png" alt="" />
          </div>
          <div>Leydroid</div>
        </div>
      </div>
      <BsThreeDotsVertical />
    </div>
  );
};

export default Navbar;
