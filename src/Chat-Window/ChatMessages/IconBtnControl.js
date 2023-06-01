import { AiFillHeart } from "react-icons/ai"
import { Badge, IconButton, Tooltip, Whisper } from "rsuite"

const BadgeCond = ({ condition, children }) => {
    return condition ? <Badge content={condition}>{children}</Badge> : children
}

const IconBtnControl = ({ isVisible, iconName, badgeContent, toolTipMsg,  ...props }) => {
  return (
    <div style={{visibility: isVisible ? "visible" : "hidden"}}>
        <BadgeCond condition={badgeContent}>
            <Whisper placement="bottom" trigger="hover" controlId="control-id-hover" speaker={<Tooltip>{toolTipMsg}</Tooltip>}>
                <IconButton appearance="primary" {...props} circle size="xs" icon={<AiFillHeart/>} />
            </Whisper>
        </BadgeCond>
    </div>
  )
}

export default IconBtnControl
