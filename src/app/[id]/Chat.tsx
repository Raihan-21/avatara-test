"use client";

import React, { useContext, useEffect, useState } from "react";
import { MessageState } from "../types/data";
import moment from "moment";

// ICONS
import { IoReload } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { FiThumbsUp } from "react-icons/fi";
import { FiThumbsDown } from "react-icons/fi";
import { useChat } from "ai/react";
import { ChatContext } from "../components/Provider";

interface Message {
  role: string;
  content: string;
}

const Chat = () => {
  const saveMessage = (message: Message) => {
    // const savedChats = localStorage.getItem("chat");
    // let parsedChats = [];
    // if (savedChats) parsedChats = JSON.parse(savedChats);
    // parsedChats = [...parsedChats, message];
    // localStorage.setItem("chat", JSON.stringify(parsedChats));
    // console.log(messages);
  };

  const getChatData = () => {
    const savedChats = localStorage.getItem("chat");
    let parsedChats = [];
    if (savedChats) parsedChats = JSON.parse(savedChats);
    return parsedChats;
  };

  const { messages, setMessages, input, handleInputChange, handleSubmit } =
    useChat({
      initialMessages: getChatData(),
      onFinish: saveMessage,
    });

  const [messageData, setMessageData] = useState<any>([]);
  const [checkedMessages, setCheckedMessages] = useState<string[]>([]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    // const savedChats = localStorage.getItem("chat");
    // let parsedChats = [];
    // if (savedChats) parsedChats = JSON.parse(savedChats);

    // parsedChats = [...parsedChats, ...messages];
    // localStorage.setItem("chat", JSON.stringify(parsedChats));

    handleSubmit(e);
  };

  // const [input, setInput] = useState<string>("");
  const [chatData, setChatData] = useState<MessageState[]>([]);

  // const sendMessage = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const userMessage = {
  //       id: Math.floor(Math.random() * 100 + 1),
  //       createdAt: new Date(),
  //       createdBy: "user",
  //       message: input,
  //     };

  //     setInput("");
  //     setChatData((prevState) => [...prevState, userMessage]);

  //     let chatStorage = localStorage.getItem("chat");
  //     let parsedChatData: any = [userMessage];
  //     if (chatStorage) {
  //       parsedChatData = JSON.parse(chatStorage);
  //       parsedChatData = [...parsedChatData, userMessage];
  //     }

  //     localStorage.setItem("chat", JSON.stringify(parsedChatData));
  //     const response = await axios.post("/api/chat", {
  //       messages: [{ role: "user", content: input }],
  //     });

  //     const botMessage = {
  //       id: Math.floor(Math.random() * 100 + 1),
  //       createdAt: new Date(),
  //       createdBy: "bot",
  //       message: response.data,
  //     };

  //     chatStorage = localStorage.getItem("chat");

  //     setChatData((prevState) => [...prevState, botMessage]);
  //     if (chatStorage) parsedChatData = JSON.parse(chatStorage);
  //     parsedChatData = [...parsedChatData, botMessage];
  //     localStorage.setItem("chat", JSON.stringify(parsedChatData));
  //   } catch (error) {}
  // };

  //   const

  const { chatState } = useContext(ChatContext);

  useEffect(() => {
    const chatStorage = localStorage.getItem("chat");
    if (chatStorage) setChatData(JSON.parse(chatStorage));
  }, []);

  useEffect(() => {
    // const savedChats = localStorage.getItem("chat");
    // let parsedChats = [];
    // if (savedChats) parsedChats = JSON.parse(savedChats);

    // parsedChats = [...parsedChats, ...messages];
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    console.log(checkedMessages);
  }, [checkedMessages]);

  return (
    <div className="bg-white min-h-[calc(100vh-64px)] pt-4 relative">
      <div className="px-4 ">
        <div className="flex justify-center">
          <div className="rounded-md bg-secondary p-2 mb-10">
            Today {chatState}
          </div>
        </div>
        <div className="space-y-2">
          {messages.length > 0 &&
            messages.map((chat, i) =>
              chat.role === "user" ? (
                <div className="chat chat-end items-end" key={i}>
                  <div className="chat-bubble bg-secondary text-black">
                    <span>{chat.content}</span>{" "}
                    <span className="text-[10px]">
                      {moment(chat.createdAt).format("HH:mm")}
                    </span>
                  </div>
                  {chatState === "delete" && (
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={chat.id}
                        onChange={(e) => {
                          const alreadyChecked = checkedMessages.find(
                            (id) => id === e.target.value
                          );
                          if (alreadyChecked) {
                            setCheckedMessages(
                              checkedMessages.filter(
                                (id) => id !== e.target.value
                              )
                            );
                            return;
                          }
                          setCheckedMessages((prevState) => [
                            ...prevState,
                            e.target.value,
                          ]);
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="chat chat-start items-end" key={i}>
                  {" "}
                  {chatState === "delete" && (
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={chat.id}
                        onChange={(e) => {
                          const alreadyChecked = checkedMessages.find(
                            (id) => id === e.target.value
                          );
                          if (alreadyChecked) {
                            setCheckedMessages(
                              checkedMessages.filter(
                                (id) => id !== e.target.value
                              )
                            );
                            return;
                          }
                          setCheckedMessages((prevState) => [
                            ...prevState,
                            e.target.value,
                          ]);
                        }}
                      />
                    </div>
                  )}
                  <div className="chat-bubble bg-primary text-white">
                    <span>{chat.content}</span>{" "}
                    <span className="text-[10px]">
                      {moment(chat.createdAt).format("HH:mm")}
                    </span>{" "}
                    <div className="flex justify-end w-full gap-x-2 mt-5">
                      <IoReload />
                      <MdContentCopy />
                      <FiThumbsUp />
                      <FiThumbsDown />
                    </div>
                  </div>
                </div>
              )
            )}
          {/* {chatData.length > 0 &&
            chatData.map((chat, i) =>
              chat.createdBy === "user" ? (
                <div className="chat chat-end" key={i}>
                  <div className="chat-bubble bg-secondary text-black">
                    <span>{chat.message}</span>{" "}
                    <span className="text-[10px]">
                      {moment(chat.createdAt).format("HH:mm")}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="chat chat-start" key={i}>
                  <div className="chat-bubble bg-primary text-white">
                    <span>{chat.message}</span>{" "}
                    <span className="text-[10px]">
                      {moment(chat.createdAt).format("HH:mm")}
                    </span>{" "}
                    <div className="flex justify-end w-full gap-x-2 mt-5">
                      <IoReload />
                      <MdContentCopy />
                      <FiThumbsUp />
                      <FiThumbsDown />
                    </div>
                  </div>
                </div>
              )
            )} */}
        </div>
      </div>
      <div className="sticky bottom-0 bg-white flex justify-center w-full p-5">
        {chatState === "delete" ? (
          <div
            className="btn"
            onClick={() =>
              setMessages(
                messages.filter(
                  (message) => !checkedMessages.includes(message.id)
                )
              )
            }
          >
            Hapus
          </div>
        ) : (
          <form onSubmit={sendMessage} className="w-full">
            <input
              type="text"
              placeholder="Send message..."
              value={input}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Chat;
