import React, {useState, useEffect} from 'react';
import {useHistory, useParams, useLocation} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {editPost} from '../requests/BlogRequests'
import {getPost} from '../requests/BlogRequests'

function PostForm() {
    const history = useHistory();
    const location = useLocation();
    const {id} = useParams();
    const [post_id, setPostId] = useState("");
    const [author, setAuthor] = useState("");
    const [mode, setMode] = useState("show");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [is_publish, setIsPublish] = useState(true);
    const [publish_date, setPublishDate] = useState("");

    useEffect(() => {
        init();
    }, []);

    function init() {
        // to be fix
        if (id === 'new') { return }
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

    function onChecked(e) {
        setIsPublish(e.target.checked)
    }

    function handleEdit() {
        let payload = {
            title: title,
            content: content,
            is_publish: is_publish,
            publish_date: publish_date
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
            <div>
                <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                    {title}
                </Typography>
                <Typography align="center">
                    {publish_date} {author}
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" paragraph>
                    {content}
                </Typography>
                <Button color="primary" onClick={() => history.push('/posts')}>Back</Button>
            </div>
        );
    } else {
        return (
            <div className="form_container">
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
                            Is Publish <Switch checked={is_publish} onChange={onChecked}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="date"
                                label="Publish Date"
                                type="date"
                                value={publish_date}
                                onChange={(event) => setPublishDate(event.target.value)}
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline={true}
                                rows={20}
                                fullWidth
                                label="Content"
                                name="content"
                                variant="outlined"
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <div className="perch_10px"></div>
                    <ButtonGroup>
                        <Button color="primary" onClick={handleEdit}>Update</Button>
                        <Button color="primary" onClick={() => history.push('/posts')}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </div>
        );
    }
}

export default PostForm;
