import React, { useState, useEffect } from "react";
import {
    Button,
    Checkbox,
    Container,
    Divider,
    Icon,
    Menu,
    Table,
} from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "../../contexts/QueryContext";

export default function RequestTable() {
    const { isUserAdmin, getTestRequests } = useQuery();
    const [requests, setRequests] = useState();

    const adminChecker = async () => {
        try {
            const [data, error] = await getTestRequests();
            setRequests(data);
        } catch { }
    }

    useEffect(() => {
        adminChecker();
    }, []);

    return (
        <>
            <Divider hidden />
            <Container>
                <Table celled selectable color="blue">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Approved</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Owner</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Cell Count</Table.HeaderCell>
                            <Table.HeaderCell>Project Area</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Active Area</Table.HeaderCell>
                            <Table.HeaderCell>Test Type</Table.HeaderCell>
                            <Table.HeaderCell>Cathode</Table.HeaderCell>
                            <Table.HeaderCell>Anode</Table.HeaderCell>
                            <Table.HeaderCell>Membrane</Table.HeaderCell>
                            <Table.HeaderCell>Comments</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {requests ? (
                            requests.map((request) => (
                                <Table.Row key={request.id}>
                                    <Table.Cell
                                        className={
                                            request.approval == "Yes"
                                                ? "positive check"
                                                : request.approval == "No"
                                                    ? "negative"
                                                    : "warning"
                                        }
                                    >
                                        {request.approval == "Yes" ? (
                                            <Icon name="check circle" />
                                        ) : request.approval == "No" ? (
                                            <Icon name="window close" />
                                        ) : (
                                            <Icon name="attention" />
                                        )}
                                        &nbsp;{request.approval}
                                    </Table.Cell>
                                    <Table.Cell>{request.created_at.split("T")[0]}</Table.Cell>
                                    <Table.Cell>{request.owner}</Table.Cell>
                                    <Table.Cell>{request.cellCount}</Table.Cell>
                                    <Table.Cell>{request.projectArea}</Table.Cell>
                                    <Table.Cell>
                                        {request.activeArea} cm<span>&#178;</span>
                                    </Table.Cell>
                                    <Table.Cell>{request.testType}</Table.Cell>
                                    <Table.Cell>{request.cathode}</Table.Cell>
                                    <Table.Cell>{request.anode}</Table.Cell>
                                    <Table.Cell>{request.membrane}</Table.Cell>
                                    <Table.Cell>{request.comments}</Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <></>
                        )}
                    </Table.Body>
                </Table>
            </Container>
        </>
    );
}
