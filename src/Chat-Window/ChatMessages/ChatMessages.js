import { equalTo, off, onValue, orderByChild, query, ref, runTransaction } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router";
import { auth, database } from "../../misc/firebase";
import { transformToArray } from "../../misc/helpers";
import ChatItem from "./ChatItem";
import { toast } from "react-toastify";

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

  const handleAdmin = async (uid) => {
    const adminRef = ref(database, `/rooms/${chatId}/admins`);

    let alertMsg

    await runTransaction(adminRef, admin => {
      if(admin){
        if(admin[uid]){
          admin[uid] = null
          alertMsg = "Admin Permission removed successfully"
        }
        else{
          admin[uid] = true
          alertMsg = "Admin Permission granted successfully"
        }
      }
      return admin;
    })

    toast.success(alertMsg)
  }

  const handleLike = async (msgId) => {
    const msgRef = ref(database, `/messages/${msgId}`)
    
    await runTransaction(msgRef, msg => {
      if(msg){
        if(msg.likes && msg.likes[auth.currentUser.uid]){
          msg.likeCount -= 1
          msg.likes[auth.currentUser.uid] = null
        }
        else{
          msg.likeCount += 1

          if(!msg.likes){
            msg.likes = {}
          }

          msg.likes[auth.currentUser.uid] = true
        }
      }

      return msg
    })

  }

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && 
        messages.map(msg => <ChatItem key={msg.id} message={msg} handleAdmin={handleAdmin} handleLike={handleLike}/>)
      }
    </ul>
  )
}

export default ChatMessages
