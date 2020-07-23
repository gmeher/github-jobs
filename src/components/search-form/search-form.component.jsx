import React from 'react'
import { Form, Col, } from 'react-bootstrap';

export default function SearchForm({ params, onParamsChange }) {


    return (
        <Form>
            <Form.Row className="align-items-end">
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={onParamsChange} value={params.description} name="description" type="text"></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>location</Form.Label>
                    <Form.Control onChange={onParamsChange} value={params.location} name="location" type="text"></Form.Control>
                </Form.Group>
                <Form.Group as={Col} className="ml-2" xs="auto">
                    <Form.Check onChange={onParamsChange} name="full_time" value={params.full_time} type="checkbox" id="full_time" label="Only full time" className="mb-2"></Form.Check>
                </Form.Group>
            </Form.Row>

        </Form>

    )
}
