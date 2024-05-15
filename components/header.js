import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import logo from "../logo.png";



const StyledHeader = styled.header`
position: relative;


  box-sizing: border-box;
  background-color: #0B4984;
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    
    .nav-logo-link {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-size: 24px;
      color: #ffffff;
      font-weight: bold;
      text-shadow: 2px 2px 4px #000000;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }


  img {
    width: 80px;
    height: 80px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    .menuToggleBtn {
      position: absolute;
      top: 37px; 
      right: 20px;
      display: block;
    }
  }
`;

const NavManu = styled.ul`
  list-style: none;
  display: flex;
  

  li {
    &:hover {
      cursor: pointer;
      background: #2A80CB;
      border-radius: 4px;
      text-shadow: 2px 2px 4px #000000;
      font-weight: bold;
    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px 10px;
    text-shadow: 2px 2px 4px #000000;
    font-weight: bold;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.$isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
    text-shadow: 2px 2px 4px #000000;
    font-weight: bold;
  }
`;

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };
  return (
    <>
      <StyledHeader>
        <div className="nav_logo">
        <Link to="/" className="nav-logo-link">
          <img src={logo} alt="logo" /> 
          TheWheelHouse
        </Link>
        </div>

        <NavManu $isToggleOpen={isToggleOpen}>
          <li>
            <Link to="/search" className="nav-menu-list">
              Vehicles
            </Link>
          </li>
          <li>
            <Link  to="/contactUs" className="nav-menu-list">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/FAQ" className="nav-menu-list">
              FAQ
            </Link>
          </li>
        </NavManu >
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  );
};

export default Header;
