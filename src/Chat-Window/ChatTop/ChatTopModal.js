import { Button, Modal } from "rsuite"
import { useCurrentRoom } from "../../context/CurrentRoom.context";

const ChatTopModal = ({ name, isOpen, setIsOpen }) => {
    const desc = useCurrentRoom(v => v.description);

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(p => !p)}>
        <Modal.Header>
            <Modal.Title>
                {name}
            </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
            <p>Description: {desc}</p>
        </Modal.Body>

        <Modal.Footer>
            <Button block color="blue" appearance="primary" onClick={() => setIsOpen(p => !p)}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ChatTopModal
