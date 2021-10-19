import React, { useCallback, useEffect, useState } from "react";
import Skills from "../partials/Skills";
import ReactDOM from "react-dom";
import { Row, Col, Menu, Alert, Input, List, Card, Switch as SwitchD } from "antd";
import { FaPalette, FaReact, FaCode, FaConnectdevelop, FaGripLines, FaDiceD6, FaEthereum} from "react-icons/fa";
const BOOTSTRAP_FOR_SKILL_ICON = "text-4xl mx-auto inline-block";
const Properties = ( {data} ) => {
    
    return (
 
        <ul >
          {data && data.map((item, index) => 
          
          <li key={index} >
     
            <Skills 
                
                skills={
                  [
                    {
                    skillIcon:<FaConnectdevelop className={BOOTSTRAP_FOR_SKILL_ICON} />,     
                    skillName:item.value
                   }
                ]
                }
                
              />
              
            </li>)}
        </ul>
      
    )
  }

  export default Properties;