"use client";

import React, { useEffect, useState } from "react";
import { Message } from "../types/data";
import OutgoingBubble from "../components/Chat/OutgoingBubble";

const ChatRoom = () => {
  const [input, setInput] = useState<string>("");
  const [chatData, setChatData] = useState<Message[]>([]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    setChatData((prevState) => [
      ...prevState,
      { createdAt: new Date(), createdBy: "User", message: input },
    ]);
    setInput("");
  };

  useEffect(() => {
    console.log(chatData);
  }, [chatData]);

  return (
    <div className="bg-white min-h-[calc(100vh-64px)] pt-4 ">
      <div className="px-4 ">
        <div className="flex justify-center">
          <div className="rounded-md bg-primary p-2 mb-10">Today</div>
        </div>
        <div className="space-y-2">
          {chatData.length > 0 &&
            chatData.map((chat, i) => (
              <div className="chat chat-end">
                <div className="chat-bubble bg-primary text-black">
                  <span>{chat.message}</span>{" "}
                  <span className="text-[10px]">12:55</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="sticky bottom-0 bg-white flex justify-center w-full p-5">
        <form onSubmit={sendMessage} className="w-full">
          <input
            type="text"
            placeholder="Send message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input input-bordered w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
