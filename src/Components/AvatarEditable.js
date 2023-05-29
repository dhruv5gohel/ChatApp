import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Button, Loader, Modal } from "rsuite";
import AvatarEditor from 'react-avatar-editor';
import { ref, update } from "firebase/database";
import { database, storage } from "../misc/firebase";
import { useProfile } from "../context/ProfileContext";
import { getDownloadURL, uploadBytes, ref as sRef } from "firebase/storage";
import ProfileAvatar from "./ProfileAvatar";
import { getUserUpdates } from "../misc/helpers";

const supportFileTypes = ".png, .jpeg, .jpg";
const acceptFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidFile = (file) => acceptFileTypes.includes(file.type);

const getBlob = (canvas) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            }
            else {
                reject(new Error("Error Processing Image"));
            }
        })
    })
}

const AvatarEditable = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [img, setImg] = useState(null);
    const avatarRef = useRef();
    const { profile } = useProfile();
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = async () => {
        const canvas = avatarRef.current.getImageScaledToCanvas();

        setIsLoading(true)
        try {
            const blob = await getBlob(canvas);

            const storageRef = sRef(storage, `profile/${profile.uid}`);

            await uploadBytes(storageRef, blob, {
                cacheControl: `public, max-age=${3600 * 24 * 3}`
            });

            const downloadUrl = await getDownloadURL(storageRef);

            await getUserUpdates(profile.uid, "avatar", downloadUrl, database);
            
            setIsLoading(false)
            toast.success("Avatar Updated");
        }
        catch (err) {
            setIsLoading(false)
            toast.error(err.message)
        }

        setIsOpen(false);
    }

    return (
        <div className="mt-5 text-center">
            <label htmlFor="avatar" className="cursor-pointer">
                <ProfileAvatar src={profile.avatar} alt={`@${profile.name}`} className="profile-avatar"/>
            </label>
            <input type="file" id="avatar" className="d-none" accept={supportFileTypes} onChange={onFileInputChange} />

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header>
                    Select an Avatar
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-center">
                        {img &&
                            <AvatarEditor ref={avatarRef} image={img} width={200} height={200} scale={1.3} borderRadius={100} />
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        isLoading ? <Loader /> : <Button onClick={handleSubmit} color="blue" appearance="ghost">
                            Submit
                        </Button>
                    }
                    <Button onClick={() => { setIsOpen(false); }} >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AvatarEditable
