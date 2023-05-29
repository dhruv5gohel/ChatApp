import { Button, Sidenav, Nav, Divider } from "rsuite";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { AddOutline, Dashboard } from "@rsuite/icons";
import ControlDrawer from "./ControlDrawer";
import { auth, database } from "../../misc/firebase";
import CreateRoomBtn from "../CreateRoomBtn";
import RoomLists from "../Room/RoomLists";
import { ref, set } from "firebase/database";
import { isOfflineForDatabase } from "../../context/ProfileContext";

const SideNavbar = () => {
    const [expanded, setExpanded] = useState(true);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleDrawer = () => {
        setOpenDrawer((openDrawer) => !openDrawer)
    }

    const onSignOut = () => {
        set(ref(database, `/status/${auth.currentUser.uid}`), isOfflineForDatabase).then(()=>{
            auth.signOut();
            setOpenDrawer(false);
        })
    }

    const handleModal = () => {
        setOpenModal(p=> !p);
    }

    return (
        <div>
            {/* <Button startIcon={<GiHamburgerMenu />} onClick={() => setExpanded((expanded) => !expanded)} /> */}

            <Sidenav expanded={expanded}>
                <Sidenav.Body>
                    <Nav className="hv-100">
                        <Nav.Item icon={<Dashboard />} onClick={handleDrawer} className="dashboard-btn">
                            DashBoard
                        </Nav.Item>
                        <ControlDrawer openDrawer={openDrawer} handleDrawer={handleDrawer} title="Profile" onSignOut={onSignOut}/>
                        <Nav.Item icon={<AddOutline/>} onClick={handleModal} className="dashboard-btn">
                            Create Room
                        </Nav.Item>
                        <CreateRoomBtn openModal={openModal} handleModal={handleModal}/>
                        <Divider>Conversations</Divider>
                        <RoomLists />
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    )
}

export default SideNavbar;