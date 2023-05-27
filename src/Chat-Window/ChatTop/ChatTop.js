import { Button } from "rsuite";
import { useCurrentRoom } from "../../context/CurrentRoom.context"
import { memo } from "react";
import RoomAvatar from "./RoomAvatar";
import ChatTopModal from "./ChatTopModal";
import { useState } from "react";
import { useMediaQuery } from "../../misc/custom-hooks";
import { IoMdArrowRoundBack } from "react-icons/io"
import { Icon } from "@rsuite/icons";
import { Link } from "react-router-dom";

const ChatTop = () => {
  const name = useCurrentRoom(v => v.name);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(min-width: 992px)");

  return (
    <>
      <div>
        <div className="d-flex" style={{width: "100%"}}>
          <div className={!isMobile ? "d-flex" : "d-none"}>
            <Button as={Link} to="/">
              <Icon as={IoMdArrowRoundBack} />
            </Button>
          </div>
          <div style={{width: "100%"}}>
            <Button block style={{width: "100%"}} className="chat-top-main" color="yellow" appearance="primary" startIcon={<RoomAvatar name={name} />} onClick={() => { setIsOpen(p => !p) }}>
              <span style={{ fontSize: "1.5rem", fontWeight: "bolder", marginLeft: "10px" }}>{name}</span>
            </Button>
          </div>
        </div>
      </div>

      <ChatTopModal isOpen={isOpen} setIsOpen={setIsOpen} name={name} />
    </>
  )
}

export default memo(ChatTop)
