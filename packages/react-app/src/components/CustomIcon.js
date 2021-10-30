import {BurgerIcon  }from "react-burger-menu/lib/components/BurgerIcon";
import {CrossIcon} from "react-burger-menu/lib/components/CrossIcon";
import React, { Component } from 'react';
import {Button} from 'antd'
class CustomIcon extends React.Component {
    constructor(props) {
        super(props);
        
        
        this.initial =<BurgerIcon />
        this.state = JSON.parse(window.localStorage.getItem('buttonState')) || {
            
            open: false
            
          }
    }

    getStateIcon = () => {
        if(!this.state.open){
            return(<BurgerIcon />)
        }else{
            return(<CrossIcon/>)
        }
    }
    
    setState(state) {
        window.localStorage.setItem('buttonState', JSON.stringify(state));
        super.setState(state);
      }
    toggleState = () => {
        return this.setState({...this.state, open: !this.state.open});
      }
    
    

    render() {
       

        return (
            
                <Button
                    
                    onClick={this.toggleState}
                    
                >
                    {this.getStateIcon()}
                   
                </Button>
           
        );
    }


}




export default CustomIcon;