import React, { useState, useEffect } from "react"
import { useOutletContext } from 'react-router-dom';
import { Button, Checkbox, Container, Divider, Icon, Menu, Message, Table } from 'semantic-ui-react'
import { useQuery } from "../../contexts/QueryContext";

export default function PendingRequests() {
    const [filtReqs] = useOutletContext();
    const { updateTable } = useQuery();
    const [selected, setSelected] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async () => {
        let total_ids_list = []
        for (let i = 0; i < filtReqs.length; i++) {
            total_ids_list.push(filtReqs[i].id)
        }

        const ids_list = []
        for (let i = 0; i < selected.length; i++) {
            ids_list.push(parseInt(selected[i]))
        }
        total_ids_list = total_ids_list.filter(x => !ids_list.includes(x))
        updateTable(ids_list, total_ids_list)
        setSubmitted(true)
    }

    return (
        <>
            <Divider hidden />
            <Container>
                {(submitted) ? <Message positive>
                    <Message.Header>You have approved {selected.length} requests and rejected the others</Message.Header>
                    <p>
                        The requesters will be notified. Thank you!
                    </p>
                </Message> : <></>}
                <Table celled selectable color='red'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell collapsing>Approve</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Owner</Table.HeaderCell>
                            <Table.HeaderCell>Cell Count</Table.HeaderCell>
                            <Table.HeaderCell>Project Area</Table.HeaderCell>
                            <Table.HeaderCell>Active Area</Table.HeaderCell>
                            <Table.HeaderCell>Test Type</Table.HeaderCell>
                            <Table.HeaderCell>Cathode</Table.HeaderCell>
                            <Table.HeaderCell>Anode</Table.HeaderCell>
                            <Table.HeaderCell>Membrane</Table.HeaderCell>
                            <Table.HeaderCell>Comments</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {filtReqs ? (
                            filtReqs.map((filtReq) => (
                                <Table.Row key={filtReq.id}>
                                    <Table.Cell>
                                        <Checkbox onChange={(e, data) => {
                                            if (data.checked == true) {
                                                setSelected((prevVals) => [...prevVals, filtReq.id])
                                            } else {
                                                setSelected((prevState) =>
                                                    prevState.filter((prevItem) => prevItem !== filtReq.id)
                                                );
                                            }
                                        }} />
                                        {/* onChange={(e, data) => onClicked(filtReq.id, data.checked)}  */}
                                    </Table.Cell>
                                    <Table.Cell>{filtReq.created_at.split("T")[0]}</Table.Cell>
                                    <Table.Cell>{filtReq.owner}</Table.Cell>
                                    <Table.Cell>{filtReq.cellCount}</Table.Cell>
                                    <Table.Cell>{filtReq.projectArea}</Table.Cell>
                                    <Table.Cell>
                                        {filtReq.activeArea} cm<span>&#178;</span>
                                    </Table.Cell>
                                    <Table.Cell>{filtReq.testType}</Table.Cell>
                                    <Table.Cell>{filtReq.cathode}</Table.Cell>
                                    <Table.Cell>{filtReq.anode}</Table.Cell>
                                    <Table.Cell>{filtReq.membrane}</Table.Cell>
                                    <Table.Cell>{filtReq.comments}</Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <></>
                        )}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Button size='small' onClick={onSubmit}>Submit Approvals</Button>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <div>Approving: {selected.length} requests</div>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Container>
        </>
    );
}