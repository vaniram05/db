import './styles.css'
import { Button, Form, Container, Header, Divider, Input, Checkbox, Image, Grid, Segment } from 'semantic-ui-react'
import React, { Component, useState } from 'react';
import { supabase } from '../supabaseClient';

class AuthForm extends Component {
    state = { email: '', password: '', submittedEmail: '', submittedPassword: '', checked: false, loading: false }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    onChangeCheckbox = (evt, data) => {
       this.setState({checked: data.checked})
      }
    handleSubmit = () => {
        const { email, password } = this.state
        this.setState({ submittedEmail: email, submittedPassword: password })
        // try {
        //     this.setState({loading: true})
        //     await supabase.auth.signIn
        // }
    }

    render() {
        const { email, password, submittedEmail, submittedPassword, checked, loading } = this.state
        return (
            <>
                <div className="leftHalf">
                    {/* <Image src='https://images.unsplash.com/photo-1682687220063-4742bd7fd538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80' /> */}
                </div>

                <div className='rightHalf'>
                    <Header as='h1' textAlign='left'>Sign In</Header>
                    <Divider></Divider>
                    <Form onSubmit={this.handleSubmit} loading={loading}>
                        <Form.Field>
                            <label>Email</label>
                            <Form.Input placeholder='you@versogen.com' name='email' required onChange={this.handleChange} value={email} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Form.Input placeholder="Password" type='password' name='password' required onChange={this.handleChange} value={password} />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Remember me' onClick={(evt, data)=>this.onChangeCheckbox(evt, data)}/>
                        </Form.Field>
                        <Form.Button color="violet" type='submit' content="Sign In" disabled={email=="" || password==""}/>
                    </Form>
                </div>

            </>
        );
    }
}

export default AuthForm;