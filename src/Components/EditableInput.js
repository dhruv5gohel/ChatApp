import { AiFillEdit, AiOutlineClose, AiOutlineCheck } from "react-icons/ai"
import { useState } from "react"
import { Input, InputGroup } from "rsuite"
import { ToastContainer, toast } from "react-toastify";

const EditableInput = ({ initialValue, onSave, label=null, placeholder="Write your Value", emptyMsg="Input Cannot be empty", ...inputProps}) => {
    const [input, setInput] = useState(initialValue);
    const [isEditable, setIsEditable] = useState(false);

    const onInputChange = (str) => {
        setInput(str);
    }

    const onEditChange = () => {
        setIsEditable(p => !p)
    }

    const onSaveInput = async () => {
        let trimmedInput = input.trim();
        if(trimmedInput === ""){
            toast.error(emptyMsg);
        }

        if(trimmedInput !== initialValue){
            await onSave(input);
        }

        setIsEditable(false);
    }

  return (
    <div>
      {label}
      <InputGroup>
        <Input {...inputProps} placeholder={placeholder} value={input} onChange={onInputChange} disabled={!isEditable}/>
        <InputGroup.Button startIcon={isEditable? <AiOutlineClose /> : <AiFillEdit />} onClick={onEditChange} />
        {isEditable && <InputGroup.Button startIcon={<AiOutlineCheck />} onClick={onSaveInput}/>}
      </InputGroup>
      <ToastContainer />
    </div>
  )
}

export default EditableInput
