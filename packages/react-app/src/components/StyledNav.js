import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import { Height } from "@material-ui/icons";
const Nav = styled.nav`
  
  min-height: 5vh;
  background: #1c2022;
  justify-content:left;
  display:flex;
  position:fixed;
  width:100%;
  z-index:15;
  @media (max-width: 991px) {
    justify-content:right;
    min-height: 10vh;
  }
`;

const Logo = styled.h1`
  font-size: 25px;
  color: white;
  marginLeft:0;
  position:fixed;
  padding:5px;
  justify-content:center;
  z-index:20;
  @media (max-width: 991px) {
    display:none;
  }
`;

const Menu = styled.ul`
  
  min-height: 5vh;
  background: #1c2022;
  display: flex;
  justify-content: center;
  align-items:center;
  rgb(190, 195, 197)rgb(14, 90, 117)rgb(100, 100, 100)rgb(14, 90, 117)
  
  
  z-index:15;
  width:90%;
  @media (max-width: 991px) {
    display: none;
  }
`;

const Item = styled.li``
;



const NavIcon = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  outline: none;
  position:fixed;
  marginRight:5px;
  padding:5px;
  justify-content:center;
  @media (min-width: 991px) {
    display: none;
  }
`;

const Line = styled.span`
  display: block;
  border-radius: 50px;
  width: 35px;
  height: 6px;
  margin: 5px;
  
  justify-content:right;
  background-color: #fff;
  transition: width 0.4s ease-in-out;
  marginRight:0;
  :nth-child(2) {
    width: ${props => (props.open ? "40%" : "70%")};
  }
`;

const Overlay = styled.div`
position: absolute;
height: ${props => (props.open ? "40vh" : 0)};
width: 100%;
padding:10px;
justify-content:right;
background: #1c2022;
transition: height 0.4s ease-in-out;
z-index:10;
@media (min-width: 991px) {
  display: none;
}
`;

const OverlayMenu = styled.ul`
list-style: none;
position: absolute;
left: 50%;
top: 45%;
marginTop:20px;
display:block;
transform: translate(-50%, -50%);
z-index:20;
li {
  opacity: ${props => (props.open ? 1 : 0)};
  font-size: 25px;
  margin: 50px 0px;
  transition: opacity 0.4s ease-in-out;
}
li:nth-child(2) {
  margin: 50px 0px;
}
`;

class StyledNav extends React.Component {
    
    constructor(props) {
       
        super(props)
        
        this.state = {
            menuOpen: false,
            setRoute: props.setRoute,
        
      };
    }
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
        this.setState(state => ({menuOpen: !this.state.menuOpen}))
      }
  render(){

  
  return (
    <>
    
      <Nav
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}>
        <Logo>100mountains-eth</Logo>
        <Menu>
          
          
          <Item >
          <Link className="block" style={{color:'white'}} onClick={()=> {this.state.setRoute("/")}} to="/">Gallery</Link>
          </Item>
          
          <Item >
          <Link className="block" style={{color:'white'}} onClick={()=> {this.state.setRoute("/yourcollectibles")}} to="/yourcollectibles">About</Link>
          </Item>
          
          
        </Menu>
        <NavIcon onClick={() => this.toggleMenu()}>
          <Line open={this.state.menuOpen} />
          <Line open={this.state.menuOpen} />
          <Line open={this.state.menuOpen} />
        </NavIcon>
      </Nav>
      <Overlay open={this.state.menuOpen}>
        <OverlayMenu open={this.state.menuOpen}>
        <Item>
          <Link className="dropDown" style={{color:'white'}}  onClick={()=> {this.state.setRoute("/")}} to="/">Gallery</Link>
          </Item>
          <Item>
          <Link className="dropDown"  style={{color:'white'}}  onClick={()=> {this.state.setRoute("/yourcollectibles")}} to="/yourcollectibles">About</Link>
          </Item>
        </OverlayMenu>
      </Overlay>
    </>
  );
};
}

export default StyledNav;
