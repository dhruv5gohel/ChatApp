import { Route, Routes, useLocation } from "react-router";
import SideNavbar from "../../Components/Sidebar/SideNavbar";
import { RoomProvider } from "../../context/RoomContext";
import { Col, Grid, Row } from "rsuite";
import Chat from "./Chat";
import { useMediaQuery } from "../../misc/custom-hooks";


const Home = () => {
    const isDesktop = useMediaQuery("(min-width: 992px)");
    const isExact = useLocation().pathname === "/";

    const canRenderSidebar = isDesktop || isExact;

    return (
        <RoomProvider>
            <Grid fluid className="h-100">
                <Row className="h-100">
                        {canRenderSidebar &&
                        <Col xs={24} md={6} className="h-100">
                            <SideNavbar className="side-navbar" />
                        </Col>}

                    <Routes>
                        <Route exact path="/chat/:chatId" element={
                            <Col xs={24} md={18} className="h-100">
                                <Chat />
                            </Col>
                        } />
                    </Routes>

                        {isExact &&
                            <Col xs={24} md={18} className="h-100 text-center mt">
                                <h4>No Chat Room Selected</h4>
                            </Col>
                        }
                </Row>
            </Grid>
        </RoomProvider>
    );
}

export default Home;