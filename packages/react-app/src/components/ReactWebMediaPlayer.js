
import React, { Component } from 'react';
import { useState } from 'react';
import "aos/dist/aos.css";
import { useMediaQuery } from 'react-responsive';

import '../assets/main.css';
import ReactWebMediaPlayer from 'react-web-media-player';
const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const BigDesktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1501 })
    return isDesktop ? children : null
  }
const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1500 })
    return isDesktop ? children : null
  }
class ReactMediaPlayer extends Component{
        
        constructor(props){
            super(props);
            
            this.state = { url : this.props.url, thumbnail : this.props.thumbnail}
            
        }
        
        
        render(){
        
        return (
            
       <div>
           <Tablet>
            
            <ReactWebMediaPlayer 
                style={{ justifyContent:'center'}}
                height={399}
                width={300}
                video={this.state.url}
                thumbnail={this.state.thumbnail}
                autoplay={false}
                allowFullFrame={true}
                color='#000000'
                />
            
            </Tablet>
           <Mobile>
            
            <ReactWebMediaPlayer 
                style={{ justifyContent:'center'}}
                height={532}
                width={400}
                video={this.state.url}
                thumbnail={this.state.thumbnail}
                autoplay={false}
                allowFullFrame={true}
                color='#000000'
                />
            
            </Mobile>
            <BigDesktop>
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
            </BigDesktop>
            <Desktop>
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
            </Desktop>
            
        </div>
        );
        }
    
}
export default ReactMediaPlayer;

        
    
    

