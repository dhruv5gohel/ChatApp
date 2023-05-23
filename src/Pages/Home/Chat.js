import { useParams } from "react-router"
import ChatBottom from "../../Chat-Window/ChatBottom/ChatBottom"
import ChatMessages from "../../Chat-Window/ChatMessages/ChatMessages"
import ChatTop from "../../Chat-Window/ChatTop/ChatTop"
import { useRooms } from "../../context/RoomContext"
import { Loader } from "rsuite"

const Chat = () => {
  const { chatId } = useParams();

  const rooms = useRooms();

  if(!rooms){
    return <Loader size="lg" center vertical content="Loading" />
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if(!currentRoom){
    return <h4 className="text-center mt">Room with Id: {chatId} not found</h4>
  }

  return (
    <>
      <div>
        <ChatTop />
      </div>

      <div>
        <ChatMessages />
      </div>

      <div>
        <ChatBottom />
      </div>
    </>
  )
}

export default Chat
