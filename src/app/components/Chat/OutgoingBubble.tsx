import React from "react";

const OutgoingBubble = ({ text }: { text: string }) => {
  return (
    <div className="bg-primary flex items-end gap-x-1 w-fit rounded-lg py-2 px-2">
      <div>{text}</div>
      <span className="text-[10px]">12:55</span>
    </div>
  );
};

export default OutgoingBubble;
