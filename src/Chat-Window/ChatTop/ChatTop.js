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
    <Button {...props} ref={ref} color="violet" appearance="primary" style={{ borderRadius: "0px", height: "100%" }}>
      <Icon as={GoKebabVertical} />
    </Button>
  )
}

const ChatTop = () => {
  const name = useCurrentRoom(v => v.name);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const isMobile = useMediaQuery("(min-width: 992px)");
  const isAdmin = useCurrentRoom(v => v.isAdmin)

  return (
    <>
      <div>
        <div className="d-flex" style={{ width: "100%" }}>
          <div className={!isMobile ? "d-flex" : "d-none"}>
            <Button as={Link} to="/" color="violet" appearance="primary" style={{borderRadius: 0}}>
              <Icon as={IoMdArrowRoundBack} />
            </Button>
          </div>
          <div style={{ width: "100%" }} className="d-flex">
            <Button block style={{ width: "100%" }} className="chat-top-main" color="violet" appearance="primary" startIcon={<RoomAvatar name={name} />} onClick={() => { setIsOpen(p => !p) }}>
              <span style={{ fontSize: "1.5rem", fontWeight: "bolder", marginLeft: "10px" }}>{name}</span>
            </Button>
            {isAdmin &&
            <Dropdown renderToggle={renderButton} placement="leftEnd">
              <Dropdown.Item onClick={()=>setEditIsOpen(p => !p)}>Edit Room</Dropdown.Item>
            </Dropdown>
            }
          </div>
        </div>
      </div>

      <EditRoom isOpen={editIsOpen} setIsOpen={setEditIsOpen} />
      <ChatTopModal isOpen={isOpen} setIsOpen={setIsOpen} name={name} />
    </>
  )
}

export default memo(ChatTop)
