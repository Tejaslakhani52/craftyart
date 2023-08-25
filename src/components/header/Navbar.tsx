import React from "react";
import { useSelector } from "react-redux";
import MainHeader from "./components/MainHeader";
import ChatBox from "../commonComponents/ChatBox";
import { consoleShow } from "../../commonFunction/console";

export default function Navbar() {
  const headerShow = useSelector((state: any) => state?.data?.headerShowing);
  consoleShow("headerShow: ", headerShow);
  return headerShow ? (
    <>
      <MainHeader /> <ChatBox />
    </>
  ) : (
    <></>
  );
}
