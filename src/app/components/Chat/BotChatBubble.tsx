import React, { ReactNode } from "react";
import moment from "moment";

const BotChatBubble = ({
  text,
  sentAt,
  actions,
}: {
  text: string;
  sentAt: Date;
  actions: ReactNode;
}) => {
  return (
    <div className="chat-bubble bg-primary text-white">
      <span>{text}</span>{" "}
      <span className="text-[10px]">{moment(sentAt).format("HH:mm")}</span>
      {actions}
    </div>
  );
};

export default BotChatBubble;
