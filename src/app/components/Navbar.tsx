"use client";

import React, { useContext } from "react";

// ICONS
import { FaArrowLeft } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChatContext } from "./Provider";

const Navbar = () => {
  const { chatState, setChatState } = useContext(ChatContext);

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
      <details className="dropdown">
        <summary
          className="btn"
          onClick={() => {
            if (chatState === "delete") {
              setChatState("");
              return;
            }
            setChatState("delete");
          }}
        >
          <BsThreeDotsVertical />
        </summary>
        <ul className="menu dropdown-content">
          <li>Hapus</li>
        </ul>
      </details>
    </div>
  );
};

export default Navbar;
