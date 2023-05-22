import TimeAgo from 'react-timeago';

const RoomItem = ({ room }) => {
  const { name, createdAt } = room;

  return (
    <div>
      
      <div className="room-content">
        <h4>{name}</h4>
        <TimeAgo date={new Date(createdAt)} className="room-time"/>
      </div>

      <div>
        <span>No Messages...</span>
      </div>

    </div>
  )
}

export default RoomItem
