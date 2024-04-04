// "use client";

import React, { useEffect, useState } from "react";
import { Message } from "../types/data";
import OutgoingBubble from "../components/Chat/OutgoingBubble";
import Chat from "./Chat";

export const runtime = "edge";

const ChatRoom = () => {
  return <Chat />;
};

export default ChatRoom;
