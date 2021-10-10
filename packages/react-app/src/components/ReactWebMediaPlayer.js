
import React, { Component } from 'react';
import { useState } from 'react';
import App from "../App";
import ReactWebMediaPlayer from 'react-web-media-player';
import { ReactDOM } from "react-dom";
class ReactMediaPlayer extends Component{
        
        constructor(props){
            super(props);
            
            this.state = { url : this.props.url, thumbnail : this.props.thumbnail}
            
        }
        
        
        render(){
        
        return (
        
       
        <ReactWebMediaPlayer 
            style={{ marginLeft: 0, marginRight: 0}}
            height={480}
            width={360}
            video={this.state.url}
            thumbnail={this.state.thumbnail}
            autoplay={false}
            allowFullFrame={false}
            color='#000000'
            />
        
        );
        }
    
}
export default ReactMediaPlayer;

        
    
    

