import { useForm } from 'react-hook-form';
import {
    Divider,
    Form,
    Header,
    Segment
} from 'semantic-ui-react'

export default function BuildForm(props) {
    const { register, handleSubmit, formState: { errors },
    } = useForm();
    const onSubmit = (d) => {
        alert(JSON.stringify(d))
    }
    const numOfMEAs = Array.from({ length: parseInt(props.num) }, (_, k) => k);

    return (
        <form className='ui form' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group widths="equal">
                <Form.Field required>
                    <label>NRHW serial number: </label>
                    <input placeholder='Serial #' {...register("nrhw", { required: true })} />
                    <p>{errors.nrhw?.message}</p>
                </Form.Field>
                <Form.Field required>
                    <label>Seal batch number: </label>
                    <input placeholder='Batch #' {...register("seal", { required: true })} />
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field required>
                    <label>Wet end MPP serial number: </label>
                    <input placeholder='Serial #' {...register("wetEnd", { required: true })} />
                </Form.Field>
                <Form.Field required>
                    <label>Dummy cell serial number: </label>
                    <input placeholder='Serial #'  {...register("dummyCell", { required: true })} />
                </Form.Field>
            </Form.Group>
            <Divider section />
            <Header as='h4'>MEAs</Header>
           {numOfMEAs.map((num) =>  <Segment>
                <Form.Group widths='equal'>
                    <Form.Field required>
                        <label>BPP serial number: </label>
                        <input placeholder='Serial #'  {...register("bpp"+num, { required: true })}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Membrane serial number: </label>
                        <input placeholder='Serial #'  {...register("membrane"+num, { required: true })}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Cathode serial number: </label>
                        <input placeholder='Serial #'  {...register("cathode"+num, { required: true })}/>
                    </Form.Field>
                    <Form.Field required>
                        <label>Anode serial number: </label>
                        <input placeholder='Serial #'  {...register("anode"+num, { required: true })}/>
                    </Form.Field>
                </Form.Group>
            </Segment>)}
            <Divider section />
            <Form.Group widths="equal">
                <Form.Field required>
                    <label>Dry end MPP serial number: </label>
                    <input placeholder='Serial #' {...register("dryEnd", { required: true })} />
                </Form.Field>
                <Form.Field required>
                    <label>Stack height: </label>
                    <input placeholder='Height'  {...register("stackHeight", { required: true })} />
                </Form.Field>
                <Form.Field required>
                    <label>Stack build load: </label>
                    <input placeholder='Load'  {...register("stackLoad", { required: true })} />
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field required>
                    <label>Build Operator: </label>
                    <input placeholder='Operator' {...register("buildOperator", { required: true })} />
                </Form.Field>
                <Form.Field required>
                    <label>Date: </label>
                    <input type='date' placeholder='Date'  {...register("date", { required: true })} />
                </Form.Field>
            </Form.Group>
            <Divider hidden />
            <Form.Button content="Submit" color="teal" />
        </form>
    );
}