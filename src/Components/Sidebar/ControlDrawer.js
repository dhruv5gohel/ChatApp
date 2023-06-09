import { Button, Divider, Drawer } from "rsuite";
import { useProfile } from "../../context/ProfileContext";
import EditableInput from "../EditableInput";
import { ref, update } from "firebase/database";
import { database } from "../../misc/firebase";
import { toast } from "react-toastify";
import AvatarEditable from "../AvatarEditable"
import ProviderBlock from "../ProviderBlock";
import { getUserUpdates } from "../../misc/helpers";

const ControlDrawer = ({ openDrawer, handleDrawer, title, onSignOut }) => {
    const { profile } = useProfile();

    const onSave = async (newData) => {

        try {
            const updates = await getUserUpdates(profile.uid, "name", newData, database);

            await update(ref(database), updates);
        }
        catch (err) {
            toast.error(err);
            console.log(err)
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
                    <AvatarEditable />
                    <Divider />
                    <p className="text-center m-5 font-125">Hey, <span className="text-bold">{profile.name}</span></p>
                    <EditableInput initialValue={profile.name} onSave={onSave} name="Nickname" label={<h6>Nickname</h6>} />
                    <ProviderBlock/>
                </Drawer.Body>
            </Drawer>
        </>
    )
}

export default ControlDrawer
