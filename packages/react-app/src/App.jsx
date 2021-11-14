import React, { useCallback, useEffect, useState, useRef} from "react";
import { BrowserRouter as Router,Switch, Route, useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import {  JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { CSSTransition } from 'react-transition-group';
import './App.css'
import { useMediaQuery } from 'react-responsive';

import 'react-dropdown/style.css';
import useExitPrompt from './hooks/useExitPrompt.js'
import './index.css';
import Skills from "./partials/Skills";
import "aos/dist/aos.css";


import { Link } from 'react-router-dom';
import { useFullScreenHandle } from "react-full-screen";
import { makeStyles } from '@material-ui/core/styles';
import GalleryCard from './components/GalleryCard';
import { Row, Col,  Alert, Switch as SwitchD } from "antd";
import Web3Modal from "web3modal";
import ReactMediaPlayer from './components/ReactWebMediaPlayer'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import { useExchangePrice, useGasPrice, useUserProvider, useContractLoader, useContractReader, useEventListener, useBalance, useExternalContractLoader } from "./hooks";
import { Account, Faucet, Ramp,  Address } from "./components";
import { Transactor } from "./helpers";
import { formatEther, parseEther } from "@ethersproject/units";
import { utils } from "ethers";
import {  AboutUsPage} from "./views"
import { INFURA_ID, DAI_ADDRESS, DAI_ABI, NETWORK, NETWORKS } from "./constants";
import StackGrid from "react-stack-grid";
import assets from './assets.js'
import tree from './tree.json';
import Modal from './components/Modal';
import styled from "styled-components"
import { FaConnectdevelop, FaGlassMartini, FaGlassMartiniAlt, FaGripLines, FaGripLinesVertical } from "react-icons/fa";
import { FcAbout, FcGallery } from 'react-icons/fc'
import { GrGallery } from 'react-icons/gr'
const BOOTSTRAP_FOR_SKILL_ICON = "text-4xl mx-auto inline-block";
const { BufferList } = require('bl')

const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

console.log("📦 Assets: ",assets)




const targetNetwork = NETWORKS['rinkeby']; 


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


const Logo = styled.h1`
  font-size: 50px;
  color: white;
  
  
  align-items:center;
  position:fixed;
  margin:25px;
  justify-content:center;
  z-index:26;
  display:flex;
`;

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

//Media query to determine device screen size
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


function App(props) {
  //ref tag used to detect container click to close modal card view
  const ref = useRef();
  const location = useLocation()
  //background state defined in Link of GalleryCard Component to determine 
  //clickable background for Modal Card
  const background = location.state && location.state.background;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  
  
  const mainnetProvider = (scaffoldEthProvider && scaffoldEthProvider._network) ? scaffoldEthProvider : mainnetInfura
  if(DEBUG) console.log("🌎 mainnetProvider",mainnetProvider)

  const [injectedProvider, setInjectedProvider] = useState();
 
  //Get real time eth price
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
        

        

        
        
       
        
        
        <div style={{ position: "fixed", textAlign: "right", right: 0, top: '12vh', padding: 5, zIndex:25 }}>
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
        <div style={{width:'100%'}}>
        <Logo>100mountains-eth</Logo>
        <NavBar>
        
        <BigDesktop>
          
        <NavItem icon1={<FaGlassMartiniAlt />} icon2={<FaGlassMartini/>}>
            <DropdownMenu setRoute={setRoute}
            >
              
            </DropdownMenu>
          </NavItem>
         
          
          
        </BigDesktop>
        <Desktop>
        
        <NavItem icon1={<FaGlassMartiniAlt />} icon2={<FaGlassMartini/>}>
            <DropdownMenu setRoute={setRoute}
            >
              
            </DropdownMenu>
          </NavItem>
            
        </Desktop>
        <Mobile>
          
        
        <NavItem icon1={<FaGlassMartiniAlt/>} icon2={<FaGlassMartini/>}>
            <DropdownMenu setRoute={setRoute}
            >
              
            </DropdownMenu>
          </NavItem>
            
          
        </Mobile>
        <Tablet>
        
        <NavItem icon1={<FaGlassMartiniAlt />} icon2={<FaGlassMartini/>}>
            <DropdownMenu setRoute={setRoute}
            >
              
            </DropdownMenu>
          </NavItem>
            
        </Tablet>
        </NavBar>
        </div>
          <Switch location={background || location}>
            <Route exact path="/">
           
              <Desktop>
               
                
                  
                
                <div style={{ justifyContent: 'space-around',maxWidth:'100%',  paddingTop:'18vh' }}>
                  <StackGrid
                      columnWidth={'20%'}
                      gutterWidth={0}
                      spacing={1}
                      
                  >
                    {galleryList}
                  </StackGrid>
                </div>
               
             
              </Desktop>
              <BigDesktop>
             
                  
                
                <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", paddingTop:'18vh' }}>
                  <StackGrid
                      columnWidth={'10%'}
                      gutterWidth={0}
                      spacing={1}
                      
                  >
                    {galleryList}
                  </StackGrid>
                </div>
                
                
              </BigDesktop>
              <Tablet>
              
             
                  
                  
                  <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 10, paddingTop:'18vh'}}>
                      <StackGrid
                          columnWidth={'50%'}
            
                      >
                        {galleryList}
                      </StackGrid>
                    </div>
                    
                   
              </Tablet>
              <Mobile>
              
                  
             
              <div style={{ justifyContent: 'space-around',maxWidth:'80%', margin: "auto", padding:10,paddingTop:'18vh'}}>
                  <StackGrid
                      columnWidth={'100%'}
        
                  >
                    {galleryList}
                  </StackGrid>
                </div>
                
                
              </Mobile>
            </Route>
            
            <Route path="/yourcollectibles">
            <Mobile>
              <div id="outer-container">
                  
              <div id="page-wrap">
              
              <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 25 }}>
                <AboutUsPage />
                </div>
                </div>
                </div>
              </Mobile>
              <Desktop>
              <div id="outer-container">
                  
              <div id="page-wrap">
              
              <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 25}}>
                <AboutUsPage />
                </div>
                </div>
                </div>
              </Desktop>
              <BigDesktop>
              <div id="outer-container">
                  
              <div id="page-wrap">
              
              <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 25}}>
                <AboutUsPage />
                </div>
                </div>
                </div>
              </BigDesktop>
              <Tablet>
              <div id="outer-container">
                  
              <div id="page-wrap">
              
              <div style={{ justifyContent: 'space-around',maxWidth:'100%', margin: "auto", padding: 25}}>
                <AboutUsPage />
                </div>
                </div>
                </div>
              </Tablet>
              
            </Route>
           
             </Switch>
             
            { isMenuOpen && (
            background && <Route path = "/:cardID" children={<Modal history={"/"} ref = {ref} isMenuOpen= {isMenuOpen} clickedCardActions= {clickedCardActions} forSale ={location.state.forSale}/>}/>)}
            
            
           
           
         
        
          
        
          
        
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
function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {open ? props.icon2: props.icon1}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu(props) {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const [routeChanger,setRouteChanger] = useState();


  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    setRouteChanger(props.setRoute)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="/" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button" >{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight +30 }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
        <Link style={{color:'black'}}  onClick={()=> {props.setRoute("/")}} to="/">
          <DropdownItem leftIcon={<FcGallery/>}>
              <div style={{color:'black'}}>
                Gallery
              </div>
          </DropdownItem>
          </Link>
          <Link style={{color:'black'}}  onClick={()=> {props.setRoute("/yourcollectibles")}} to="/yourcollectibles">
          <DropdownItem
          leftIcon={<FcAbout/>}>
            <div style={{color:'black'}}>
            About
            </div>
          </DropdownItem>
          </Link>
        </div>
      </CSSTransition>
      

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