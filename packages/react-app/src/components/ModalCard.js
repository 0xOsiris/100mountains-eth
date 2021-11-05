import React, { useCallback, useEffect, useState } from "react";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Card } from 'antd';
import { useMediaQuery } from 'react-responsive';
import StackGrid from "react-stack-grid";
import { Link, useLocation }from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { FaPalette, FaReact, FaCode, FaConnectdevelop, FaGripLines, FaDiceD6, FaEthereum, FaLink} from "react-icons/fa";
import { LinkOutlined } from "@ant-design/icons";
import { Directions, ExpandMore } from '@material-ui/icons';
import cardData from '../storage/cardData';
import Properties from "./Properties";
import { ReactMediaPlayer } from ".";
import { Icon } from "semantic-ui-react";

const BigDesktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1501 })
    return isDesktop ? children : null
  }
const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1500 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
  }

const ModalCard=(props)=> {
    
    const { cardID } = useParams()
    const [ reactJSMediaPlayer, setReactJSMediaPlayer ] = useState()
    const [ clickedCardActions, setClickedCardActions ] = useState()
    
    
    useEffect(()=>{
        const updateMediaPlayer = async () => {
          let ReactJSMediaPlayer = <ReactMediaPlayer url={cardData[cardID].external_url} thumbnail={cardData[cardID].image} style={{ marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' }}/>
          setReactJSMediaPlayer(ReactJSMediaPlayer)
        }
        updateMediaPlayer()
      }, []);

   

      useEffect(()=>{
        const updateActions = async () => {
          let cardActions = props.actions
          
            setClickedCardActions(cardActions)
          
          
        }
        updateActions()
      }, []);

    

    return(
       
        <div className="flex items-center justify-center">
        <Desktop>
        
        <Card 
            
            hoverable
            actions={clickedCardActions} 
              
              style={{height:'100%', width:400,justifyContent:'center'}} 
              key={cardData[cardID].name}
              variant = {'contained'}
              cardID={cardID}
              title={
                <div style={{maxHeight:10,maxWidth:'100%',display:'inline-flex', justifyContent:'space-evenly'}}>
                    
                    <div style={{alignContent:'left'}}>
                    <div style={{ marginLeft:0,marginTop:0,justifyContent:'left'}}>
                      <p style={{paddingLeft:0,fontSize: '0.8em',fontWeight: 'bolder',color:'#707070', marginBottom:0}}>{cardData[cardID].name}</p>
                      <div style={{display:'inline-flex', width:'fit-content'}}>
                      <FaEthereum style={{fontSize: '0.8em',marginLeft: 10,marginTop:3, marginRight:2}}/>
                        <p style={{fontSize: '0.8em',marginTop:0, marginRight:0,fontWeight: 'bolder',color:'#000000'}}>0.5</p>
                      </div>
                     
                        
                    </div>
                    </div>
                    <div style={{alignContent:'right'}}>
                    <p style={{fontSize: '0.8em', paddingInline:'50%',opacity: 1, marginTop:3}}>
                    <a 
                      style={{ opacity: 1}}
                      href='https://testnets.opensea.io/assets/0xC326B29BcEcdfe4Dec0c52aB7D148314487C2eAd/${cardID}'
                    >
                      <FaLink />
                   </a>
                   </p>
                   </div>
                    
               
               
                
                </div>
              }
              
              
              
        >
          
        
          <CardMedia>
            <div style={{justifyContent:'center', maxWidth:'100%'}}>
            {reactJSMediaPlayer}
            </div>
          </CardMedia>
          
          
          <Accordion className="accordion">
                <AccordionSummary  expandIcon={<ExpandMore />}>
                    <ul style={{display:'inline-flex'}}>
                    <li style={{justifyContent:'center'}}>
                        
                        
                    </li>
                    <li>   </li>
                    <li style={{justifyContent:'center'}}>
                        
                        
                        <h4>  Description</h4>
                    </li>
                    </ul>
                    
                </AccordionSummary>

                <AccordionDetails>
                    {cardData[cardID].description}
                </AccordionDetails>

                </Accordion>
                <Accordion className="accordion">
                <AccordionSummary  expandIcon={<ExpandMore />}>
                <ul style={{display:'inline-flex'}}>
                    <li style={{justifyContent:'left'}}>
                        <h2><FaDiceD6 /></h2>
                        
                    </li>
                    <li>   </li>
                    <li style={{justifyContent:'right'}}>
                        
                        <h4> Properties</h4>
                    </li>
                    </ul>
                </AccordionSummary>
                <AccordionDetails> 
                    <div>
                    <Properties data={cardData[cardID].attributes}/>
                    </div>
                </AccordionDetails>
                </Accordion>

                <Accordion className="accordion">
                <AccordionSummary  expandIcon={<ExpandMore />}>
                    Accordion 3
                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </AccordionDetails>

                </Accordion>
        </Card>
        
        </Desktop>
        <BigDesktop>
        <Card hoverable
              
              style={{height:'100%', width:'100%',justifyContent:'center', borderWidth:0.1}} key={cardData[cardID].name}
              actions={clickedCardActions}
              cardID={cardID}
              title={
                <div style={{maxHeight:10,maxWidth:'100%',display:'inline-flex', justifyContent:'space-evenly'}}>
                
                
                    
                    <div style={{alignContent:'left'}}>
                    <div style={{ marginLeft:0,marginTop:0,justifyContent:'left'}}>
                      <p style={{paddingLeft:0,fontSize: '0.8em',fontWeight: 'bolder',color:'#707070', marginBottom:0}}>{cardData[cardID].name}</p>
                      <div style={{display:'inline-flex', width:'fit-content'}}>
                      <FaEthereum style={{fontSize: '0.8em',marginLeft: 10,marginTop:3, marginRight:2}}/>
                        <p style={{fontSize: '0.8em',marginTop:0, marginRight:0,fontWeight: 'bolder',color:'#000000'}}>0.5</p>
                      </div>
                     
                        
                    </div>
                    </div>
                    <div style={{alignContent:'right'}}>
                    <p style={{fontSize: '0.8em', paddingInline:'50%',opacity: 1, marginTop:3}}>
                    <a 
                      style={{ opacity: 1}}
                      href='https://testnets.opensea.io/assets/0xC326B29BcEcdfe4Dec0c52aB7D148314487C2eAd/${cardID}'
                    >
                      <FaLink />
                   </a>
                   </p>
                   </div>
                    
               
               
                
                </div>
              }
              
              
        >
          
     
          <CardMedia>
          {reactJSMediaPlayer}
          </CardMedia>
          
         

        </Card>
        </BigDesktop>
        <Tablet>
        <Card hoverable
             actions={clickedCardActions}
             title={
              <div style={{maxHeight:10,maxWidth:'100%',display:'inline-flex', justifyContent:'space-evenly'}}>
                
                
                    
                    <div style={{alignContent:'left'}}>
                    <div style={{ marginLeft:0,marginTop:0,justifyContent:'left'}}>
                      <p style={{paddingLeft:0,fontSize: '0.8em',fontWeight: 'bolder',color:'#707070', marginBottom:0}}>{cardData[cardID].name}</p>
                      <div style={{display:'inline-flex', width:'fit-content'}}>
                      <FaEthereum style={{fontSize: '0.8em',marginLeft: 10,marginTop:3, marginRight:2}}/>
                        <p style={{fontSize: '0.8em',marginTop:0, marginRight:0,fontWeight: 'bolder',color:'#000000'}}>0.5</p>
                      </div>
                     
                        
                    </div>
                    </div>
                    <div style={{alignContent:'right'}}>
                    <p style={{fontSize: '0.8em', paddingInline:'50%',opacity: 1, marginTop:3}}>
                    <a 
                      style={{ opacity: 1}}
                      href='https://testnets.opensea.io/assets/0xC326B29BcEcdfe4Dec0c52aB7D148314487C2eAd/${cardID}'
                    >
                      <FaLink />
                   </a>
                   </p>
                   </div>
                    
               
               
                
                </div>
            }
            style={{height:'100%', justifyContent:'center', borderWidth:0}} key={cardData[cardID].name}
            variant = {'contained'}
            cardID={cardID}
            
            
        >
        
     
        <CardMedia>
            {reactJSMediaPlayer}
        </CardMedia>
        
       
        
        </Card>
        </Tablet>
        <Mobile>
        <Card hoverable
             actions={clickedCardActions}
             title={
              <div style={{maxHeight:10,maxWidth:'100%',display:'inline-flex', justifyContent:'space-evenly'}}>
                
                
                    
                    <div style={{alignContent:'left'}}>
                    <div style={{ marginLeft:0,marginTop:0,justifyContent:'left'}}>
                      <p style={{paddingLeft:0,fontSize: '0.8em',fontWeight: 'bolder',color:'#707070', marginBottom:0}}>{cardData[cardID].name}</p>
                      <div style={{display:'inline-flex', width:'fit-content'}}>
                      <FaEthereum style={{fontSize: '0.8em',marginLeft: 10,marginTop:3, marginRight:2}}/>
                        <p style={{fontSize: '0.8em',marginTop:0, marginRight:0,fontWeight: 'bolder',color:'#000000'}}>0.5</p>
                      </div>
                     
                        
                    </div>
                    </div>
                    <div style={{alignContent:'right'}}>
                    <p style={{fontSize: '0.8em', paddingInline:'50%',opacity: 1, marginTop:3}}>
                    <a 
                      style={{ opacity: 1}}
                      href='https://testnets.opensea.io/assets/0xC326B29BcEcdfe4Dec0c52aB7D148314487C2eAd/${cardID}'
                    >
                      <FaLink />
                   </a>
                   </p>
                   </div>
                    
               
               
                
                </div>
              
            }
            style={{height:'100%', justifyContent:'center', borderWidth:0}} key={cardData[cardID].name}
            variant = {'contained'}
            cardID={cardID}
            
            
        >
        
     
        <CardMedia>
            {reactJSMediaPlayer}
        </CardMedia>
        
        
        
       
        </Card>
        
        </Mobile>

        </div>
    )
}
export default ModalCard;