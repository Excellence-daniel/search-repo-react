import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {SearchRepo} from './search'
import {LoginBtn} from './auth'


import {ProfileCreator} from './profilecreate'

//ReactDOM.render(<SearchRepo />, document.getElementById('root'));
//ReactDOM.render(<LoginBtn/>, document.getElementById('root'));
ReactDOM.render(<ProfileCreator/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
