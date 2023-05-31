import { useParams } from "react-router"
import ChatBottom from "../../Chat-Window/ChatBottom/ChatBottom"
import ChatMessages from "../../Chat-Window/ChatMessages/ChatMessages"
import ChatTop from "../../Chat-Window/ChatTop/ChatTop"
import { useRooms } from "../../context/RoomContext"
import { Loader } from "rsuite"
import { CurrentRoomProvider } from "../../context/CurrentRoom.context"
import { transformToArrayWithoutId } from "../../misc/helpers"
import { auth } from "../../misc/firebase"

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

  const { name, description } = currentRoom;
  const admins = transformToArrayWithoutId(currentRoom.admins);
  const isAdmin = admins.includes(auth.currentUser.uid)

  const currentRoomData = {
    name, 
    description,
    admins,
    isAdmin
  }

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>

      <div className="chat-middle">
        <ChatMessages />
      </div>

      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  )
}

export default Chat
