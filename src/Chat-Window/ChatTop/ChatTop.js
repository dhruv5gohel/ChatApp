import { Button, Dropdown } from "rsuite";
import { useCurrentRoom } from "../../context/CurrentRoom.context"
import { memo } from "react";
import RoomAvatar from "./RoomAvatar";
import ChatTopModal from "./ChatTopModal";
import { useState } from "react";
import { useMediaQuery } from "../../misc/custom-hooks";
import { IoMdArrowRoundBack } from "react-icons/io"
import { Icon } from "@rsuite/icons";
import { Link } from "react-router-dom";
import { GoKebabVertical } from "react-icons/go";
import EditRoom from "./EditRoom";

const renderButton = (props, ref) => {
  return (
    <Button {...props} ref={ref} color="red" appearance="primary" style={{ borderRadius: "0px", height: "100%" }}>
      <Icon as={GoKebabVertical} />
    </Button>
  )
}

const ChatTop = () => {
  const name = useCurrentRoom(v => v.name);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const isMobile = useMediaQuery("(min-width: 992px)");

  return (
    <>
      <div>
        <div className="d-flex" style={{ width: "100%" }}>
          <div className={!isMobile ? "d-flex" : "d-none"}>
            <Button as={Link} to="/">
              <Icon as={IoMdArrowRoundBack} />
            </Button>
          </div>
          <div style={{ width: "100%" }} className="d-flex">
            <Button block style={{ width: "100%" }} className="chat-top-main" color="red" appearance="primary" startIcon={<RoomAvatar name={name} />} onClick={() => { setIsOpen(p => !p) }}>
              <span style={{ fontSize: "1.5rem", fontWeight: "bolder", marginLeft: "10px" }}>{name}</span>
            </Button>
            <Dropdown renderToggle={renderButton} placement="leftBottom">
              <Dropdown.Item onClick={()=>setEditIsOpen(p => !p)}>Edit Room</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>

      <EditRoom isOpen={editIsOpen} setIsOpen={setEditIsOpen} />
      <ChatTopModal isOpen={isOpen} setIsOpen={setIsOpen} name={name} />
    </>
  )
}

export default memo(ChatTop)
