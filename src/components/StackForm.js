import React, { Component } from 'react'
import {
    Button,
    Divider,
    Form,
    Message,
    Container,
    Header
} from 'semantic-ui-react'

const cellCountOptions = [
    { key: '1', text: '1', value: '1' },
    { key: '3', text: '3', value: '3' },
    { key: '5', text: '5', value: '5' },
]

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

class StackForm extends Component {
    state = { owner: '', cellCount: '', projectArea: '', activeArea: '', testType: '', cathode: '', anode: '', membrane: '', comments: '', submittedOwner: '', submittedCellCount: '', submittedProjectArea: '', submittedActiveArea: '', submittedTestType: '', submittedCathode: '', submittedAnode: '', submittedMembrane: '', submittedComments: '', successfulSubmit: false }
    handleChange = (e, { name, value }) => this.setState({ [name]: value });
    handleSubmit = () => {
        const { owner, cellCount, projectArea, activeArea, testType, cathode, anode, membrane, comments } = this.state;
        this.setState({ submittedOwner: owner, submittedCellCount: cellCount, submittedProjectArea: projectArea, submittedActiveArea: activeArea, submittedTestType: testType, submittedCathode: cathode, submittedAnode: anode, submittedMembrane: membrane, submittedComments: comments, successfulSubmit: true });
        this.setState({ owner: '', cellCount: '', projectArea: '', activeArea: '', testType: '', cathode: '', anode: '', membrane: '', comments: '' });
    }

    render() {
        const { owner, cellCount, projectArea, activeArea, testType, cathode, anode, membrane, comments, submittedOwner, submittedCellCount, submittedProjectArea, submittedActiveArea, submittedTestType, submittedCathode, submittedAnode, submittedMembrane, submittedComments, successfulSubmit } = this.state;

        return (
            <Container>
                <Divider hidden />
                <Header as='h2' textAlign="center">Test Request Form</Header>
                <Divider section />
                <Form onSubmit={this.handleSubmit}>
                    {(successfulSubmit == true)
                        ? <Message
                            positive
                            header='Form Completed'
                            content= {submittedOwner.concat(", your request has been submitted for approval!")}
                        /> : <></>
                    }
                    <Form.Group>
                        <Form.Field required>
                            <label>Owner: </label>
                            <Form.Input placeholder='Owner of request' name='owner' onChange={this.handleChange} value={owner} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field required>
                            <label>Cell Count: </label>
                            <Form.Select placeholder='Select cell count' value={cellCount} onChange={this.handleChange} name='cellCount' required options={cellCountOptions} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Project Area: </label>
                            <Form.Select placeholder='Select project area' onChange={this.handleChange} value={projectArea} name='projectArea' required options={projectAreaOptions} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Active Area: </label>
                            <Form.Select placeholder='Select active area' onChange={this.handleChange} value={activeArea} required name='activeArea' options={activeAreaOptions} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field required>
                            <label>Test Type: </label>
                            <Form.Select placeholder='Select your test type' onChange={this.handleChange} value={testType} name='testType' required options={testTypeOptions} />
                        </Form.Field>
                    </Form.Group>
                    <Divider section />
                    <Header as='h4'>Additional Info</Header>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Cathode: </label>
                            <Form.Input placeholder='Cathode Info' onChange={this.handleChange} value={cathode} name='cathode' />
                        </Form.Field>
                        <Form.Field>
                            <label>Anode: </label>
                            <Form.Input placeholder='Anode Info' onChange={this.handleChange} value={anode} name='anode' />
                        </Form.Field>
                        <Form.Field>
                            <label>Membrane: </label>
                            <Form.Input placeholder='Membrane Info' onChange={this.handleChange} value={membrane} name='membrane' />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <label>Comments: </label>
                        <Form.TextArea placeholder='Anything important to add?' onChange={this.handleChange} value={comments} name='comments' />
                    </Form.Field>
                    <Divider hidden />
                    <Form.Button content="Submit" color="teal" disabled={owner == '' || cellCount == '' || projectArea == '' || activeArea == '' || testType == ''} />
                </Form>
            </Container>
        )
    }
}

export default StackForm