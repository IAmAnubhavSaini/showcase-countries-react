import React from 'react';
import './App.css';
import {CountryTable} from "./features/country/Country";
import {Col, Container, Row} from "react-bootstrap";

function App() {
    return (
        <Container fluid className="App">
            <Row>
                <Col>
                    <CountryTable></CountryTable>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
