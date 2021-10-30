import React, {useState, useEffect} from "react";
import Menu from "react-burger-menu/lib/menus/pushRotate";
import {BurgerIcon  }from "react-burger-menu/lib/components/BurgerIcon"
import {CrossIcon} from "react-burger-menu/lib/components/CrossIcon"
import '../styles/styles.css';
import { Button } from "antd";
import { Link } from 'react-router-dom';
import CustomIcon from "./CustomIcon";
import { IconBase } from "react-icons/lib";
import { IconButton } from "@material-ui/core";
class MobileMenu extends React.Component {
    
    constructor (props) {
      super(props)
      
      this.state = {
        menuOpen: false,
        setRoute: props.setRoute,
        
      };
    }
    
    
    

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange (state) {
      this.setState({menuOpen: state.isOpen })  
    }
    
    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu () {
      this.setState({menuOpen: false})
    }
  
    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    toggleMenu () {
      this.setState(state => ({menuOpen: !state.menuOpen}))
    }
   
    render () {
      return (
        
        <div>
          <Menu 
            
            isOpen={this.state.menuOpen}
            onStateChange={(state) => this.handleStateChange(state)}
          >
            <Link onClick={()=> {this.state.setRoute("/")}} to="/">Gallery</Link>
            <Link onClick={()=> {this.state.setRoute("/yourcollectibles")}} to="/yourcollectibles">About</Link>
            
          </Menu>
          <IconButton onClick={() => this.toggleMenu()} />
              
              
              
        </div>
      )
    }
  }
  export default MobileMenu;