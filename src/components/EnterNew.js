import React from "react"
import { Button, Container, Divider, Form, Header, Modal, Icon, Input } from "semantic-ui-react"
import './auth/styles.css'

export default function EnterNew() {
    const [open, setOpen] = React.useState(false)

    return <Container>
        <Divider hidden />
        <Header as="h1">Upload Files</Header>
        <Divider />
        <div className="ui form">
            <Form.Field>
                <Input type="file"></Input>
            </Form.Field>
            <p></p>
            <Form.Field>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size='small'
                    trigger={<Button color="teal" size="small">Uploading File</Button>}>
                    <Modal.Content>
                        <p>
                            This page is not functional yet.
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' inverted onClick={() => setOpen(false)}>
                            <Icon name='checkmark' /> Ok
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Form.Field>
        </div>
    </Container>
}