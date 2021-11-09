import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../index.css';

export function NavItem(props) {
    const [open, setOpen] = useState(false);
  
    return (
      <li className="nav-item">
        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
          {open ? props.icon2: props.icon2}
        </a>
  
        {open && props.children}
      </li>
    );
  }
  