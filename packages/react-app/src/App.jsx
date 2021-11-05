import React, { useContext,useCallback, useEffect, useState, useRef} from "react";
import { BrowserRouter as Router,Switch, Route, Link, useHistory, useLocation } from "react-router-dom";
import { slide as MenuMobile } from 'react-burger-menu'
import "antd/dist/antd.css";
import {  JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import {  LinkOutlined } from "@ant-design/icons";
import "./App.css";
import "./styles/styles.css";

import CustomCard from "./partials/Card" ;
import { useMediaQuery } from 'react-responsive';
import 'bootstrap/dist/css/bootstrap.min.css';
import MobileMenu from "./components/MobileMenu";
import 'react-dropdown/style.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import useExitPrompt from './hooks/useExitPrompt.js'
import ReactDOM from "react-dom";
import "./index.css";
import {  DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import AOS from "aos";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Skills from "./partials/Skills";
import "aos/dist/aos.css";
import './assets/main.css';
import StyledNav from "./components/StyledNav";
import ReactWebMediaPlayer from 'react-web-media-player';
import Collapsible from 'react-collapsible'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {AnimatedSharedLayout, motion} from 'framer-motion';
import { VideoPlayer } from "./components";
import {StyledMenu} from "./components/Menu.styled";
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createBrowserHistory } from 'history';
import {Box} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GalleryCard from './components/GalleryCard';
import { Row, Col, Menu, Alert, Input, List, Card, Switch as SwitchD } from "antd";
import { CardHeader, Grid, Image } from 'semantic-ui-react'
import Web3Modal from "web3modal";
import ReactMediaPlayer from './components/ReactWebMediaPlayer'
import  CustomCardFull  from "./components/CustomCardFull";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import { useExchangePrice, useGasPrice, useUserProvider, useContractLoader, useContractReader, useEventListener, useBalance, useExternalContractLoader } from "./hooks";
import { Header, Account, Faucet, Ramp, Contract, GasGauge, Address, AddressInput, ThemeSwitch} from "./components";
import { Transactor } from "./helpers";
import { formatEther, parseEther } from "@ethersproject/units";
import { utils } from "ethers";
import  HeartButton  from "./components/HeartButton"
import { FaPalette, FaReact, FaCode, FaConnectdevelop, FaGripLines, FaDiceD6, FaEthereum, FaHamburger} from "react-icons/fa";
import { Provider } from 'react-redux';
import MediaQuery from 'react-responsive'
import { Directions, ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
//import Hints from "./Hints";
import { Hints, ExampleUI, Subgraph, AboutUsPage} from "./views"
import { useThemeSwitcher } from "react-css-theme-switcher";
import { INFURA_ID, DAI_ADDRESS, DAI_ABI, NETWORK, NETWORKS } from "./constants";
import StackGrid from "react-stack-grid";
import ReactJson from 'react-json-view'
import assets from './assets.js'
import tree from './tree.json';
import Modal from './components/Modal';
import styled from "styled-components"
import { ButtonBase } from "@material-ui/core";
import Table from "rc-table/lib/Table";
const BOOTSTRAP_FOR_SKILL_ICON = "text-4xl mx-auto inline-block";
const { BufferList } = require('bl')

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

console.log("📦 Assets: ",assets)




const targetNetwork = NETWORKS['localhost']; 


const DEBUG = true

const STARTING_JSON = {
  description: "I love da mountains",
  external_url: "https://ipfs.io/ipfs/QmXL7LKaz6DGk82DvkmCAYJkuNoDwLQUd3BHDwCs5h73Yx?filename=mountain1.mp4", 
  image: "https://ipfs.io/ipfs/QmP2Gj4EXf8j1JEPyMBGozW122pPnWYusfMoriZDdigzLz?filename=Screenshot%20from%20IMG_1607.mp4.png",
  animation_url: "https://ipfs.io/ipfs/QmXL7LKaz6DGk82DvkmCAYJkuNoDwLQUd3BHDwCs5h73Yx?filename=mountain1.mp4",
  name: "Mountain1",
  attributes: [
    {
      trait_type: "BackgroundColor",
      value: "green",
    },
    {
      trait_type: "Rarity",
      value: "Dunno yet",
    },
  ],
};

//helper function to "Get" from IPFS
// you usually go content.toString() after this...
const getFromIPFS = async hashToGet => {
  for await (const file of ipfs.get(hashToGet)) {
    console.log(file.path)
    if (!file.content) continue;
    const content = new BufferList()
    for await (const chunk of file.content) {
      content.append(chunk)
    }
    console.log(content)
    return content
  }
}


if(DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

const scaffoldEthProvider = new JsonRpcProvider("https://rpc.scaffoldeth.io:48544")
const mainnetInfura = new JsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID)


const localProviderUrl = targetNetwork.rpcUrl;

const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if(DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new JsonRpcProvider(localProviderUrlFromEnv);



const blockExplorer = targetNetwork.blockExplorer;



const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#a80a0a",
    hover: "#ad1457"
  }
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));
const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: black;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 2;
  text-transform: uppercase;
  margin: 10px 10px;
  cursor: pointer;
  box-shadow: 0px 2px 2px black;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "pink"
};
const BigDesktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1501 })
  return isDesktop ? children : null
}

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992, maxWidth:1500 })
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

