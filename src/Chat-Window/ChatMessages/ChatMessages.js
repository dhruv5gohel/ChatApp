import { equalTo, off, onValue, orderByChild, query, ref } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router";
import { database } from "../../misc/firebase";
import { transformToArray } from "../../misc/helpers";
import ChatItem from "./ChatItem";

const ChatMessages = () => {
  const [messages, setMessages] = useState(null);
  const { chatId } = useParams();

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(()=>{
    const msgRef = ref(database, "/messages")

    onValue(query(msgRef, orderByChild("roomId"), equalTo(chatId)), snap => {
      const data = transformToArray(snap.val());

      setMessages(data);
    })

    return () => {
      off(msgRef);
    }
  },[chatId]);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && 
        messages.map(msg => <ChatItem key={msg.id} message={msg}/>)
      }
    </ul>
  )
}

export default ChatMessages
