import React, { Component } from 'react';

class MessagePopup extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        if(this.props.message.visibility){
            setTimeout(()=>{
                document.getElementById("dimmer").classList.add("show")
            }, 50);
        }
        else
            document.getElementById("dimmer").classList.remove("show")
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.message.visibility !== this.props.message.visibility){
            let element = document.getElementById("dimmer")
            if(this.props.message.visibility)
                element.classList.add("show")
            else
                element.classList.remove("show")
        }
    }


    render() {
        return (
            <div className={"dimmer "} id="dimmer">
                <div id="msgScreen">
                    <h2 id="msgTitle">{ this.props.message.message }</h2>
                    { this.props.message.rest }
                </div>
            </div>
        );
    }
}

export default MessagePopup;
