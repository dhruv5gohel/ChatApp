import { Button, Modal } from "rsuite"
import { useCurrentRoom } from "../../context/CurrentRoom.context"
import EditableInput from "../../Components/EditableInput"
import { ref, set } from "firebase/database"
import { database } from "../../misc/firebase"
import { toast } from "react-toastify"
import { useParams } from "react-router"

const EditRoom = ({ isOpen, setIsOpen }) => {
    const name = useCurrentRoom(v => v.name)
    const description = useCurrentRoom(v => v.description)
    const { chatId } = useParams()

    const updateData = (key, value) => {
        set(ref(database, `/rooms/${chatId}/${key}`), value).then(()=>{
            toast.success("Successfully Updated")
        }).catch((err)=>{
            toast.error(err.message)
        })
    }

    const onNameSave = (newName) => {
        updateData("name", newName)
    }

    const onDescSave = (newDesc) => {
        updateData("description", newDesc)
    }

  return (
    <Modal open={isOpen} onClose={()=>setIsOpen(p => !p)}>
        <Modal.Header>
            <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <EditableInput initialValue={name} onSave={onNameSave} placeholder="Write Room name" emptyMsg="Room name cannot be empty" label={<h4>Name</h4>}/>
            <EditableInput initialValue={description} as="textarea" rows={5} onSave={onDescSave} placeholder="Write Room name" emptyMsg="Room name cannot be empty" label={<h4>Name</h4>}/>
        </Modal.Body>

        <Modal.Footer>
            <Button block onClick={() => setIsOpen(p => !p)}>Close</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default EditRoom
