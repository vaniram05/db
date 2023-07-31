import React, { Component, useState } from 'react'
import {
    Divider,
    Form,
    Message,
    Container,
    Header
} from 'semantic-ui-react'
import { useQuery } from '../contexts/QueryContext'

const activeAreaOptions = [
    { key: '5', text: '5', value: '5' },
    { key: '100', text: '100', value: '100' },
    { key: '600', text: '600', value: '600' },
]

const testTypeOptions = [
    { key: 'Perf(BVT)', text: 'Perf(BVT)', value: 'Perf(BVT)' },
    { key: 'Dev', text: 'Dev', value: 'Dev' },
    { key: 'Durability', text: 'Durability', value: 'Durability' },
]

const projectAreaOptions = [
    { key: 'Stack', text: 'Stack', value: 'Stack' },
    { key: 'MEA', text: 'MEA', value: 'MEA' },
    { key: 'Development', text: 'Development', value: 'Development' },
]

export default function StackForm() {
    const [formData, setFormData] = useState({ owner: '', cellCount: '', activeArea: '', projectArea: '', testType: '', cathode: '', anode: '', membrane: '', comments: '' });
    const [submitMessage, setSubmitMessage] = useState();
    const [loading, setLoading] = useState(false);
    const { submitTestReqForm } = useQuery();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleDropdownChange = (e, eName) => {
        setFormData({ ...formData, [eName]: e.target.textContent });
    };

    async function handleSubmit() {
        setLoading(true);
        const formContent = {
            owner: formData.owner,
            cellCount: parseInt(formData.cellCount),
            activeArea: parseInt(formData.activeArea),
            projectArea: formData.projectArea,
            testType: formData.testType,
            cathode: formData.cathode,
            anode: formData.anode,
            membrane: formData.membrane,
            comments: formData.comments,
        }
        const { data, error } = await submitTestReqForm(formContent)
        if (data) {
            setSubmitMessage(formData.owner + ", your request has been submitted for approval!");
            setFormData({ owner: '', cellCount: '', activeArea: '', projectArea: '', testType: '', cathode: '', anode: '', membrane: '', comments: '' });
        } else {
            setSubmitMessage(error);
        }
        setLoading(false);
    }

    return (
        <>
            <Container>
                <Divider hidden />
                <Header as='h2' textAlign="center">Build Request Form</Header>
                <Divider section />
                <Form onSubmit={handleSubmit} loading={loading}>
                    {(submitMessage)
                        ? <Message
                            negative={!submitMessage.includes('has been submitted')}
                            positive={submitMessage.includes('has been submitted')}
                            header='Form Submitted'
                            content={submitMessage}
                        /> : <></>
                    }
                    <Form.Group>
                        <Form.Field required>
                            <label>Owner: </label>
                            <Form.Input placeholder='Stack Owner' name='owner' onChange={(e) => handleInputChange(e)} value={formData.owner} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field required>
                            <label>Cell Count: </label>
                            <Form.Input placeholder='Cell count' name='cellCount' onChange={(e) => handleInputChange(e)} value={formData.cellCount} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Project Area: </label>
                            <Form.Select placeholder='Select project area' onChange={(e) => handleDropdownChange(e, 'projectArea')} value={formData.projectArea} name='projectArea' required options={projectAreaOptions} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Active Area: </label>
                            <Form.Select placeholder='Select active area' onChange={(e) => handleDropdownChange(e, 'activeArea')} value={formData.activeArea} required name='activeArea' options={activeAreaOptions} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field required>
                            <label>Test Type: </label>
                            <Form.Select placeholder='Select your test type' onChange={(e) => handleDropdownChange(e, 'testType')} value={formData.testType} name='testType' required options={testTypeOptions} />
                        </Form.Field>
                    </Form.Group>
                    <Divider section />
                    <Header as='h4'>Additional Info</Header>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Cathode: </label>
                            <Form.Input placeholder='Cathode Info' onChange={(e) => handleInputChange(e)} value={formData.cathode} name='cathode' />
                        </Form.Field>
                        <Form.Field>
                            <label>Anode: </label>
                            <Form.Input placeholder='Anode Info' onChange={(e) => handleInputChange(e)} value={formData.anode} name='anode' />
                        </Form.Field>
                        <Form.Field>
                            <label>Membrane: </label>
                            <Form.Input placeholder='Membrane Info' onChange={(e) => handleInputChange(e)} value={formData.membrane} name='membrane' />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <label>Comments: </label>
                        <Form.TextArea placeholder='Anything important to add?' onChange={(e) => handleInputChange(e)} value={formData.comments} name='comments' />
                    </Form.Field>
                    <Divider hidden />
                    <Form.Button content="Submit" color="teal" disabled={formData.owner == '' || formData.cellCount == '' || formData.projectArea == '' || formData.activeArea == '' || formData.testType == ''} />
                </Form>
            </Container>
        </>
    );
}

