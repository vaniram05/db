import React, { useEffect, useState } from 'react';
import {
    Divider,
    Form,
    Message,
    Container,
    Header,
    Dropdown,
    Button,
    Segment
} from 'semantic-ui-react'
import BuildForm from './BuildForm';
import { useGraph } from '../../contexts/GraphContext';

export default function StackBuild() {
    const [configured, setConfigured] = useState(false);
    const [selected, setSelected] = useState(false);
    const [choices, setChoices] = useState();
    const { allStacks } = useGraph();

    const startInfo = async () => {
        const { data, error } = await allStacks();
        if (data) {
            setChoices(data.map((info) => ({
                key: info.id,
                text: info.stack,
                value: info.id,
            })));
        }
    }

    useEffect(()=>{
        startInfo();
    }, []);

    return (
        <div>
            <Container>
                <Divider hidden />
                <Header as='h2' textAlign="center">Stack Build Form</Header>
                <Divider section />
                {!configured && choices ?  <div>
                        <Message
                            attached
                            info
                            content='Which stack are you working on? '
                        />
                        <Form className='attached fluid segment'>
                            <h5></h5>
                            <Dropdown search placeholder='Stacks in Database: ' options={choices} fluid selection onChange={(e, result) => { setSelected(result.value) }}/>
                            <h3></h3>
                            <Button color='violet' disabled={!selected ? true : false} onClick={() => {setConfigured(true)}}>Configure form</Button>
                        </Form>
                    </div> : <></>}
                {configured ? <BuildForm num={selected}></BuildForm> : <></>}
            </Container>
        </div>
    );
}
