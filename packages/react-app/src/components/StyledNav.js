import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  background: #1c2022;
  display: flex;
  justify-content: space-between;
  align-items: center;
  marginTop:0;
  marginRight:0;
  position:fixed;
  width:100%;
  z-index:20;
`;

const Logo = styled.h1`
  font-size: 25px;
  color: white;
`;

const Menu = styled.ul`
  list-style: none;
  marginRight:0;
    justify-content:right;
  li:nth-child(2) {
    margin: 0px 20px;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

const Item = styled.li``;



const NavIcon = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  outline: none;

  @media (min-width: 991px) {
    display: none;
  }
`;

const Line = styled.span`
  display: block;
  border-radius: 50px;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: #fff;
  transition: width 0.4s ease-in-out;

  :nth-child(2) {
    width: ${props => (props.open ? "40%" : "70%")};
  }
`;

const Overlay = styled.div`
  position: absolute;
  height: ${props => (props.open ? "40vh" : 0)};
  width: 100vw;
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
          <Item>
          <Link className="styled.a" style={{marginRight:0,color:'white'}} onClick={()=> {this.state.setRoute("/")}} to="/">Gallery</Link>
          </Item>
          <Item>
          <Link className="styled.a"  style={{marginRight:0,color:'white'}} onClick={()=> {this.state.setRoute("/yourcollectibles")}} to="/yourcollectibles">About</Link>
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
          <Link onClick={()=> {this.state.setRoute("/")}} to="/">Gallery</Link>
          </Item>
          <Item>
          <Link onClick={()=> {this.state.setRoute("/yourcollectibles")}} to="/yourcollectibles">About</Link>
          </Item>
        </OverlayMenu>
      </Overlay>
    </>
  );
};
}

export default StyledNav;
