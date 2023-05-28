import { useState } from "react"
import { Button, Modal } from "rsuite"
import ProfileAvatar from "../../Components/ProfileAvatar";

const ProfileModalBtn = ({ profile }) => {
    const { createdAt, name, avatar } = profile
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={()=>setIsOpen(p => !p)} appearance="link" className="shortname-link"> {name.split(" ")[0]} </Button>
            <Modal open={isOpen} onClose={()=>setIsOpen(p => !p)}>
                <Modal.Header>
                    <Modal.Title>{name}'s Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body className="text-center">
                    <ProfileAvatar src={avatar} alt={`@${name}`} className="profile-avatar"/>
                    <div className="m-5">User since {new Date(createdAt).toLocaleDateString()}</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button block onClick={()=>setIsOpen(p => !p)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProfileModalBtn
