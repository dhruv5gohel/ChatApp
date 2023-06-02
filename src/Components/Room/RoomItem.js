import TimeAgo from 'react-timeago';

const RoomItem = ({ room }) => {
  const { name, createdAt, lastMessage } = room;

  return (
    <div>
      
      <div className="room-content">
        <h4>{name}</h4>
        <TimeAgo date={lastMessage ? new Date(lastMessage.author.createdAt) : new Date(createdAt)} className="room-time"/>
      </div>

      <div>
      {lastMessage ? lastMessage.file ? <span><b>{lastMessage.author.name.split(" ")[0]}:</b> sent an attachment</span> :
        <span><span style={{fontWeight: "bold"}}>{lastMessage.author.name.split(" ")[0]}: </span> {lastMessage.text} </span> : <span>No Messages...</span>
      }

      </div>

    </div>
  )
}

export default RoomItem
