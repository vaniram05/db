import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Button, Form, Header, Divider, Input, Message } from 'semantic-ui-react'
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from '../../contexts/QueryContext';

export default function SignInForm() {
    const { signIn } = useAuth();
    const { isUserAdmin } = useQuery();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function checkAdmin(jsonData) {
        const { data, error } = await isUserAdmin(jsonData['user'].id);
            if (data.length > 0) {
                localStorage.setItem('userAdmin', true)
                console.log('here')
            }
    }

    async function handleSubmit(e) {
        setLoading(true);
        const { data, error } = await signIn(email, password);
        if (error) {
            setError(error.message);
        } else {
            localStorage.setItem('my_user_info', JSON.stringify(data['user']));
            await checkAdmin(data);
            navigate("/testForm");
        }
        setLoading(false);
    }

    return (
        <>
            {localStorage.getItem('my_user_info')
                ? <Navigate to="/testForm" /> : <></>
            }
            <div className="leftHalf">
                {/* <Image src='https://images.unsplash.com/photo-1682687220063-4742bd7fd538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80' /> */}
            </div>
            <div className='rightHalf'>
                <Header as='h1' textAlign='left'>Sign In!</Header>
                {error && <Message warning content={error} />}
                <Divider></Divider>
                <Form onSubmit={handleSubmit} loading={loading}>
                    <Form.Field>
                        <label>Email</label>
                        <Input placeholder='you@versogen.com' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input placeholder="Password" type='password' name='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Field>
                    <label>&nbsp;&nbsp;&nbsp;Need an account? <Link to="/signup">Make one here</Link></label>
                    <Divider></Divider>
                    <Form.Button color="violet" type='submit' content="Sign In" />
                </Form>
            </div>

        </>
    );
};
