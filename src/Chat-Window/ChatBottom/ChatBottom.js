import { Icon } from "@rsuite/icons"
import { Input, InputGroup } from "rsuite"
import { AiOutlineSend } from "react-icons/ai"
import { useState } from "react"
import { useCallback } from "react";
import { push, ref, serverTimestamp, set, update } from "firebase/database";
import { useParams } from "react-router";
import { useProfile } from "../../context/ProfileContext";
import { database } from "../../misc/firebase";
import { toast } from "react-toastify";
import AttachFileModal from "./AttachFileModal";
import AttachAudiBtn from "./AttachAudiBtn";

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {})
    },
    createdAt: serverTimestamp(),
    likeCount: 0
  };
}

const ChatBottom = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();
  const { profile } = useProfile();

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim() === "") {
      return
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = push(ref(database, "messages")).key;

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      messageId: messageId,
    };

    setIsLoading(true);
    try {
      await update(ref(database), updates);

      setIsLoading(false);
      setInput("")
    }
    catch (err) {
      setIsLoading(false);
      toast.error(err);
    }
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSendClick();
    }
  }

  const afterUploadFilesToStorage = async (files) => {
    setIsLoading(true);

    const updates = {};

    files.map(file => {
      const msgData = assembleMessage(profile, chatId);
      msgData.file = file;

      const messageId = push(ref(database, "messages")).key;

      updates[`/messages/${messageId}`] = msgData;
    })

    const lastMsgId = Object.keys(updates).pop()

    updates[`/rooms/${chatId}/lastMessage`] = {
      ...updates[lastMsgId],
      messageId: lastMsgId
    }

    try{
      await update(ref(database), updates)
      setIsLoading(false)
    }
    catch(err){
      setIsLoading(false)
      toast.error(err.message)
    }
  }

  return (
    <>
      <InputGroup onKeyDown={onKeyDown}>
        <AttachFileModal afterUploadFilesToStorage={afterUploadFilesToStorage} />
        <AttachAudiBtn afterUploadFilesToStorage={afterUploadFilesToStorage} />
        <Input placeholder="Enter your message here..." value={input} onChange={onInputChange} />
        <InputGroup.Button color="green" appearance="primary" onClick={onSendClick} disabled={isLoading}>
          <Icon as={AiOutlineSend} />
        </InputGroup.Button>
      </InputGroup>
    </>
  )
}

export default ChatBottom
