
import React, { Component } from 'react';
import { useState } from 'react';
import "aos/dist/aos.css";
import '../assets/main.css';
import ReactWebMediaPlayer from 'react-web-media-player';

class ReactMediaPlayer extends Component{
        
        constructor(props){
            super(props);
            
            this.state = { url : this.props.url, thumbnail : this.props.thumbnail}
            
        }
        
        
        render(){
        
        return (
        
       <div>
        <ReactWebMediaPlayer 
            style={{ justifyContent:'center'}}
            height={480}
            width={360}
            video={this.state.url}
            thumbnail={this.state.thumbnail}
            autoplay={false}
            allowFullFrame={true}
            color='#000000'
            />
        </div>
        );
        }
    
}
export default ReactMediaPlayer;

        
    
    

