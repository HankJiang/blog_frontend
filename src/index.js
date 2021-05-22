import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import {App} from './App';
import './style.css';

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

