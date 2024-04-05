"use client";

import React, { useContext, useEffect, useState } from "react";
import { Rating } from "../../types/data";

// ICONS
import { MdContentCopy } from "react-icons/md";
import { MdOutlineThumbUp } from "react-icons/md";
import { MdThumbUp } from "react-icons/md";
import { MdOutlineThumbDown } from "react-icons/md";
import { MdThumbDown } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

import { Message, useChat } from "ai/react";
import { ChatContext } from "../Provider";

import UserChatBubble from "./UserChatBubble";
import BotChatBubble from "./BotChatBubble";

const Chat = () => {
  const getChatData = () => {
    if (localStorage) {
      const savedChats = localStorage.getItem("chat");
      let parsedChats = [];
      if (savedChats) parsedChats = JSON.parse(savedChats);
      return parsedChats;
    }
  };

  const { messages, setMessages, input, handleInputChange, handleSubmit } =
    useChat({
      initialMessages: getChatData(),
    });
  const [checkedMessages, setCheckedMessages] = useState<string[]>([]);

  const [selectedRatingType, setSelectedRatingType] = useState<
    "like" | "dislike" | ""
  >("");
  const [ratingInput, setRatingInput] = useState<string>("");
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [reviewedMessage, setReviewedMessage] = useState<Message>();

  const [showToast, setShowToast] = useState<boolean>(false);

  const { chatState } = useContext(ChatContext);

  const checkAllMessage = () => {
    setCheckedMessages(messages.map((message) => message.id));
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };

  const deleteMessage = () => {
    setMessages(
      messages.filter((message) => !checkedMessages.includes(message.id))
    );
    setCheckedMessages([]);
  };

  const submitRating = () => {
    const rating = {
      id: Math.floor(Math.random() * 100 + 1),
      createdAt: new Date(),
      messageId: reviewedMessage!.id,
      type: selectedRatingType,
      content: ratingInput,
    };
    setRatings((prevState) => [...prevState, rating]);
  };

  const BotMessageActions = ({ chat }: { chat: Message }) => (
    <div className="flex justify-end items-center w-full gap-x-2 mt-5">
      <button
        onClick={() => {
          navigator.clipboard.writeText(chat.content);
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 2000);
        }}
      >
        <MdContentCopy />
      </button>

      <button
        disabled={ratings.some((rating) => rating.messageId === chat.id)}
        onClick={() => {
          setReviewedMessage(chat);
          setSelectedRatingType("like");
          (
            document.querySelector("#modal--rating")! as HTMLFormElement
          ).showModal();
        }}
      >
        {ratings.some(
          (rating) => rating.messageId === chat.id && rating.type === "like"
        ) ? (
          <MdThumbUp />
        ) : (
          <MdOutlineThumbUp />
        )}
      </button>
      <button
        disabled={ratings.some((rating) => rating.messageId === chat.id)}
        onClick={() => {
          setReviewedMessage(chat);
          setSelectedRatingType("dislike");
          (
            document.querySelector("#modal--rating")! as HTMLFormElement
          ).showModal();
        }}
      >
        {ratings.some(
          (rating) => rating.messageId === chat.id && rating.type === "dislike"
        ) ? (
          <MdThumbDown />
        ) : (
          <MdOutlineThumbDown />
        )}
      </button>
    </div>
  );

  useEffect(() => {
    // Set ratings state from localstorage
    const savedRatings = localStorage.getItem("ratings");
    let parsedRatings = [];
    if (savedRatings) parsedRatings = JSON.parse(savedRatings);
    setRatings(parsedRatings);

    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (ratings.length)
      localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  useEffect(() => {
    setCheckedMessages([]);
  }, [chatState]);

  return (
    <div className="bg-white min-h-[calc(100vh-64px)] pt-4 relative">
      <div className="px-4 pb-[88px]" style={{ overflowAnchor: "none" }}>
        <div className="flex justify-center">
          <div className="rounded-md bg-secondary p-2 mb-10">Today</div>
        </div>
        <div className="space-y-2">
          {messages.length > 0 &&
            messages.map((chat, i) =>
              chat.role === "user" ? (
                <div className="chat chat-end items-end" key={i}>
                  <UserChatBubble
                    text={chat.content}
                    sentAt={chat.createdAt!}
                  />
                  {chatState === "delete" && (
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={chat.id}
                        checked={checkedMessages.some((id) => id === chat.id)}
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
                <div className="chat chat-start flex items-end" key={i}>
                  {chatState === "delete" && (
                    <div>
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={chat.id}
                        checked={checkedMessages.some((id) => id === chat.id)}
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
                  <div className="chat-image avatar">
                    <img src="/avatar.png" alt="" />
                  </div>
                  <BotChatBubble
                    text={chat.content}
                    sentAt={chat.createdAt!}
                    actions={<BotMessageActions chat={chat} />}
                  />
                </div>
              )
            )}
        </div>
      </div>
      <div
        className="anchor"
        style={{ overflowAnchor: "auto", height: "1px" }}
      ></div>
      <div className="absolute bottom-0 bg-white flex justify-center w-full p-5 h-[88px]">
        {chatState === "delete" ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-x-1">
              <div>{checkedMessages.length} Terpilih </div>
              <span>|</span>
              <div
                className="cursor-pointer"
                role="button"
                onClick={checkAllMessage}
              >
                Pilih semua
              </div>
            </div>
            <button
              className={`cursor-pointer text-orange ${
                !checkedMessages.length ? "text-opacity-50" : ""
              } flex items-center gap-x-1`}
              disabled={!checkedMessages.length}
              onClick={() =>
                (
                  document.querySelector("#modal--delete")! as HTMLFormElement
                ).showModal()
              }
            >
              <GoTrash />
              Hapus
            </button>
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
      <dialog id="modal--delete" className="modal">
        <div className="modal-box">
          <h3 className="font-bold mb-5">Hapus Chat</h3>
          <p>
            Kamu akan menghapus chat ini, chat yang telah dihapus tidak dapat
            dipulihkan
          </p>
          <div className="modal-action">
            <form method="dialog" className="w-full">
              <div className="flex flex-col gap-y-5 w-full">
                <button
                  className="btn bg-second-orange text-white rounded-full"
                  onClick={deleteMessage}
                >
                  Hapus Sekarang
                </button>
                <button className="cursor-pointer">Kembali</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="modal--rating" className="modal">
        <div className="modal-box">
          <div className="flex justify-between mb-5">
            <h3 className="font-bold mb-2">Rating</h3>
            <form method="dialog">
              <button>
                <IoCloseOutline size={25} />
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center mb-5">
            <div
              className={`flex justify-center items-center rounded-full ${
                selectedRatingType === "like"
                  ? "bg-light-blue"
                  : "bg-light-yellow"
              } w-[50px] h-[50px] mb-3`}
            >
              {selectedRatingType === "like" ? (
                <MdOutlineThumbUp size={25} color="#979CFF" />
              ) : (
                <MdOutlineThumbDown size={25} color="#FFC267" />
              )}
            </div>
            <p className="font-bold text-center">
              Kamu {selectedRatingType === "dislike" && "tidak"} menyukai
              balasan AI
            </p>
            <p className="text-center">
              Ceritakan pengalaman tentang balasan chat ini
            </p>
          </div>
          <textarea
            name=""
            id=""
            className="textarea w-full bg-gray-100"
            placeholder="Berikan tanggapanmu"
            value={ratingInput}
            onChange={(e) => setRatingInput(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <form method="dialog" onSubmit={submitRating} className="w-full">
              <div className="flex flex-col gap-y-5 w-full">
                <button
                  className="btn bg-primary text-white rounded-full"
                  disabled={!ratingInput}
                  type="submit"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      {showToast && (
        <div className="toast toast-center">
          <div className="alert bg-black text-white">Copied to clipboard</div>
        </div>
      )}
    </div>
  );
};

export default Chat;
