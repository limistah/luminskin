import React, { useEffect } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import style from "./Sidebar.module.css";

interface IProps {
  onClose: Function;
  show: boolean;
  children: React.ReactElement | string;
}

function Sidebar({
  show = false,
  onClose = () => {},
  children = <></>,
}: IProps) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  useEffect(() => {
    setOpenDrawer(show);
  }, [show]);

  const toggleDrawer = (open: boolean) => (event: Event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
    onClose(open);
  };

  return (
    <div>
      <SwipeableDrawer
        anchor={"right"}
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={style.drawer}>{children}</div>
      </SwipeableDrawer>
    </div>
  );
}

export default Sidebar;
