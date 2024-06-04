import styled, { keyframes } from 'styled-components';
import '../../App.css';

export const CardContainer = styled.div`
  padding: 10px;
  cursor: pointer;
  float: left;
  flex-direction: column;
  width: 480px;
  height: 200px;
  border-radius: 16px;
  border: 1px solid #dfdfdf;
  background: #fff;
  box-shadow: 0px 4px 30px 3px rgba(114, 48, 255, 0.15);
  margin-right: 30px;
  transition: height 0.3s ease;
`;

export const LogoImage = styled.img`
  border-radius: 10px;
  width: 174px;
  height: 126px;
  margin-top: 22px;
  margin-left: 17px;
`;

export const CardInfo = styled.div`
  float: right;
  margin-left: 20px;
  margin-top: 50px;
  h3 {
    width: 118px;
    height: 41px;
    margin-top: 31px;
    font-family: 'GmarketSansMedium';
    text-edge: cap;
    color: #222;
    font-size: 37.5px;
    font-style: normal;
    font-weight: 700;
    line-height: 28.8px; /* 72% */
    letter-spacing: -1.2px;
  }
`;

export const Details = styled.div`
  display: flex;
  justify-content: flex-end;
  vertical-align: middle;
  font-size: 14px;
  font-family: 'GmarketSansLight';
  line-height: auto;
  color: #000000;
  margin-left: 17px;
  margin-right: 13px;
  margin-bottom: 41px;
  margin-top: 17px;
  p {
    margin-right: 10px;
    margin-top: 4px;
  }
`;

export const UpWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Spec = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${keyframes`
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 1000px; /* Adjust the value as needed */
    }
  `} 0.5s ease forwards;
  /* Adjust animation duration and easing as needed */
  border-top: 1px solid #ccc;
  padding: 1rem;
`;
export const SpecWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const SpecTitle = styled.div`
  color: #222;
  width: 120px;
  font-family: 'GmarketSansMedium';
  font-size: 15px;
  font-style: normal;
  line-height: 21.6px;
  margin-top: 18px;
  margin-left: 20px;
  margin-bottom: 5px;
`;

export const SpecContent = styled.div`
  color: #4f4f4f;
  width: 400px;
  font-family: 'GmarketSansLight';
  font-size: 12px;
  font-style: normal;
  font-weight: 350;
  line-height: normal;
  margin-bottom: 5px;
  margin-top: 19px;
`;
