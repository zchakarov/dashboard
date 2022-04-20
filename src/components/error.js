import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import { useLocation, useNavigate} from "react-router-dom";



export default function Error() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    if(location.state && location.state.length === 0 ) {
        document.title = "Nadia // 404";

    }

        return (

            <div className="error">
                <Container fluid className="error--container">
                    <Row className="h-100 justify-content-center align-items-center">
                        <Col lg={12}>
                            <h1>404 Error</h1>
                            <h3 onClick={()=> navigate("/")} className="link m-0 align-self-center">Geh zurück zur Startseite</h3>
                        </Col>
                    </Row>
                </Container>


            </div>
    )
};
