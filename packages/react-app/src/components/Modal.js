import React, {useState, useEffect,useRef} from "react";
import { useHistory, useParams } from "react-router-dom";
import "../styles/styles.css"
import CustomCardFull from "./CustomCardFull";
import ModalCard from "./ModalCard";
const Modal = (props) => {
  const history = useHistory()
  const { cardID } = useParams()
  const forSale = props.forSale;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ clickedCardActions, setClickedCardActions ] = useState()
  const ref = useRef();
  const closeModal = e => {
    
    history.push(props.history)
  };
  useEffect(()=>{
    const updateActions = async () => {
      let cardActions = props.clickedCardActions
      
        setClickedCardActions(cardActions)
      
      
    }
    updateActions()
  }, []);
  React.useEffect(()=>{
    const updateMenu = async () => {
      let menuOpen = props.isMenuOpen
      
        setIsMenuOpen(menuOpen)
      }
      
    
    updateMenu()
  }, []);

  React.useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
        closeModal();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 w-full h-full z-10 flex items-center justify-center">
      <div style={{zIndex:20}} ref={ref}>
        {isMenuOpen && 
      <ModalCard actions={clickedCardActions} cardID={cardID} forSale={forSale} />
        }
        </div>
    </div>
  );
};

export default Modal;
