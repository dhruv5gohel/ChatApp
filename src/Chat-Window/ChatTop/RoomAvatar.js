import { Avatar } from "rsuite";

const RoomAvatar = ({ name }) => {

  return (
    <Avatar circle className="room-avatar-top">{name.slice(0,2).toUpperCase()}</Avatar>
  )
}

export default RoomAvatar
