import { Button } from "rsuite";
import { useCurrentRoom } from "../../context/CurrentRoom.context"
import { memo } from "react";
import RoomAvatar from "./RoomAvatar";
import ChatTopModal from "./ChatTopModal";
import { useState } from "react";

const ChatTop = () => {
  const name = useCurrentRoom(v => v.name);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button className="chat-top-main" block color="yellow" appearance="primary" startIcon={<RoomAvatar name={name}/>} onClick={()=>{setIsOpen(p => !p)}}>
        <span style={{fontSize: "1.5rem", fontWeight: "bolder", marginLeft: "10px"}}>{name}</span>
      </Button>
      <ChatTopModal isOpen={isOpen} setIsOpen={setIsOpen} name={name} />
    </>
  )
}

export default memo(ChatTop)
