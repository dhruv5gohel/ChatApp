import { Loader, Nav } from "rsuite"
import RoomItem from "./RoomItem"
import { useRooms } from "../../context/RoomContext"
import { Link } from "react-router-dom";

const RoomLists = () => {
  const rooms = useRooms();
  console.log(rooms)

  return (
    <Nav reversed>
      {!rooms &&
        <Loader center />}

      {rooms && rooms.length > 0 && rooms.map((room) => {
        return <Nav.Item key={room.id} as={Link} to={`/chat/${room.id}`}>
          <RoomItem room={room}/>
        </Nav.Item>
      })}


    </Nav>
  )
}

export default RoomLists
