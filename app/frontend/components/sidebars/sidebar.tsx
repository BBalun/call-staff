import React from "react";

import SidebarPhone from "./sidebarPhone";
import SidebarDesktop from "./sidebarDesktop";

export default function Sidebar() {
  return (
    <>
      <SidebarPhone display={{ base: "inital", md: "none" }} />
      <SidebarDesktop />
    </>
  );
}