function App(props) {
  
  

  const ref = useRef();
  const location = useLocation()
  const background = location.state && location.state.background;
  const iMenuOpen = location.state && location.state.iMenuOpen;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [value,setValue]=useState('');

  const handleSelect=(e)=>{

    console.log(e);

    setValue(e)

  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowExitPrompt(!showExitPrompt)
  }

  

  
  const classes = useStyles();
  const mainnetProvider = (scaffoldEthProvider && scaffoldEthProvider._network) ? scaffoldEthProvider : mainnetInfura
  if(DEBUG) console.log("🌎 mainnetProvider",mainnetProvider)

  const [injectedProvider, setInjectedProvider] = useState();
 
  const price = useExchangePrice(targetNetwork,mainnetProvider);


  const gasPrice = useGasPrice(targetNetwork,"fast");
 
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);
  if(DEBUG) console.log("👩‍💼 selected address:",address)

 
  let localChainId = localProvider && localProvider._network && localProvider._network.chainId
  if(DEBUG) console.log("🏠 localChainId",localChainId)

  let selectedChainId = userProvider && userProvider._network && userProvider._network.chainId
  if(DEBUG) console.log("🕵🏻‍♂️ selectedChainId:",selectedChainId)

  const tx = Transactor(userProvider, gasPrice)

 
  const faucetTx = Transactor(localProvider, gasPrice)

 
  const yourLocalBalance = useBalance(localProvider, address);
  if(DEBUG) console.log("💵 yourLocalBalance",yourLocalBalance?formatEther(yourLocalBalance):"...")

  
  const yourMainnetBalance = useBalance(mainnetProvider, address);
  if(DEBUG) console.log("💵 yourMainnetBalance",yourMainnetBalance?formatEther(yourMainnetBalance):"...")

  
  const readContracts = useContractLoader(localProvider)
  if(DEBUG) console.log("📝 readContracts",readContracts)

 
  const writeContracts = useContractLoader(userProvider)
  if(DEBUG) console.log("🔐 writeContracts",writeContracts)

  
  const mainnetDAIContract = useExternalContractLoader(mainnetProvider, DAI_ADDRESS, DAI_ABI)
  console.log("🌍 DAI contract on mainnet:",mainnetDAIContract)
  
  const myMainnetDAIBalance = useContractReader({DAI: mainnetDAIContract},"DAI", "balanceOf",["0x34aA3F359A9D614239015126635CE7732c18fDF3"])
  console.log("🥇 myMainnetDAIBalance:",myMainnetDAIBalance)


 
  const balance = useContractReader(readContracts,"YourCollectible", "balanceOf", [ address ])
  console.log("🤗 balance:",balance)

 
  const transferEvents = useEventListener(readContracts, "YourCollectible", "Transfer", localProvider, 1);
  console.log("📟 Transfer events:",transferEvents)



  
  const yourBalance = balance && balance.toNumber && balance.toNumber()
  
  const Properties = ({ data }) => {
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


  useEffect(()=>{
    const updateYourCollectibles = async () => {
      let collectibleUpdate = []
      for(let tokenIndex=0;tokenIndex<balance;tokenIndex++){
        try{
          console.log("GEtting token index",tokenIndex)
          const tokenId = await readContracts.YourCollectible.tokenOfOwnerByIndex(address, tokenIndex)
          console.log("tokenId",tokenId)
          const tokenURI = await readContracts.YourCollectible.tokenURI(tokenId)
          console.log("tokenURI",tokenURI)

          const ipfsHash =  tokenURI.replace("https://ipfs.io/ipfs/","")
          console.log("ipfsHash",ipfsHash)

          const jsonManifestBuffer = await getFromIPFS(ipfsHash)

          try{
            const jsonManifest = JSON.parse(jsonManifestBuffer.toString())
            console.log("jsonManifest",jsonManifest)
            collectibleUpdate.push({ id:tokenId, uri:tokenURI, owner: address, ...jsonManifest })
          }catch(e){console.log(e)}

        }catch(e){console.log(e)}
      }
      setYourCollectibles(collectibleUpdate)
    }
    updateYourCollectibles()
  },[ address, yourBalance ])



  let networkDisplay = ""
  if(localChainId && selectedChainId && localChainId != selectedChainId ){
    networkDisplay = (
        <div style={{zIndex:2, position:'absolute', right:0,top:60,padding:16}}>
          <Alert
              message={"⚠️ Wrong Network"}
              description={(
                  <div>
                    You have <b>{NETWORK(selectedChainId).name}</b> selected and you need to be on <b>{NETWORK(localChainId).name}</b>.
                  </div>
              )}
              type="error"
              closable={false}
          />
        </div>
    )
  }else{
    networkDisplay = (
        <div style={{zIndex:-1, position:'absolute', right:154,top:28,padding:16,color:targetNetwork.color}}>
          {targetNetwork.name}
        </div>
    )
  }

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute]);

  let faucetHint = ""
  const faucetAvailable = localProvider && localProvider.connection && localProvider.connection.url && localProvider.connection.url.indexOf(window.location.hostname)>=0 && !process.env.REACT_APP_PROVIDER && price > 1;

  const [ faucetClicked, setFaucetClicked ] = useState( false );
  if(!faucetClicked&&localProvider&&localProvider._network&&localProvider._network.chainId==31337&&yourLocalBalance&&formatEther(yourLocalBalance)<=0){
    faucetHint = (
        <div style={{padding:16}}>
          <Button type={"primary"} onClick={()=>{
            faucetTx({
              to: address,
              value: parseEther("0.01"),
            });
            setFaucetClicked(true)
          }}>
            💰 Grab funds from the faucet ⛽️
          </Button>
        </div>
    )
  }

  
  const [ yourJSON, setYourJSON ] = useState( STARTING_JSON );
  const [ sending, setSending ] = useState()
  const [ ipfsHash, setIpfsHash ] = useState()
  const [ ipfsDownHash, setIpfsDownHash ] = useState()
  const [ downloading, setDownloading ] = useState()
  const [ ipfsContent, setIpfsContent ] = useState()
  const [ transferToAddresses, setTransferToAddresses ] = useState({})
  const handle = useFullScreenHandle();
  const [ loadedAssets, setLoadedAssets ] = useState()
  const options = [
    'one', 'two', 'three'
  ];

  const [ yourCollectibles, setYourCollectibles ] = useState()
  const [ clickedCardMedia, setCardClickedMedia ] = useState()
  const [ clickedCardThumbnail, setCardClickedThumbnail ] = useState()
  const [ clickedCardContent, setCardClickedContent ] = useState()
  const [ clickedCardActions, setCardClickedActions ] = useState()
  const [ clickedCardProperties, setCardClickedProperties ] = useState()
  const [ clickedCardDescription, setCardClickedDescription ] = useState()
  const [ reactJSMediaPlayer, setReactJSMediaPlayer ] = useState()
  const [ customCardView, setCustomCardView ] = useState()
  const [ cardClicked, setCardClicked ] = useState()
  const [ cardID, setCardID ] = useState();
  const [ cardForSale, setCardForSale ] = useState(true);

  function getURLMedia(clickedCardMedia, clickedCardThumbnail) {
    const url = clickedCardMedia;
    const thumbnail = clickedCardThumbnail;
    return([url, thumbnail]);
  }
  const defaultOption = options[0];
  const arrowClosed = (
    <span className="arrow-closed" />
  )
  const arrowOpen = (
    <span className="arrow-open" />
  )

  useEffect(()=>{
    const updateYourCollectibles = async () => {
      let assetUpdate = []
      for(let a in assets){
        try{
          const forSale = await readContracts.YourCollectible.forSale(utils.id(a))
          let owner
          if(!forSale){
            const tokenId = await readContracts.YourCollectible.uriToTokenId(utils.id(a))
            owner = await readContracts.YourCollectible.ownerOf(tokenId)
          }
          assetUpdate.push({id:a,...assets[a],forSale:forSale,owner:owner})
          
        }catch(e){console.log(e)}
      }
      setLoadedAssets(assetUpdate)
      
    }
    if(readContracts && readContracts.YourCollectible) updateYourCollectibles()
  }, [ assets, readContracts, transferEvents]);


  useEffect(()=>{
    const updateMediaPlayer = async () => {
      let ReactJSMediaPlayer = <ReactMediaPlayer url={clickedCardMedia} thumbnail={clickedCardThumbnail} style={{ marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' }}/>
      setReactJSMediaPlayer(ReactJSMediaPlayer)
    }
    updateMediaPlayer()
  }, [ clickedCardMedia, clickedCardThumbnail ]);



  
  let galleryList = []

  for(let a in loadedAssets){
    console.log("loadedAssets",a,loadedAssets[a])

    let cardActions = []
    cardActions.push(
      <div>
        <Button onClick={() => {
          setIsMenuOpen(false)
        }}>
          Close
        </Button>
      </div>
      
      
  )
    if(loadedAssets[a].forSale){
      const { claims } = tree;
      let target = {};
      
      for (const artID in claims) {
        if (artID === loadedAssets[a].id) {
          target = claims[artID];
        }
      }

      console.log("proof", target.proof);

      cardActions.push(
          <div>
            <Button onClick={() => {
              console.log("gasPrice,", gasPrice)
              console.log("curProof", target.proof);

              // console.log("converted", utils.formatBytes32String(target.proof[0]))
              tx(writeContracts.MerkleTreeContract.claim(target.index, loadedAssets[a].id, target.proof), { gasPrice: gasPrice})
            }}>
              Buy Item
            </Button>
          </div>
          
          
      )
    }else{
      cardActions.push(
          <div>
            owned by: <Address
              address={loadedAssets[a].owner}
              ensProvider={mainnetProvider}
              blockExplorer={blockExplorer}
              minimized={true}
          />
          </div>
      )
    }
    

    
    galleryList.push(
      
        <GalleryCard hoverable
              actions={cardActions}
              stateChanger= {setIsMenuOpen}               
              forSale={loadedAssets[a].forSale}
              cardMedia={loadedAssets[a].image}
              cardID={loadedAssets[a].id}
              cardName={loadedAssets[a].name}
              cardExternal ={loadedAssets[a.external_url]}
              cardProperties = {loadedAssets[a].attributes}
              cardDescription = {loadedAssets[a].description}
              actionsChanger ={setCardClickedActions}
              
        >
          
 
        </GalleryCard>
        
        
    )
  }

  
  
  return (
    
      <div className="App"  >
        

        <div style={{marginTop:0,height:100, background:'#1c2022',zIndex:20}} ref ={ref}>

        
        
       
        
        
     
       
        <BigDesktop>
          

            <StyledNav setRoute={setRoute}/>
          
        </BigDesktop>
        <Desktop>
          <StyledNav setRoute={setRoute}/>
        </Desktop>
        <Mobile>
          
        <StyledNav setRoute={setRoute}/>
          
        </Mobile>
        <Tablet>
        <StyledNav setRoute={setRoute}/>
        </Tablet>
        
          <Switch location={background || location}>
            <Route exact path="/">
           
              <Desktop>
               
                <div id="outer-container">
                  
                <div id="page-wrap">
                <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 50, marginTop:250, paddingBottom:256 }}>
                  <StackGrid
                      columnWidth={'20%'}
                      gutterWidth={0}
                      spacing={1}
                      variant={'container'}
                  >
                    {galleryList}
                  </StackGrid>
                </div>
                </div>
                </div>
              </Desktop>
              <BigDesktop>
              <div id="outer-container">
                  
                <div id="page-wrap">
                <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 50, marginTop:250, paddingBottom:256 }}>
                  <StackGrid
                      columnWidth={'10%'}
                      gutterWidth={0}
                      spacing={1}
                      variant={'container'}
                  >
                    {galleryList}
                  </StackGrid>
                </div>
                </div>
                </div>
              </BigDesktop>
              <Tablet>
              
              <div id="outer-container">
                  
                  <div id="page-wrap">
                  <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 25, marginTop:200, paddingBottom:256 }}>
                      <StackGrid
                          columnWidth={'50%'}
            
                      >
                        {galleryList}
                      </StackGrid>
                    </div>
                    </div>
                    </div>
              </Tablet>
              <Mobile>
              <div id="outer-container">
                  
              <div id="page-wrap">
              <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 25, marginTop:200, paddingBottom:256 }}>
                  <StackGrid
                      columnWidth={'100%'}
        
                  >
                    {galleryList}
                  </StackGrid>
                </div>
                </div>
                </div>
              </Mobile>
            </Route>
            
            <Route path="/yourcollectibles">
            <Mobile>
              <div id="outer-container">
                  
              <div id="page-wrap">
              
              <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 25, marginTop:100, paddingBottom:256 }}>
                <AboutUsPage />
                </div>
                </div>
                </div>
              </Mobile>
              <Desktop>
              <div id="outer-container">
                  
              <div id="page-wrap">
              
              <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 25, marginTop:100, paddingBottom:256 }}>
                <AboutUsPage />
                </div>
                </div>
                </div>
              </Desktop>
              <BigDesktop>
              <div id="outer-container">
                  
              <div id="page-wrap">
              
              <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 25, marginTop:100, paddingBottom:256 }}>
                <AboutUsPage />
                </div>
                </div>
                </div>
              </BigDesktop>
              <Tablet>
              <div id="outer-container">
                  
              <div id="page-wrap">
              
              <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 25, marginTop:100, paddingBottom:256 }}>
                <AboutUsPage />
                </div>
                </div>
                </div>
              </Tablet>
              
            </Route>
           
             </Switch>
             
            {isMenuOpen && (
            background && <Route path = "/:cardID" children={<Modal history={"/"} ref = {ref} isMenuOpen= {isMenuOpen} clickedCardActions= {clickedCardActions} forSale ={location.state.forSale}/>}/>)}
            {/*
            <div>
            
              {<CustomCardFull clickedCardContent={clickedCardContent} properties={clickedCardProperties} clickedCardActions={clickedCardActions} reactJSMediaPlayer={reactJSMediaPlayer}/>}
              </div>
              */}
              {/*
              <div class="container-fluid" style={{justifyContent:'center' }}>
                <div class="row" style={{marginTop:300, display:'flex', justifyContent:'center'}}>
                    
                    <StackGrid 
                                style={{height:'100%',width:450, borderWidth:10, borderColor:'#F5F5F5',justifyContent:'center'}}
                                columnWidth={440}
                                gutterWidth={0}
                                
                                variant = {'container'}
                            >
                        <div>

                        <Card 
                              style={{height:'100%',width: 420,  borderWidth:0, borderColor:'#F5F5F5', justifyContent:'center'}}
                              variant = {'contained'}
                              
                              title={(
                                  clickedCardContent
                              )}
                          >
                          
                                <CardMedia style={{height:'100%',width: 420}}>
                                  {reactJSMediaPlayer}
                                </CardMedia>
                  
                        </Card>
                        </div>
                        <div>

                        <Card                           
                            style={{width:420, borderWidth:0,marginBlockEnd:20,borderColor:'#F5F5F5'}}
                            
                          >                  
                          <Accordion className="accordion">
                            <AccordionSummary  expandIcon={<ExpandMore />}>
                              <ul style={{display:'inline-flex', padding:3}}>
                                <li style={{justifyContent:'left'}}>
                                  <h2><FaGripLines /></h2>
                                  
                                </li>
                                <li>   </li>
                                <li style={{justifyContent:'right'}}>
                                  
                                  <h2>   Description</h2>
                                </li>
                              </ul>
                              
                            </AccordionSummary>

                            <AccordionDetails>
                              {clickedCardContent}
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
                                  
                                  <h2>   Properties</h2>
                                </li>
                              </ul>
                            </AccordionSummary>
                          <AccordionDetails> 
                              <div>
                                <Properties data={clickedCardProperties}/>
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
                        
                        actions= {clickedCardActions}
                        >
                        <CardContent>
                          <li style={{alignContent:'left'}}>
                            <h1>Current Price</h1>
                            <p>0.5 Eth</p>
                          </li>
                        </CardContent>
                        
                        
                      </Card>
                   
                  
                  </div>
                </div>
                              */}
         
           
         
        
          
        </div>
          
        
       
        <div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 10 }}>
          <Account
              address={address}
              localProvider={localProvider}
              userProvider={userProvider}
              mainnetProvider={mainnetProvider}
              price={price}
              web3Modal={web3Modal}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
              blockExplorer={blockExplorer}
          />
          {faucetHint}
        </div>

       
        <div style={{ position: "fixed", textAlign: "left", left: 0, bottom: 20, padding: 10 }}>
          <Row align="middle" gutter={[4, 4]}>
            <Col span={8}>
              <Ramp price={price} address={address} networks={NETWORKS}/>
            </Col>

            
           
          </Row>

          <Row align="middle" gutter={[4, 4]}>
            <Col span={24}>
              {
                /*  if the local provider has a signer, let's show the faucet:  */
                faucetAvailable ? (
                    <Faucet localProvider={localProvider} price={price} ensProvider={mainnetProvider}/>
                ) : (
                    ""
                )
              }
            </Col>
          </Row>
        </div>
        
      </div>
  );
}


/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

window.ethereum && window.ethereum.on('chainChanged', chainId => {
  setTimeout(() => {
    window.location.reload();
  }, 1);
})

export default App;