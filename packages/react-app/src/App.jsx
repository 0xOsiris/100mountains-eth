import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import {  JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import {  LinkOutlined } from "@ant-design/icons";
import "./App.css";
import CustomCard from "./partials/Card" ;
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dropdown/style.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import ReactDOM from "react-dom";
import "./index.css";
import AOS from "aos";
import Skills from "./partials/Skills";
import "aos/dist/aos.css";
import './assets/main.css';
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
import {Box} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Row, Col, Menu, Alert, Input, List, Card, Switch as SwitchD } from "antd";
import { Grid, Image } from 'semantic-ui-react'
import Web3Modal from "web3modal";
import ReactMediaPlayer from './components/ReactWebMediaPlayer'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import { useExchangePrice, useGasPrice, useUserProvider, useContractLoader, useContractReader, useEventListener, useBalance, useExternalContractLoader } from "./hooks";
import { Header, Account, Faucet, Ramp, Contract, GasGauge, Address, AddressInput, ThemeSwitch} from "./components";
import { Transactor } from "./helpers";
import { formatEther, parseEther } from "@ethersproject/units";
import { utils } from "ethers";
import { FaPalette, FaReact, FaCode, FaConnectdevelop, FaGripLines, FaDiceD6} from "react-icons/fa";
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
import styled from "styled-components"
import { ButtonBase } from "@material-ui/core";
const BOOTSTRAP_FOR_SKILL_ICON = "text-4xl mx-auto inline-block";
const { BufferList } = require('bl')
// https://www.npmjs.com/package/ipfs-http-client
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

console.log("📦 Assets: ",assets)

