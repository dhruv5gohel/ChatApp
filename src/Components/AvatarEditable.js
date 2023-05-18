import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Button, Modal } from "rsuite";
import AvatarEditor from 'react-avatar-editor';

const supportFileTypes = ".png, .jpeg, .jpg";
const acceptFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidFile = (file) => acceptFileTypes.includes(file.type);

const AvatarEditable = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [img, setImg] = useState(null);
    const closeRef = useRef()

    const onFileInputChange = (ev) => {
        const currentFiles = ev.target.files;

        if (currentFiles.length === 1) {
            const file = currentFiles[0];

            if (isValidFile(file)) {
                setIsOpen(true);
                setImg(file);
            }
        }
        else {
            toast.error("Invalid File Type")
        }
    }

    const handleSubmit = () => {
        closeRef.current.click();
    }

    return (
        <div className="mt-5 text-center">
            <label htmlFor="avatar" className="cursor-pointer">Choose a Profile Picture</label>
            <input type="file" id="avatar" className="d-none" accept={supportFileTypes} onChange={onFileInputChange} />

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header>
                    Select an Avatar
                </Modal.Header>
                <Modal.Body>
                        <div className="d-flex justify-center">
                    {img &&
                            <AvatarEditor image={img} width={200} height={200} scale={1.3} borderRadius={100} />
                    }
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button ref={closeRef} onClick={handleSubmit} color="blue" appearance="ghost">
                        Submit
                    </Button>
                    <Button onClick={()=> {setIsOpen(false);}} ref={closeRef}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AvatarEditable
