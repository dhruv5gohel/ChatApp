import { InputGroup } from "rsuite";
import { BsFillMicFill } from "react-icons/bs";
import { ReactMic } from 'react-mic';
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../misc/firebase";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const AttachAudiBtn = ({ afterUploadFilesToStorage }) => {
    const { chatId } = useParams()

    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsloading] = useState(false)

    const onClick = () => {
        setIsRecording(p => !p)
    }

    const onUpload = async (data) => {
        setIsloading(true)
        try {
            const snap = await uploadBytes(ref(storage, `chat/${chatId}/audio(${Date.now()}).mp3`), data.blob, { cacheControl: `public, max-age = ${3600 * 24 * 3}` })

            const file = {
                contentType: snap.metadata.contentType,
                name: snap.metadata.name,
                url: await getDownloadURL(snap.ref)
            }

            afterUploadFilesToStorage([file])
            setIsloading(false)
        }
        catch(err){
            toast.error(err.message)
            setIsloading(false)
        }
    }

    return (
        <>
            <InputGroup.Button startIcon={<BsFillMicFill />} onClick={onClick} disabled={isLoading} className={isRecording ? "animate-blink" : ""}>
                <ReactMic record={isRecording} className="d-none" onStop={onUpload} mimeType="audio/mp3" />
            </InputGroup.Button>
        </>
    )
}

export default AttachAudiBtn
