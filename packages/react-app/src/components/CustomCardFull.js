import StackGrid from "react-stack-grid";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useCallback, useEffect, useState, useRef} from "react";
import React, { Component } from 'react';
import { Card } from 'antd';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { FaPalette, FaReact, FaCode, FaConnectdevelop, FaGripLines, FaDiceD6, FaEthereum} from "react-icons/fa";
import Properties from "./Properties";
import { Directions, ExpandMore } from '@material-ui/icons';
import ReactDOM from "react-dom";
import {useParams, useLocation} from 'react-router-dom';
import cardData from '../storage/cardData';
import { ReactMediaPlayer } from ".";
export default function CustomCardFull(props) {
          
       
        let location = useLocation();
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
            let cardActions = props.clickedCardActions
            setClickedCardActions(cardActions)
          }
          updateActions()
        }, []);

        return (
            
            <div class="container-fluid" style={{justifyContent:'center' }}>
                <div class="row" style={{marginTop:300, display:'flex', justifyContent:'center'}}>
                    
                    <StackGrid 
                                style={{height:'100%',borderWidth:5, borderColor:'#F5F5F5',justifyContent:'center'}}
                                columnWidth={440}
                                gutterWidth={0}
                                
                                variant = {'container'}
                            >
                        <div>

                        <Card 
                              style={{height:'100%',width: 300,  borderWidth:0, borderColor:'#F5F5F5', justifyContent:'center'}}
                              variant = {'contained'}
                              actions={clickedCardActions}
                              
                          >
                          
                                <CardMedia style={{height:'100%',width: 420}}>
                                  {reactJSMediaPlayer}
                                </CardMedia>
                  
                        </Card>
                        </div>
                        <div>

                        <Card                           
                            style={{width:'100%', borderWidth:0,marginBlockEnd:20,borderColor:'#F5F5F5'}}
                            
                          >                  
                          <Accordion className="accordion">
                            <AccordionSummary  expandIcon={<ExpandMore />}>
                              <ul style={{display:'inline-flex', padding:3}}>
                                <li style={{justifyContent:'center'}}>
                                  <h4><FaGripLines /></h4>
                                  
                                </li>
                                <li>   </li>
                                <li style={{justifyContent:'right'}}>
                                  
                                  <h4><FaGripLines /></h4>
                                  <h4>   Description</h4>
                                </li>
                              </ul>
                              
                            </AccordionSummary>

                            <AccordionDetails>
                              {cardData[cardID].description}
                            </AccordionDetails>

                          </Accordion>
                          <Accordion className="accordion">
                            <AccordionSummary  expandIcon={<ExpandMore />}>
                            <ul style={{display:'inline-flex', padding:3}}>
                                <li style={{justifyContent:'left'}}>
                                  <h2><FaDiceD6 /></h2>
                                  
                                </li>
                                <li>   </li>
                                <li style={{justifyContent:'right'}}>
                                  
                                  <h2> Properties</h2>
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
                        </div>
                      
                    </StackGrid>              
          
                      <Card 
                        
                        style={{height:'100%',width:1200, borderWidth:10,borderColor:'#F5F5F5'}}
                        variant = {'contained'}
                        title={(
                          cardData[cardID].name
                        )}
                       
                        >
                        <CardContent
                        style={{justifyContent:'left'}}>
                          <li style={{justifyContent:'left'}}>
                            <h1>Current Price</h1>
                            <p>0.5 Eth</p>
                          </li>
                        </CardContent>
                        
                        
                      </Card>
                   
                  
                  </div>
                </div>
        
        );
                        
}

