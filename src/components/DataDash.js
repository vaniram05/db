import React, { useEffect, useState } from 'react';
import { Container, Grid, Divider, Table, Dropdown, Message, Segment, Button, Form } from 'semantic-ui-react';
import { useGraph } from '../contexts/GraphContext';
import './auth/styles.css'
import { useNavigate } from 'react-router-dom';

function DataDash() {
    const navigate = useNavigate();
    const [stackInfo, setStackInfo] = useState();
    const [choices, setChoices] = useState();
    const [tableState, setTableState] = useState({ owner: '____', startDate: '____', hoursRun: '____', stack: '' });

    const { allStacks } = useGraph();

    const startInfo = async () => {
        const { data, error } = await allStacks();
        if (data) {
            setStackInfo(data);
            setChoices(data.map((info) => ({
                key: info.id,
                text: info.stack,
                value: info.id,
            })));
        }
    }

    const handleChange = (my_id) => {
        const myArr = stackInfo.find(x => x.id === my_id)
        setTableState({ owner: myArr.owner, startDate: myArr.startDate, hoursRun: myArr.hoursRun, stack: myArr.stack });
    }

    const handleSubmit = () => {
        navigate("/analyze", {
            state: {
                stackName: tableState.stack,
            }
        });
    }

    useEffect(() => {
        startInfo();
    }, []);

    return (
        <div>
            <Container>
                {choices ? <Grid columns={2} verticalAlign='middle'>
                    <Grid.Column>
                        <div className='vertical-center'>
                            <Message
                                attached
                                info
                                header='Analyzing Stack Data'
                                content='Click on an entry to see its info: '
                            />
                            <Form className='attached fluid segment'>
                                <h5></h5>
                                <Dropdown search placeholder='Stacks in Database: ' fluid selection options={choices} onChange={(e, result) => { handleChange(result.value) }} />
                                <h3></h3>
                                <Button color='violet' disabled={!tableState.stack ? true : false} onClick={handleSubmit}>Graph this stack</Button>
                            </Form>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className='vertical-center'>
                            <Table celled color='teal'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Owner</Table.HeaderCell>
                                        <Table.HeaderCell>Start Date</Table.HeaderCell>
                                        <Table.HeaderCell>Total hours</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>{tableState.owner}</Table.Cell>
                                        <Table.Cell>{tableState.startDate}</Table.Cell>
                                        <Table.Cell>{tableState.hoursRun}&nbsp; hours</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div>
                    </Grid.Column>

                </Grid> : <h3>Please check network connection.</h3>}

                <Divider vertical />
            </Container>
        </div>
    );
}

export default DataDash;