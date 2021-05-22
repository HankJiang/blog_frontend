import React, {useState} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {login} from '../requests/BlogRequests';
import {useHistory} from "react-router-dom";
import {useUser} from "../context/userContex";


function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('mia');
    const [password, setPassword] = useState('mia');
    const {dispatch} = useUser();

    function handleClick() {
        let payload = {
            "email": email,
            "password": password
        };
        login(payload).then(function (response) {
            if (response.status === 200) {
                dispatch({"type": "change_user_name", "userName": response.data.name});
                history.push('/posts')
            } else {
                alert("invalid email or password");
            }
        })
    }

    return (
        <MuiThemeProvider>
            <div className="paper">
                <Avatar className="avatar">
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className="form">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
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
                    >Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={() => history.push('/register')} variant="body2" className="pointer">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </MuiThemeProvider>
    );
}

export default Login;