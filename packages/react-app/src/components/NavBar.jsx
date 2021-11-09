
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../index.css';
export function NavBar(props) {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">{props.children}</ul>
      </nav>
    );
  }
  
