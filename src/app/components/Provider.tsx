"use client";

import React, { ReactNode, createContext, useState } from "react";

export const ChatContext = createContext<any>({});
const Provider = ({ children }: { children: ReactNode }) => {
  const [chatState, setChatState] = useState<string>("");

  return (
    <ChatContext.Provider value={{ chatState, setChatState }}>
      {children}
    </ChatContext.Provider>
  );
};

export default Provider;
