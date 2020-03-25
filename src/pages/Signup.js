import React from "react";
import { Link } from 'react-router-dom';
import logoImg from "../img/PES.jpg";
import { Card } from "../components/Card";
import { Logo } from "../components/Logo";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

function Signup() {
    return (
        <Card>
            <Logo src={logoImg} />
            <Form>
                <Input type="email" placeholder="email" />
                <Input type="password" placeholder="password" />
                <Input type="password" placeholder="confirm password" />
                <Button>Sign Up</Button>
            </Form>
            <Link to="/login">Already have an account?</Link>
        </Card>
    );
}

export default Signup;