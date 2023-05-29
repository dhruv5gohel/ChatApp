import { useEffect, useRef, useState } from "react";
import ProfileAvatar from "../../Components/ProfileAvatar";
import { getHeight, getWidth } from "rsuite/esm/DOMHelper";
import TimeAgo from "react-timeago";
import ProfileModalBtn from "./ProfileModalBtn";
import { usePresence } from "../../misc/custom-hooks";
import { Tooltip, Whisper } from "rsuite";

const getColor = (presence) => {
    if (!presence) {
        return "#f6f6f6";
    }

    switch (presence.state) {
        case "online": return "#a8f7a8";
        case "offline": return "#ffb2b2";
        default: return "#f6f6f6"
    }
};

const getText = (presence) => {
    if(!presence){
        return "Unknown state";
    }

    return presence.state === "online" ? "Online" : `Last online ${new Date(presence.lastChanged).toLocaleDateString()}`
}

const ChatItem = ({ message }) => {
    const { author, createdAt, text } = message;
    const parentRef = useRef();
    const childRef = useRef()
    const [width, setWidth] = useState(() => getWidth(parentRef.current));
    const presence = usePresence(author.uid)

    useEffect(() => {
        let w = getWidth(parentRef.current);
        setWidth(w);
    }, [])

    return (
        <li className="p-10 mb-5">
            <div className="d-flex align-center mb-5 justify-between">
                <div className="d-flex align-center flex-column" style={{ background: getColor(presence), padding: "3px 5px", borderRadius: "5px", height: getHeight(childRef.current) > getHeight(parentRef.current) ? `${getHeight(childRef.current)}px` : "auto" }} ref={parentRef}>
                    <Whisper placement="bottom" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>{getText(presence)}</Tooltip>}>
                    <span style={{cursor: "pointer"}}>
                        <ProfileAvatar src={author.avatar} alt={author.name} />
                    </span>
                    </Whisper>
                    <ProfileModalBtn profile={author} />
                </div>
                <div className="d-flex flex-column justify-between msg-time-chat" style={{ width: `calc(100% - ${width}px - 15px)`, height: getHeight(childRef.current) > getHeight(parentRef.current) ? "auto" : `${getHeight(parentRef.current)}px` }} ref={childRef}>
                    <span style={{ wordBreak: "break-all" }}>{text}</span>
                    <span className="text-right">
                        <TimeAgo date={new Date(createdAt)} />
                    </span>
                </div>
            </div>
        </li>
    )
}

export default ChatItem
