import React from "react";
import moment from "moment";

const ChatBubble = ({ text, sentAt }: { text: string; sentAt: Date }) => {
  return (
    <div className="chat-bubble bg-secondary text-black">
      <span>{text}</span>{" "}
      <span className="text-[10px]">{moment(sentAt).format("HH:mm")}</span>
    </div>
  );
};

export default ChatBubble;
