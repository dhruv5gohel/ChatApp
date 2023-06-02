import { useState } from "react"
import { Modal } from "rsuite"

const ImageBtnModal = ({ src, fileName }) => {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <>
        <input type="image" src={src} alt={fileName} onClick={() => setIsOpen(p => !p)} style={{width: "100%"}}/>

        <Modal open={isOpen} onClose={() => setIsOpen(p => !p)}>
            <Modal.Header>
                <Modal.Title>{fileName}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <img src={src} alt={fileName} style={{width: "100%"}}/>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <a href={src} target="_blank" rel="noopener noreferrer" onClick={()=> setIsOpen(p => !p)}>View Original</a>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ImageBtnModal
