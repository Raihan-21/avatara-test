"use client";

import React, { useContext } from "react";

// ICONS
import { FaArrowLeft } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoTrash } from "react-icons/go";

import { ChatContext } from "./Provider";

const Navbar = () => {
  const { chatState, setChatState } = useContext(ChatContext);

  return (
    <div className="navbar bg-base-100 flex justify-between sticky top-0 z-[1]">
      <div className="flex gap-x-4">
        <FaArrowLeft />
        <div className="flex items-center gap-x-2">
          <div className="avatar">
            <img src="/avatar.png" alt="" />
          </div>
          <div>Leydroid</div>
        </div>
      </div>
      {chatState === "delete" ? (
        <button onClick={() => setChatState("")}>Batal</button>
      ) : (
        <details className="dropdown dropdown-end">
          <summary className="btn btn-link text-black no-underline">
            <BsThreeDotsVertical />
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-md  w-52">
            <li
              className="text-orange"
              onClick={() => {
                setChatState("delete");
              }}
            >
              <div className="flex">
                <GoTrash color="#FF4E00" />
                <div>Hapus</div>
              </div>
            </li>
          </ul>
        </details>
      )}
    </div>
  );
};

export default Navbar;
