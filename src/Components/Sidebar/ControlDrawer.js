import { Button, Drawer, Placeholder } from "rsuite";
import { useProfile } from "../../context/ProfileContext";

const ControlDrawer = ({ openDrawer, handleDrawer, title, onSignOut }) => {
    const { profile } = useProfile();

    return (
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
                <h3>Hey, {profile.name}</h3>
            </Drawer.Body>
        </Drawer>
    )
}

export default ControlDrawer
