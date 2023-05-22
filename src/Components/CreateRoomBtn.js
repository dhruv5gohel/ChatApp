import { forwardRef, useCallback, useRef, useState } from "react"
import { toast } from "react-toastify";
import { Button, Form, Input, Modal, Schema } from "rsuite"
import { database } from "../misc/firebase";
import {  push, ref, serverTimestamp, set } from "firebase/database";

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
const INITIAL_FORM = {
    name: "",
    description: "",
}

const { StringType } = Schema.Types;
const model = Schema.Model({
    name: StringType().isRequired("Room name is required"),
    description: StringType().isRequired("Description is required")
})

const CreateRoomBtn = ({ openModal, handleModal }) => {
    const [formVal, setFormVal] = useState(INITIAL_FORM);
    const formRef = useRef();
    const [isLoading, setIsLoading] = useState(false)

    const onFormChange = useCallback((str, ev) => {
        ev.preventDefault();
        setFormVal(str)
    }, []);

    const onSubmit = async () => {
        if (!formRef.current.check()) {
            return;
        }

        setIsLoading(true)
        try {
            const data = push(ref(database, "rooms"));
            console.log(data)
            const temp = await set(ref(database, `rooms/${data.key}`),{
                ...formVal,
                createdAt: serverTimestamp()
            });
            console.log(temp)

            setIsLoading(false)
            handleModal();
            toast.success(`${formVal.name} Created`);
            setFormVal(INITIAL_FORM);
        }
        catch (err) {
            setIsLoading(false)
            toast.error(err.message);
        }
    }

    return (
        <div onKeyDown={(e)=>e.stopPropagation()}>

            <Modal open={openModal} onClose={handleModal}>
                <Modal.Header>Create new Room</Modal.Header>

                <Modal.Body>
                    <Form fluid onChange={onFormChange} formValue={formVal} model={model} ref={formRef}>
                        <Form.Group>
                            <Form.ControlLabel>Room name</Form.ControlLabel>
                            <Form.Control name="name" placeholder="Enter chat room name..." />
                        </Form.Group>

                        <Form.Group>
                            <Form.ControlLabel>Room Description</Form.ControlLabel>
                            <Form.Control name="description" placeholder="Enter Room Description..." accepter={Textarea} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button color="green" appearance="ghost" onClick={onSubmit} disabled={isLoading}>
                        Submit
                    </Button>
                    <Button color="violet" appearance="primary" onClick={handleModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateRoomBtn
