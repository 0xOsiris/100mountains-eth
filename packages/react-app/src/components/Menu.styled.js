import styled from 'styled-components';

export const StyledMenu = styled.nav`
  
  
  justify-content: center;
  
  height: 80px;
  text-align: left;
  width: 100vw;
  margin-right:10rem;
  spacing: 10rem;
  marginTop: 0;
  position: fixed;
 
  
  transition: transform 0.3s ease-in-out;
  z-index:20;
  border: 1px solid black;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
  a {
    z-index:20;
    font-size: 2rem;
    text-transform: uppercase;
    padding: 10rem 20;
    font-weight: bold;
    letter-spacing: 0.5rem;
    
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;