import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { ReactDOM } from 'react-dom';
import React, { Component } from 'react';







class HeartButton extends React.Component {
    constructor(props) {
        super(props);
        
        
        this.initial =<FcLikePlaceholder />
        this.state = JSON.parse(window.localStorage.getItem(this.props.itemId)) || {
            likes: 0,
            liked: false,
            
          }
    }

    getStateIcon = () => {
        if(!this.state.liked){
            return(<FcLikePlaceholder />)
        }else{
            return(<FcLike/>)
        }
    }
    
    setState(state) {
        window.localStorage.setItem(this.props.itemId, JSON.stringify(state));
        super.setState(state);
      }
    increaseCount = () => {
        return this.setState({...this.state, likes: this.state.likes + 1, liked: true});
      }
    decreaseCount = () => {
        return this.setState({...this.state, likes: this.state.likes - 1, liked: false});
      }
    addLike = () => {
        if (!this.state.liked) {
            this.increaseCount();
            
            
        } else {
            this.decreaseCount();
            
            
        }

    };

    render() {
        const likes = this.state.likes;

        return (
            <div>
                <button
                    className="button"
                    onClick={this.addLike}
                    id={this.props.itemId}
                >
                    {this.getStateIcon()}
                    {this.state.likes}
                </button>
            </div>
        );
    }


}




export default HeartButton;
   


