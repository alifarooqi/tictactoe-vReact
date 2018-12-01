import React, { Component } from 'react';
import './App.css';

class MessagePopup extends Component {
    constructor(props){
        super(props)
        this.state = props.message
    }
    render() {
        return (
            <div className="dimmer" id="dimmer">
                <div id="msgScreen">
                    <h2 id="msgTitle">Choose difficulty level</h2>
                    <div id="msgRest">
                        <button id="easy" onClick="easy()" className="btn">Easy</button>
                        <button id="difficult" onClick="difficult()" className="btn">Hard</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessagePopup;
