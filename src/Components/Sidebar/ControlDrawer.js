import { Button, Divider, Drawer } from "rsuite";
import { useProfile } from "../../context/ProfileContext";
import EditableInput from "../EditableInput";
import { ref, update } from "firebase/database";
import { database } from "../../misc/firebase";
import { ToastContainer, toast } from "react-toastify";
import ProviderBlock from "../ProviderBlock";

const ControlDrawer = ({ openDrawer, handleDrawer, title, onSignOut }) => {
    const { profile } = useProfile();

    const onSave = async (newData) => {
        console.log(newData)

        try {

            await update(ref(database, `/profiles/${profile.uid}`), {
                name: newData
            })
        }
        catch (err) {
            toast.error("Some Error Occured", err);
        }
    }

    return (
        <>
            <Drawer placement="left" onClose={handleDrawer} open={openDrawer} size="xs" keyboard>
                <Drawer.Header>
                    <Drawer.Title>{title}</Drawer.Title>
                    <Drawer.Actions>
                        <Button color="red" appearance="primary" onClick={onSignOut}>
                            Sign Out
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body>
                    Hey, {profile.name}
                    <Divider />
                    <EditableInput initialValue={profile.name} onSave={onSave} name="Nickname" label={<h6>Nickname</h6>} />
                    <ProviderBlock/>
                </Drawer.Body>
            </Drawer>
            <ToastContainer />
        </>
    )
}

export default ControlDrawer
