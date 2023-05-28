import { useEffect, useRef, useState } from "react";
import ProfileAvatar from "../../Components/ProfileAvatar";
import { getHeight, getWidth } from "rsuite/esm/DOMHelper";
import TimeAgo from "react-timeago";

const ChatItem = ({ message }) => {
    const { author, createdAt, text } = message;
    const parentRef = useRef();
    const childRef = useRef()
    const [width, setWidth] = useState(()=>getWidth(parentRef.current))
    

    useEffect(()=>{
        let w =getWidth(parentRef.current);
        setWidth(w);
    },[])   

    return (
        <li className="p-10 mb-5">
            <div className="d-flex align-center mb-5 justify-between">
                <div className="d-flex align-center flex-column" style={{ background: "#e6e6e6", padding: "3px 5px", borderRadius: "5px", height: getHeight(childRef.current) > getHeight(parentRef.current) ? `${getHeight(childRef.current)}px` : "auto"}} ref={parentRef}>
                    <ProfileAvatar src={author.avatar} alt={author.name} />
                    <span className="text-bold">{author.name}</span>
                </div>
                <div className="d-flex flex-column justify-between msg-time-chat" style={{width: `calc(100% - ${width}px - 15px)`, height: getHeight(childRef.current) > getHeight(parentRef.current) ? "auto" : `${66}px`}} ref={childRef}>
                    <span style={{wordBreak: "break-all"}}>{text}</span>
                    <span className="text-right">
                        <TimeAgo date={new Date(createdAt)} />
                    </span>
                </div>
            </div>
        </li>
    )
}

export default ChatItem
