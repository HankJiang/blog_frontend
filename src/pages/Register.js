import React, {useState} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import {regist} from '../requests/BlogRequests'
import {useHistory} from "react-router-dom";

function Register() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    function handleClick() {
        if (confirm_password !== password) {
            alert("password must be consistent");
            return
        }
        if (name.length > 0 && confirm_password.length > 0 && email.length > 0 && password.length > 0) {
            let payload = {
                "name": name,
                "email": email,
                "password": password
            };
            regist(payload).then(function (response) {
                if (response.status === 200) {
                    history.push('/login')
                } else {
                    alert("Failed please try again")
                }
            })
        } else {
            alert("Input field value is missing");
        }
    }

    return (
        <MuiThemeProvider>
            <div className="paper">
                <Avatar className="avatar">
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className="form">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                onChange={(event) => setName(event.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="confirm password"
                                label="Confirm password"
                                type="password"
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <div className="blank"/>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={ handleClick }
                    >Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={() => history.push('/login') } variant="body2"  className="pointer">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </MuiThemeProvider>
    );
}

export default Register;
