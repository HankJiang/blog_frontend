import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

import { createPost } from '../requests/BlogRequests'

class PostNew extends Component {
    constructor(props){
        super(props);
        this.state={
            title: '',
            content: '',
            is_publish: false,
            publish_date: '',
        };
    }

    handleCreate() {
        let self = this;
        let payload = {
            title: this.state.title,
            content: this.state.content,
            is_publish: this.state.is_publish,
            publish_date: this.state.publish_date
        };
        createPost(payload).then(function (response) {
            if(response.status === 200){
                self.props.history.push('/posts');
            }
            else{
                console.log("some error ocurred", response.status);
            }
        })
    }

    render() {
        return (
            <div className="form_container">
                <form className="form">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={this.state.title}
                                onChange={(event) => this.setState({title: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Switch
                                checked={this.state.is_publish}
                                onChange={(event) => this.setState({is_publish: event.target.value})}
                                name="radio-button-demo"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="date"
                                label="Publish Date"
                                type="date"
                                defaultValue="2021-05-24"
                                onChange={(event) => this.setState({publish_date: event.target.value})}
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
                                value={this.state.content}
                                onChange={(event) => this.setState({content: event.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Button color="primary" onClick={() => this.handleCreate() }>
                        Save
                    </Button>
                </form>
            </div>
        );
    }
}

export default PostNew;