import { useCurrentRoom } from "../../context/CurrentRoom.context"
import { memo } from "react";

const ChatTop = () => {
  const name = useCurrentRoom(v => v.name);

  return (
    <div>
      {name}
    </div>
  )
}

export default memo(ChatTop)