/*
    Welcome to 🏗 scaffold-eth !
    Code:
    https://github.com/austintgriffith/scaffold-eth
    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram
    You should get your own Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)
    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/


/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS['localhost']; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true

const STARTING_JSON = {
  description: "I love da mountains",
  external_url: "https://ipfs.io/ipfs/QmXL7LKaz6DGk82DvkmCAYJkuNoDwLQUd3BHDwCs5h73Yx?filename=mountain1.mp4", // <-- this can link to a page for the specific file too
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

// 🛰 providers
if(DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
const scaffoldEthProvider = new JsonRpcProvider("https://rpc.scaffoldeth.io:48544")
const mainnetInfura = new JsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID)
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_I

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if(DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new JsonRpcProvider(localProviderUrlFromEnv);


// 🔭 block explorer URL
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


function App(props) {
  const [value,setValue]=useState('');

  const handleSelect=(e)=>{

    console.log(e);

    setValue(e)

  }
  const classes = useStyles();
  const mainnetProvider = (scaffoldEthProvider && scaffoldEthProvider._network) ? scaffoldEthProvider : mainnetInfura
  if(DEBUG) console.log("🌎 mainnetProvider",mainnetProvider)

  const [injectedProvider, setInjectedProvider] = useState();
  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangePrice(targetNetwork,mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork,"fast");
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);
  if(DEBUG) console.log("👩‍💼 selected address:",address)

  // You can warn the user if you would like them to be on a specific network
  let localChainId = localProvider && localProvider._network && localProvider._network.chainId
  if(DEBUG) console.log("🏠 localChainId",localChainId)

  let selectedChainId = userProvider && userProvider._network && userProvider._network.chainId
  if(DEBUG) console.log("🕵🏻‍♂️ selectedChainId:",selectedChainId)

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userProvider, gasPrice)

  // Faucet Tx can be used to send funds from the faucet
  const faucetTx = Transactor(localProvider, gasPrice)

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);
  if(DEBUG) console.log("💵 yourLocalBalance",yourLocalBalance?formatEther(yourLocalBalance):"...")

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);
  if(DEBUG) console.log("💵 yourMainnetBalance",yourMainnetBalance?formatEther(yourMainnetBalance):"...")

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider)
  if(DEBUG) console.log("📝 readContracts",readContracts)

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider)
  if(DEBUG) console.log("🔐 writeContracts",writeContracts)

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetDAIContract = useExternalContractLoader(mainnetProvider, DAI_ADDRESS, DAI_ABI)
  console.log("🌍 DAI contract on mainnet:",mainnetDAIContract)
  //
  // Then read your DAI balance like:
  const myMainnetDAIBalance = useContractReader({DAI: mainnetDAIContract},"DAI", "balanceOf",["0x34aA3F359A9D614239015126635CE7732c18fDF3"])
  console.log("🥇 myMainnetDAIBalance:",myMainnetDAIBalance)


  // keep track of a variable from the contract in the local React state:
  const balance = useContractReader(readContracts,"YourCollectible", "balanceOf", [ address ])
  console.log("🤗 balance:",balance)

  //📟 Listen for broadcast events
  const transferEvents = useEventListener(readContracts, "YourCollectible", "Transfer", localProvider, 1);
  console.log("📟 Transfer events:",transferEvents)



  //
  // 🧠 This effect will update yourCollectibles by polling when your balance changes
  //
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

  /*
  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
  console.log("🏷 Resolved austingriffith.eth as:",addressFromENS)
  */


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
  }, [ assets, readContracts, transferEvents ]);

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
        <Link to = {'/card-fullscreen'}>
        <Card hoverable
              onClick = {() => {
                
                setCardClickedMedia(loadedAssets[a].external_url)
                setCardClickedThumbnail(loadedAssets[a].image)
                setCardClickedContent(loadedAssets[a].name)
                setCardClickedActions(cardActions)
                setCardClickedProperties(loadedAssets[a].attributes)
                setCardClickedDescription(loadedAssets[a].description)
              }}
              style={{height:'100%',width:380, justifyContent:'center', borderWidth:10}} key={loadedAssets[a].name}
              variant = {'contained'}
             
              title={(
                  <div>
                    {loadedAssets[a].name} <a style={{cursor:"pointer",opacity:1,fontWeight:'bolder',fontSize:20}} href={loadedAssets[a].external_url} target="_blank"><LinkOutlined /></a>
                  </div>
              )}
              
        >
        
   
          <CardMedia>
            <img style={{maxWidth:300}} src={loadedAssets[a].image}/>
          </CardMedia>
          <div style={{opacity:0.77}}>
            {loadedAssets[a].description}
          </div>
          
        </Card>
        </Link>
    )
  }

  return (
      <div className="App">
        
        {/* ✏️ Edit the header and change the title to your project name */}
        <Header />
        {networkDisplay}

        <BrowserRouter>
        <StyledMenu>

          <Menu style={{ textAlign:"center" }} selectedKeys={[route]} mode="horizontal">
            <Menu.Item key="/">
              <Link onClick={()=>{setRoute("/")}} to="/">Gallery</Link>
            </Menu.Item>
            <Menu.Item key="/yourcollectibles">
              <Link onClick={()=>{setRoute("/yourcollectibles")}} to="/yourcollectibles">About</Link>
            </Menu.Item>
            <Menu.Item key="/transfers">
              <Link onClick={()=>{setRoute("/transfers")}} to="/transfers">Transfers</Link>
            </Menu.Item>
            <Menu.Item key="/ipfsup">
              <Link onClick={()=>{setRoute("/ipfsup")}} to="/ipfsup">IPFS Upload</Link>
            </Menu.Item>
            <Menu.Item key="/ipfsdown">
              <Link onClick={()=>{setRoute("/ipfsdown")}} to="/ipfsdown">IPFS Download</Link>
            </Menu.Item>
            <Menu.Item key="/debugcontracts">
              <Link onClick={()=>{setRoute("/debugcontracts")}} to="/debugcontracts">Debug Contracts</Link>
            </Menu.Item> 
          </Menu>
        </StyledMenu>
          <Switch>
            <Route exact path="/">
              {/*
                🎛 this scaffolding is full of commonly used components
                this <Contract/> component will automatically parse your ABI
                and give you a form to interact with it locally
            */}

              <div style={{ justifyContent: 'space-around',maxWidth:2000, margin: "auto", marginTop:250, paddingBottom:256 }}>
                <StackGrid
                    columnWidth={380}
                    gutterWidth={50}
                    gutterHeight={50}
                    spacing={25}
                >
                  {galleryList}
                </StackGrid>
              </div>

            </Route>
            
            <Route path="/yourcollectibles">
              <div style={{ justifyContent: 'space-around',maxWidth:2000, margin: "auto", marginTop:250, paddingBottom:256 }}>
                <AboutUsPage />
                </div>
            </Route>
            <Route exact path="/card-fullscreen">
              {/*
                🎛 this scaffolding is full of commonly used components
                this <Contract/> component will automatically parse your ABI
                and give you a form to interact with it locally
            */}
            
              
              
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
            
          </Route>
            <Route path="/transfers">
              <div style={{ width:600, margin: "auto", marginTop:32, paddingBottom:32 }}>
                <List
                    bordered
                    dataSource={transferEvents}
                    renderItem={(item) => {
                      return (
                          <List.Item key={item[0]+"_"+item[1]+"_"+item.blockNumber+"_"+item[2].toNumber()}>
                            <span style={{fontSize:16, marginRight:8}}>#{item[2].toNumber()}</span>
                            <Address
                                address={item[0]}
                                ensProvider={mainnetProvider}
                                fontSize={16}
                            />
                            <Address
                                address={item[1]}
                                ensProvider={mainnetProvider}
                                fontSize={16}
                            />
                          </List.Item>
                      )
                    }}
                />
              </div>
            </Route>

            <Route path="/ipfsup">
              <div style={{ paddingTop:32, width:740, margin:"auto", textAlign:"left" }}>
                <ReactJson
                    style={{ padding:8 }}
                    src={yourJSON}
                    theme={"pop"}
                    enableClipboard={false}
                    onEdit={(edit,a)=>{
                      setYourJSON(edit.updated_src)
                    }}
                    onAdd={(add,a)=>{
                      setYourJSON(add.updated_src)
                    }}
                    onDelete={(del,a)=>{
                      setYourJSON(del.updated_src)
                    }}
                />
              </div>

              <Button style={{margin:8}} loading={sending} size="large" shape="round" type="primary" onClick={async()=>{
                console.log("UPLOADING...",yourJSON)
                setSending(true)
                setIpfsHash()
                const result = await ipfs.add(JSON.stringify(yourJSON))//addToIPFS(JSON.stringify(yourJSON))
                if(result && result.path) {
                  setIpfsHash(result.path)
                }
                setSending(false)
                console.log("RESULT:",result)
              }}>Upload to IPFS</Button>

              <div  style={{padding:16,paddingBottom:150}}>
                {ipfsHash}
              </div>

            </Route>
            <Route path="/ipfsdown">
              <div style={{ paddingTop:32, width:740, margin:"auto" }}>
                <Input
                    value={ipfsDownHash}
                    placeHolder={"IPFS hash (like QmadqNw8zkdrrwdtPFK1pLi8PPxmkQ4pDJXY8ozHtz6tZq)"}
                    onChange={(e)=>{
                      setIpfsDownHash(e.target.value)
                    }}
                />
              </div>
              <Button style={{margin:8}} loading={sending} size="large" shape="round" type="primary" onClick={async()=>{
                console.log("DOWNLOADING...",ipfsDownHash)
                setDownloading(true)
                setIpfsContent()
                const result = await getFromIPFS(ipfsDownHash)//addToIPFS(JSON.stringify(yourJSON))
                if(result && result.toString) {
                  setIpfsContent(result.toString())
                }
                setDownloading(false)
              }}>Download from IPFS</Button>

              <pre  style={{padding:16, width:500, margin:"auto",paddingBottom:150}}>
                {ipfsContent}
              </pre>
            </Route>
            <Route path="/debugcontracts">
              <Contract
                  name="YourCollectible"
                  signer={userProvider.getSigner()}
                  provider={localProvider}
                  address={address}
                  blockExplorer={blockExplorer}
              />
              <Contract
                  name="MerkleTreeContract"
                  signer={userProvider.getSigner()}
                  provider={localProvider}
                  address={address}
                  blockExplorer={blockExplorer}
              />
            </Route>
          </Switch>
        </BrowserRouter>

        <ThemeSwitch />


        {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
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

        {/* 🗺 Extra UI like gas price, eth price, faucet, and support: */}
        <div style={{ position: "fixed", textAlign: "left", left: 0, bottom: 20, padding: 10 }}>
          <Row align="middle" gutter={[4, 4]}>
            <Col span={8}>
              <Ramp price={price} address={address} networks={NETWORKS}/>
            </Col>

            <Col span={8} style={{ textAlign: "center", opacity: 0.8 }}>
              <GasGauge gasPrice={gasPrice} />
            </Col>
            <Col span={8} style={{ textAlign: "center", opacity: 1 }}>
              <Button
                  onClick={() => {
                    window.open("https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA");
                  }}
                  size="large"
                  shape="round"
              >
               <span style={{ marginRight: 8 }} role="img" aria-label="support">
                 💬
               </span>
                Support
              </Button>
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