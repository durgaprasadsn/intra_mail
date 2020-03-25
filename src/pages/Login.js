import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from "../img/PES.jpg";
import { Card } from "../components/Card";
import { Logo } from "../components/Logo";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Error } from "../components/Error";
import { useAuth } from "../context/auth";

function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    function postLogin() {
        //Axios is a Promise-based HTTP client for JavaScript 
        //which can be used in your front-end application and in your Node. js backend. 
        //By using Axios it's easy to send asynchronous HTTP request to REST endpoints 
        //and perform CRUD operations. ... Make http requests from node.
        axios.post("https://www.somePlace.com/auth/login", {
            userName,
            password
        }).then(result => {
            if(result.status === 200) {
                setAuthTokens(result.data);
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    if(isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <Card>
            <Logo src={logoImg} />
            <Form>
                <Input type="username" value={userName} onchange={e => {setUserName(e.target.value);}} placeholder="email"/>
                <Input type="password" value={password} onchange={e => {setPassword(e.target.value);}} placeholder="password" />
                <Button onClick={postLogin}>Sign In</Button>
            </Form>
            <Link to='/signup'> Don't have an account?</Link>
            { isError &&<Error> The username or password provided were incorrect! </Error>}
        </Card>
    );
}

export default Login;