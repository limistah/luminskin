import React, { useEffect } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

interface IProps {
  onClose: Function;
  show: boolean;
  children: React.ReactElement;
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
        {children}
      </SwipeableDrawer>
    </div>
  );
}

export default Sidebar;
