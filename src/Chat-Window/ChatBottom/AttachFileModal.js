import { Button, InputGroup, Modal, Uploader } from "rsuite";
import { MdAttachFile } from "react-icons/md"
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../misc/firebase";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 1000 * 1024 * 5;

const AttachFileModal = ({ afterUploadFilesToStorage }) => {
    const { chatId } = useParams()

    const [isOpen, setIsOpen] = useState(false)
    const [fileList, setFileList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (fielArr) => {
        const filtered = fielArr.filter(el => el.blobFile.size <= MAX_FILE_SIZE).slice(0, 5)

        setFileList(filtered)
    }

    const onUpload = async () => {
        setIsLoading(true)
        try{
            const uploadPromises = fileList.map(file => {
                return uploadBytes(ref(storage, `/chat/${chatId}/${Date().now + file.name}`), file.blobFile, {cacheControl: `public, max-age = ${3600 * 24 * 3}`})
            })

            const uploadSnapshots = await Promise.all(uploadPromises)

            const shapePromises = uploadSnapshots.map(async snap => {
                return {
                    contentType: snap.metadata.contentType,
                    name: snap.metadata.name,
                    url: await getDownloadURL(snap.ref)
                }
            })

            const files = await Promise.all(shapePromises)

            await afterUploadFilesToStorage(files)

            setIsOpen(p => !p)
            setIsLoading(false)
        }
        catch(err){
            setIsLoading(false)
            setIsOpen(p => !p)
            toast.error(err.message)
        }
    }

  return (
    <>
        <InputGroup.Button startIcon={<MdAttachFile/>} onClick={() => setIsOpen(p => !p)}/>
        <Modal open={isOpen} onClose={() => setIsOpen(p => !p)}>
            <Modal.Header>
                <Modal.Title>Attach Files</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Uploader block autoUpload={false} multiple listType="picture-text" onChange={onChange} action="" disabled={isLoading}/>
            </Modal.Body>

            <Modal.Footer>
                <Button block color="cyan" appearance="primary" onClick={onUpload} disabled={isLoading}>Send</Button>
                <small style={{color: "red"}}>* file size must not exceed 5MB</small>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default AttachFileModal
