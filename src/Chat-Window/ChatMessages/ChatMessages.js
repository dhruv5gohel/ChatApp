import { equalTo, limitToLast, off, onValue, orderByChild, query, ref, runTransaction, update } from "firebase/database";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react"
import { useParams } from "react-router";
import { auth, database, storage } from "../../misc/firebase";
import { groupBy, transformToArray } from "../../misc/helpers";
import ChatItem from "./ChatItem";
import { toast } from "react-toastify";
import { deleteObject, ref as storeRef } from "firebase/storage";
import { Button } from "rsuite";

const PAGE_SIZE = 20;
const msgRef = ref(database, "/messages");

function shouldScrollBottom(node, threshold = 40){
  const percentage = ((100 * node.scrollTop) / (node.scrollHeight - node.clientHeight)) || 0;

  return percentage > threshold;
}

const ChatMessages = () => {
  const [messages, setMessages] = useState(null);
  const { chatId } = useParams();
  const [limit, setLimit] = useState(PAGE_SIZE);
  const selfRef = useRef()

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  
  const loadMessages = useCallback((lastLimit) => {
    const node = selfRef.current
    
    off(msgRef);
    
    onValue(query(msgRef, orderByChild("roomId"), equalTo(chatId), limitToLast(lastLimit || PAGE_SIZE)), snap => {
      const data = transformToArray(snap.val());

      setMessages(data);
      
      if(shouldScrollBottom(node)){
        node.scrollTop = node.scrollHeight
      }
    })

    setLimit(p => p + 10)
  }, [chatId])

  const onLoadMore = useCallback(() => {
    const node = selfRef.current
    const oldHeight = node.scrollHeight

    
    loadMessages(limit)
    
    setTimeout(()=>{
      const newHeight = node.scrollHeight
      node.scrollTop = newHeight - oldHeight
    }, 350)
  }, [loadMessages, limit])

  useEffect(() => {
    const node = selfRef.current
    
    loadMessages()
    
    setTimeout(()=>{
      node.scrollTop = node.scrollHeight
    }, 350)

    return () => {
      off(msgRef);
    }
  }, [loadMessages]);

  const handleAdmin = async (uid) => {
    const adminRef = ref(database, `/rooms/${chatId}/admins`);

    let alertMsg

    await runTransaction(adminRef, admin => {
      if (admin) {
        if (admin[uid]) {
          admin[uid] = null
          alertMsg = "Admin Permission removed successfully"
        }
        else {
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
      if (msg) {
        if (msg.likes && msg.likes[auth.currentUser.uid]) {
          msg.likeCount -= 1
          msg.likes[auth.currentUser.uid] = null
        }
        else {
          msg.likeCount += 1

          if (!msg.likes) {
            msg.likes = {}
          }

          msg.likes[auth.currentUser.uid] = true
        }
      }

      return msg
    })

  }

  const handleDelete = async (msgId, file) => {
    if (!window.confirm("Do you want to delete this message")) {
      return
    }

    const updates = {}

    const isLast = messages[messages.length - 1].id === msgId

    updates[`/messages/${msgId}`] = null

    if (isLast && messages.length > 1) {
      updates[`/rooms/${chatId}/lastMessage`] = {
        ...messages[messages.length - 2],
        messageId: messages[messages.length - 2].id
      }
    }

    if (isLast && messages.length === 1) {
      updates[`/rooms/${chatId}/lastMessage`] = null
    }

    try {
      await update(ref(database), updates)
    }
    catch (err) {
      toast.error(err.message);
      return
    }

    if (file) {
      try {
        await deleteObject(storeRef(storage, `/chat/${chatId}/${file.name}`))
      }
      catch (err) {
        toast.error(err.message)
      }
    }
  }

  const renderMessages = () => {
    const groups = groupBy(messages, item => new Date(item.createdAt).toDateString())

    const items = []

    Object.keys(groups).forEach(date => {
      items.push(
        <li key={date} className="text-center mt-5">{date}</li>
      )

      const msg = groups[date].map(msg => (
        <ChatItem key={msg.id} message={msg} handleAdmin={handleAdmin} handleLike={handleLike} handleDelete={handleDelete} />
      ))

      items.push(...msg)
    })

    return items

  }

  return (
    <ul className="msg-list custom-scroll" ref={selfRef}>
      {messages && messages.length >= PAGE_SIZE && (
        <li className="mt-5 text-center">
          <Button onClick={onLoadMore} color="blue" appearance="ghost">
            Load More
          </Button>
        </li>
      )}
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && renderMessages()}
    </ul>
  )
}

export default ChatMessages
