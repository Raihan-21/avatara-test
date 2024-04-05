import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar variant="detail" />
      {children}
    </>
  );
};

export default layout;
