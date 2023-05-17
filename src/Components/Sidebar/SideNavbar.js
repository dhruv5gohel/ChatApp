import { Button, Sidenav, Nav } from "rsuite";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { Dashboard } from "@rsuite/icons";
import ControlDrawer from "./ControlDrawer";
import { auth } from "../../misc/firebase";

const SideNavbar = () => {
    const [expanded, setExpanded] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawer = () => {
        setOpenDrawer((openDrawer) => !openDrawer)
    }

    const onSignOut = () => {
        auth.signOut();
        setOpenDrawer(false);
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
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    )
}

export default SideNavbar;