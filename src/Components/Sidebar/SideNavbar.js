import { Button, Sidenav, Nav } from "rsuite";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { AddOutline, Dashboard } from "@rsuite/icons";
import ControlDrawer from "./ControlDrawer";
import { auth } from "../../misc/firebase";
import CreateRoomBtn from "../CreateRoomBtn";

const SideNavbar = () => {
    const [expanded, setExpanded] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleDrawer = () => {
        setOpenDrawer((openDrawer) => !openDrawer)
    }

    const onSignOut = () => {
        auth.signOut();
        setOpenDrawer(false);
    }

    const handleModal = () => {
        setOpenModal(p=> !p);
    }

    return (
        <div className="hamburger">
            <Button startIcon={<GiHamburgerMenu />} onClick={() => setExpanded((expanded) => !expanded)} />

            <Sidenav expanded={expanded}>
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item icon={<Dashboard />} onClick={handleDrawer}>
                            DashBoard
                        </Nav.Item>
                        <ControlDrawer openDrawer={openDrawer} handleDrawer={handleDrawer} title="Profile" onSignOut={onSignOut}/>
                        <Nav.Item icon={<AddOutline/>} onClick={handleModal}>
                            Create Room
                        </Nav.Item>
                        <CreateRoomBtn openModal={openModal} handleModal={handleModal}/>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    )
}

export default SideNavbar;