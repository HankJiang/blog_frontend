import React from 'react';
import {useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import {useUser} from "../context/userContex";
import {logout} from "../requests/BlogRequests";


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    }
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const history = useHistory();
    const {dispatch} = useUser();

    function onLogout() {
        logout().then(function (response) {
            if (response.status === 200) {
                dispatch({"type": "change_user_name", "userName": "请登录"});
                history.push('/login')
            }
        })
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Blog
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Button disabled className="orange" >User: <UserName/></Button>
                        <Button color="inherit" onClick={onLogout}>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

function UserName() {
    const {state: {userName}} = useUser();
    return (<div>{userName}</div>)
}
