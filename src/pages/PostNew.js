import React, {useState} from 'react';
import {useHistory} from "react-router";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {createPost} from '../requests/BlogRequests'

function PostNew() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [is_publish, setIsPublish] = useState(true);
    const [publish_date, setPublishDate] = useState('');

    function handleCreate() {
        if (title.length === 0 || content.length === 0 || publish_date.length === 0) {
            alert('forgot something?');
            return
        }
        let payload = {
            title: title,
            content: content,
            is_publish: is_publish,
            publish_date: publish_date
        };
        createPost(payload).then(function (response) {
            if (response.status === 200) {
                history.push('/posts');
            } else {
                console.log("some error ocurred", response.status);
            }
        })
    }

    function onChecked(e) {
        setIsPublish(e.target.checked)
    }

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
                    <Button color="primary" onClick={handleCreate}>Save</Button>
                    <Button color="primary" onClick={() => history.push('/posts')}>Cancel</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}

export default PostNew;
