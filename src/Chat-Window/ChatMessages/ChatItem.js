import { useEffect, useRef, useState } from "react";
import ProfileAvatar from "../../Components/ProfileAvatar";
import { getHeight, getWidth } from "rsuite/esm/DOMHelper";
import TimeAgo from "react-timeago";
import ProfileModalBtn from "./ProfileModalBtn";
import { usePresence } from "../../misc/custom-hooks";
import { Button, Tooltip, Whisper } from "rsuite";
import { useCurrentRoom } from "../../context/CurrentRoom.context";
import { memo } from "react";
import { auth } from "../../misc/firebase";
import { useHover } from "@uidotdev/usehooks";
import IconBtnControl from "./IconBtnControl";
import { AiFillHeart, AiFillDelete } from "react-icons/ai"

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
    if (!presence) {
        return "Unknown state";
    }

    return presence.state === "online" ? "Online" : `Last online ${new Date(presence.lastChanged).toLocaleDateString()}`
}

const ChatItem = ({ message, handleAdmin, handleLike, handleDelete }) => {
    const { author, createdAt, text, likeCount, likes } = message;
    const parentRef = useRef()
    const [width, setWidth] = useState(() => getWidth(parentRef.current));
    const presence = usePresence(author.uid)

    const isAdmin = useCurrentRoom(v => v.isAdmin)
    const admins = useCurrentRoom(v => v.admins)

    const isMsgAuthorAdmin = admins.includes(author.uid)
    const isAuthor = auth.currentUser.uid === author.uid
    const canGrantAdmin = isAdmin && !isAuthor

    const [childRef, isHovered] = useHover()

    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid)

    useEffect(() => {
        let w = getWidth(parentRef.current);
        setWidth(w);
    }, [])

    return (
        <li className="p-10 mb-5">
            <div className="d-flex align-center mb-5 justify-between">
                <div className="d-flex align-center flex-column" style={{ background: getColor(presence), padding: "3px 5px", borderRadius: "5px", height: getHeight(childRef.current) > getHeight(parentRef.current) ? `${getHeight(childRef.current)}px` : "auto" }} ref={parentRef}>
                    <Whisper placement="bottom" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>{getText(presence)}</Tooltip>}>
                        <span style={{ cursor: "pointer" }}>
                            <ProfileAvatar src={author.avatar} alt={author.name} />
                        </span>
                    </Whisper>
                    <ProfileModalBtn profile={author}>
                        {canGrantAdmin &&
                            <Button block color="violet" appearance="primary" onClick={() => handleAdmin(author.uid)}>
                                {isMsgAuthorAdmin ? "Remove Admin Permission" : "Make Admin"}
                            </Button>
                        }
                    </ProfileModalBtn>
                </div>
                <div className="d-flex flex-column justify-between msg-time-chat" style={{ width: `calc(100% - ${width}px - 15px)`, height: getHeight(childRef.current) > getHeight(parentRef.current) ? "auto" : `${getHeight(parentRef.current)}px`, background: isHovered ? "#f6f6f6" : "" }} ref={childRef}>
                    <div className="d-flex justify-between">
                        <span style={{ wordBreak: "break-all" }}>{text}</span>
                        <div className="d-flex mlr-3">
                        <IconBtnControl {...(isLiked) ? { color: "red" } : { appearance: "ghost", color: "red" }} isVisible iconName={<AiFillHeart />} badgeContent={likeCount} onClick={() => handleLike(message.id)} toolTipMsg={isLiked ? "Unlike" : "Like"} />

                        <IconBtnControl appearance="subtle" isVisible iconName={<AiFillDelete />} onClick={() => handleDelete(message.id)} toolTipMsg="Delete" />
                        </div>
                    </div>
                    <span className="text-right">
                        <TimeAgo date={new Date(createdAt)} />
                    </span>
                </div>
            </div>
        </li>
    )
}

export default memo(ChatItem)
