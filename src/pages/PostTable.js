import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {fade, makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {deletePost, getPosts} from '../requests/BlogRequests'

const columns = [
    {id: 'title', label: 'Title', minWidth: 120},
    {id: 'view_count', label: 'View Count', minWidth: 50},
    {id: 'author', label: 'Author', minWidth: 50, align: 'right'},
    {id: 'publish_date', label: 'Publish Date', minWidth: 80, align: 'right'},
    {id: 'action', label: 'Action', minWidth: 120, align: 'right'}
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));

export default function StickyHeadTable() {
    const classes = useStyles();
    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [posts, setPosts] = useState([]);
    const [keywords, setKeywords] = useState('');

    useEffect(() => {
        loadPosts({});
    }, []);

    function loadPosts(params) {
        getPosts(params).then(function (response) {
            if (response.status === 200) {
                setPosts(response.data);
            }
        });
    }

    function onSearch(e) {
        if (e.key !== "Enter") { return }
        setKeywords(e.target.value);
        let params = {keywords: e.target.value};
        loadPosts(params)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onShow = (post) => {
        history.push({pathname: `/posts/${post.id}`, state: { mode: 'show' }});
    };
    const onEdit = (post) => {
        history.push({pathname: `/posts/${post.id}`, state: { mode: 'edit' }});
    };
    const onDelete = (post) => {
        deletePost(post.id).then(function (response) {
            if(response.status === 200){
                loadPosts({keywords: keywords});
            }
            else{
                console.log("some error ocurred", response.status);
            }
        });
    };

    return (
        <Paper className={classes.root}>
            <Toolbar>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        onKeyDown={(e) => onSearch(e)}
                    />
                </div>
                <div className="grow" />
                <div>
                    <Button color="primary" onClick={() => history.push('/post/new')}>New</Button>
                </div>
            </Toolbar>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === 'action') {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <ButtonGroup variant="text" color="primary"
                                                                 aria-label="text primary button group">
                                                        <Button onClick={() => onEdit(row)}>Edit</Button>
                                                        <Button onClick={() => onShow(row)}>Show</Button>
                                                        <Button onClick={() => onDelete(row)}>Delete</Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            )
                                        }
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={posts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
