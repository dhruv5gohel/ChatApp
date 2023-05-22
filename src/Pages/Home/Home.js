import { Route, Routes, useLocation } from "react-router";
import SideNavbar from "../../Components/Sidebar/SideNavbar";
import { RoomProvider } from "../../context/RoomContext";
import { Col, Grid, Row } from "rsuite";
import Chat from "./Chat";


const Home = () => {

    console.log(useLocation());

    return (
        <RoomProvider>
            <Grid fluid className="h-100">
                <Row className="h-100">
                    <Col xs={24} md={6} className="h-100">
                        <SideNavbar className="side-navbar" />
                    </Col>

                    <Routes>
                            <Route path="/chat/:chatId" element={
                                <Col xs={24} md={18} className="h-100">
                                    <Chat />
                                </Col>
                            } />
                    </Routes>
                </Row>
            </Grid>
        </RoomProvider>
    );
}

export default Home;