import React, {Component, useState, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {getPost} from '../requests/BlogRequests'
import Button from "@material-ui/core/Button";
import {editPost} from '../requests/BlogRequests'
import TextField from "@material-ui/core/TextField";
import {useHistory, useParams, useLocation} from "react-router-dom";


function PostForm() {
    const history = useHistory();
    const location = useLocation();
    const {id} = useParams();
    const [post_id, setPostId] = useState("");
    const [author, setAuthor] = useState("");
    const [mode, setMode] = useState("show");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [is_publish, setIsPublish] = useState("");
    const [publish_date, setPublishDate] = useState("");

    useEffect(() => {
        init();
    }, []);

    function init() {
        getPost(id).then(function (response) {
            if (response.status === 200) {
                let post = response.data;
                setTitle(post.title);
                setIsPublish(post.is_publish);
                setContent(post.content);
                setPublishDate(post.publish_date);
                setAuthor(post.author);
                setMode(location.state.mode);
                setPostId(id);
            } else {
                console.log("some error ocurred", response.status);
            }
        })
    }


    function handleEdit() {
        let payload = {
            title: title,
            content: content,
        };
        editPost(post_id, payload).then(function (response) {
            if (response.status === 200) {
                history.push('/posts');
            } else {
                console.log("some error ocurred", response.status);
            }
        })
    }

    if (mode === 'show') {
        return (
            <Grid item xs={12} md={6}>
                <div>
                    <Typography component="h2" variant="h5">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {publish_date + author}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        {content}
                    </Typography>
                </div>
            </Grid>
        );
    } else {
        return (
            <Grid item xs={12} md={6}>
                <div>
                    <form className="form">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    name="title"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Content"
                                    name="content"
                                    value={content}
                                    onChange={(event) => setContent(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </form>
                    <Button color="primary" onClick={ handleEdit }>
                        Submit
                    </Button>
                </div>
            </Grid>
        );
    }
}

export default PostForm;