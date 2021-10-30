import React, { useCallback, useEffect, useState } from "react";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Card } from 'antd';
import { useMediaQuery } from 'react-responsive';
import StackGrid from "react-stack-grid";
import { Link }from 'react-router-dom';
import { FaPalette, FaReact, FaCode, FaConnectdevelop, FaGripLines, FaDiceD6, FaEthereum, FaLink} from "react-icons/fa";
import { LinkOutlined } from "@ant-design/icons";
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
const GalleryCard=(props)=> {
    

    let forSale = props.forSale
    let cardMedia = props.cardMedia;
    let cardID = props.cardID;
    let cardName = props.cardName;
    let cardExternal = props.cardExternal;
    let cardPropeties = props.cardPropeties;
    let cardDescription = props.cardDescription;
    const [ clickedCardMedia, setCardClickedMedia ] = useState()
    const [ clickedCardThumbnail, setCardClickedThumbnail ] = useState()
    const [ clickedCardContent, setCardClickedContent ] = useState()
    const [ clickedCardActions, setCardClickedActions ] = useState()
    const [ clickedCardProperties, setCardClickedProperties ] = useState()
    const [ clickedCardDescription, setCardClickedDescription ] = useState()
    const [ reactJSMediaPlayer, setReactJSMediaPlayer ] = useState()
    const [ customCardView, setCustomCardView ] = useState()
    const [ cardClicked, setCardClicked ] = useState()
    const [ cardForSale, setCardForSale ] = useState()

    useEffect(()=>{
          const updateActions = async () => {
            let cardActions = props.actions
            setCardClickedActions(cardActions)
          }
          updateActions()
        }, []);

    useEffect(()=>{
      const updateForSale = async () => {
        let forSale = props.forSale
        setCardForSale(forSale)
      }
      updateForSale()
    }, [cardForSale]);

    return(
        <div>
        <Desktop>
        <Card hoverable
              
              style={{height:'100%', justifyContent:'center', borderWidth:0}} 
              key={cardName}
              variant = {'contained'}
              cardID={cardID}
              title={
                <div style={{maxHeight:10,maxWidth:'100%',display:'inline-flex', justifyContent:'space-evenly'}}>
                
                
                    
                    <div style={{alignContent:'left'}}>
                    <div style={{ marginLeft:0,marginTop:0,justifyContent:'left'}}>
                      <p style={{paddingLeft:0,fontSize: '0.8em',fontWeight: 'bolder',color:'#707070', marginBottom:0}}>{cardName}</p>
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
              onClick = {() => {
                
                setCardClickedMedia(cardExternal)
                setCardClickedThumbnail(cardMedia)
                setCardClickedContent(cardName)
                props.actionsChanger(clickedCardActions)
                setCardClickedProperties(cardPropeties)
                setCardClickedDescription(cardDescription)
                
                
                
              }}
              
        >
          
          <Link to ={{pathname:`/card/${cardID}`}}>
          <CardMedia>
            {cardForSale ? <img style={{omaxWidth:'100%'}} src={cardMedia}/>:<img style={{opacity: 0.1,maxWidth:'100%'}} src={cardMedia}/> }
            
          </CardMedia>
          
          
          
            </Link>
        </Card>
        </Desktop>
        <BigDesktop>
        <Card hoverable
              
              style={{height:'100%', width:'100%',justifyContent:'center', borderWidth:0.1}} key={cardName}
              
              cardID={cardID}
              title={
                <div style={{maxHeight:10,maxWidth:'100%',display:'inline-flex', justifyContent:'space-evenly'}}>
                
                
                    
                    <div style={{alignContent:'left'}}>
                    <div style={{ marginLeft:0,marginTop:0,justifyContent:'left'}}>
                      <p style={{paddingLeft:0,fontSize: '0.8em',fontWeight: 'bolder',color:'#707070', marginBottom:0}}>{cardName}</p>
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
              onClick = {() => {
                
                setCardClickedMedia(cardExternal)
                setCardClickedThumbnail(cardMedia)
                setCardClickedContent(cardName)
                props.actionsChanger(clickedCardActions)
                setCardClickedProperties(cardPropeties)
                setCardClickedDescription(cardDescription)
                
                
                
              }}
              
        >
          
          <Link to ={{pathname:`/card/${cardID}`}}>
          <CardMedia>
            {cardForSale ? <img style={{maxWidth:'100%'}} src={cardMedia}/>:<img style={{opacity: 0.1,maxWidth:'100%'}} src={cardMedia}/> }
          </CardMedia>
          
         
          
            </Link>
        </Card>
        </BigDesktop>
        <Tablet>
        <Card hoverable
           
             title={
              <div style={{maxHeight:10,maxWidth:'100%',display:'inline-flex', justifyContent:'space-evenly'}}>
                
                
                    
                    <div style={{alignContent:'left'}}>
                    <div style={{ marginLeft:0,marginTop:0,justifyContent:'left'}}>
                      <p style={{paddingLeft:0,fontSize: '0.8em',fontWeight: 'bolder',color:'#707070', marginBottom:0}}>{cardName}</p>
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
            style={{height:'100%', justifyContent:'center', borderWidth:0}} key={cardName}
            variant = {'contained'}
            cardID={cardID}
            onClick = {() => {
                
                setCardClickedMedia(cardExternal)
                setCardClickedThumbnail(cardMedia)
                setCardClickedContent(cardName)
                props.actionsChanger(clickedCardActions)
                setCardClickedProperties(cardPropeties)
                setCardClickedDescription(cardDescription)
                
                
                
            }}
            
        >
        
        <Link to ={{pathname:`/card/${cardID}`}}>
        <CardMedia>
          {cardForSale ? <img style={{maxWidth:'100%'}} src={cardMedia}/>:<img style={{opacity: 0.1,maxWidth:'100%'}} src={cardMedia}/> }
        </CardMedia>
        
       
        
            </Link>
        </Card>
        </Tablet>
        <Mobile>
        <Card hoverable
            
             title={
              <div style={{maxHeight:10,maxWidth:'100%',display:'inline-flex', justifyContent:'space-evenly'}}>
                
                
                    
                    <div style={{alignContent:'left'}}>
                    <div style={{ marginLeft:0,marginTop:0,justifyContent:'left'}}>
                      <p style={{paddingLeft:0,fontSize: '0.8em',fontWeight: 'bolder',color:'#707070', marginBottom:0}}>{cardName}</p>
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
            style={{height:'100%', justifyContent:'center', borderWidth:0}} key={cardName}
            variant = {'contained'}
            cardID={cardID}
            onClick = {() => {
                
                setCardClickedMedia(cardExternal)
                setCardClickedThumbnail(cardMedia)
                setCardClickedContent(cardName)
                props.actionsChanger(clickedCardActions)
                setCardClickedProperties(cardPropeties)
                setCardClickedDescription(cardDescription)
                
                
                
            }}
            
        >
        
        <Link to ={{pathname:`/card/${cardID}`}}>
        <CardMedia>
          {cardForSale ? <img style={{maxWidth:'100%'}} src={cardMedia}/>:<img style={{opacity: 0.1,maxWidth:'100%'}} src={cardMedia}/> }
        </CardMedia>
        
        
        
            </Link>
        </Card>
        
        </Mobile>

        </div>
    )
}
export default GalleryCard;