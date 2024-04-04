// "use client";

import React, { useEffect, useState } from "react";
import { MessageState } from "../types/data";
import Chat from "./Chat";

export const runtime = "edge";

const ChatRoom = () => {
  return <Chat />;
};

export default ChatRoom;
