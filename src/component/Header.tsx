import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import logo from '../assets/LEND2U.svg';
const Header = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <HeaderWrapper>
      <HeaderUl>
        <HeaderLeft>
          <li>
            <NavLink to='/' onClick={scrollToTop}>
              <StyledImg src={logo} />
            </NavLink>
          </li>
        </HeaderLeft>
        <HeaderLink>
          <ScrollLink to='service-intro' smooth={true} duration={500}>
            <ScrollIndex>서비스 소개</ScrollIndex>
          </ScrollLink>
          <ScrollLink to='device-specs' smooth={true} duration={500}>
            <ScrollIndex>기기 스펙 조회</ScrollIndex>
          </ScrollLink>
        </HeaderLink>
      </HeaderUl>
    </HeaderWrapper>
  );
};

export default Header;

const StyledImg = styled.img`
  width: 218.2px;
  height: 48px;
`;

const HeaderWrapper = styled.div`
  a:link,
  a:visited,
  a:hover {
    text-decoration: none;
    color: black;
  }
  width: 100%;
  height: 5rem;
  display: flex;
  border-bottom: 1px solid #dbdbdf;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #ffffff;
  z-index: 1000;
  position: fixed;
  top: 0;
`;

const HeaderUl = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: 27.44rem;
  li:first-child {
    margin-right: 3rem;
  }
`;

const HeaderLink = styled.div`
  display: flex;
  align-items: center;
  li:first-child {
    margin-right: 3.24rem;
  }
`;

const ScrollIndex = styled.div`
  margin-left: 5.24rem;
  display: flex;
  align-items: center;
  button:first-child {
    margin-right: 1.57rem;
  }
  img {
    margin-right: 1.57rem;
  }
`;

const BorderLine = styled.hr`
  stroke-width: 2px;
  width: 1200px;
  color: #fff;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 10px;
`;
