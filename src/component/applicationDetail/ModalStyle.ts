import styled from 'styled-components';

export const ModalContainer = styled.div`
  margin-left: 1200px;
  position: absolute;
  transform: translate(-50%, -90%);
  width: 400px;
  height: 370px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 20px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  border: 1px solid #dbdbdf;
  overflow-y: auto;
`;
export const ModalContainer2 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -90%);
  width: 400px;
  height: 430px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 20px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  border: 1px solid #dbdbdf;
  overflow-y: auto;
`;
export const ModalContainer3 = styled.div`
  margin-left: 1200px;
  position: absolute;
  transform: translate(-50%, -90%);
  width: 400px;
  height: 270px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 20px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  border: 1px solid #dbdbdf;
  overflow-y: auto;
`;
export const ModalContainer5 = styled.div`
  margin-left: 1200px;
  position: absolute;
  transform: translate(-52%, 60%);
  width: 1160px;
  height: 340px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 20px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  border: 1px solid #dbdbdf;
  overflow-y: auto;
  display: flex;
  align-items: center;
`;
export const ModalContent = styled.div`
  float: left;
`;
export const ButtonWrapper = styled.div`
  margin-left: 70px;
`;
export const SpecialWrapper = styled.div`
  margin-left: 130px;
  margin-top: 20px;
`;
export const Title = styled.div`
  color: #222;
  font-size: 21.5px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
  letter-spacing: -1.2px;
  margin-left: 40px;
  margin-top: 80px;
`;
export const Border = styled.div`
  stroke-width: 2px;
  width: 310px;
  flex-shrink: 0;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 11px;
  margin-bottom: 11px;
  margin-left: 40px;
`;
export const BasicLabel = styled.div`
  color: #222;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
  margin-left: 40px;
  letter-spacing: -1.2px;
`;

export const BasicInput = styled.textarea`
  width: 300px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1px solid #dbdbdf;
  background: #fff;
  padding-left: 0.6rem;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: 'GmarketSansMedium';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 300;
  line-height: 30px;
  margin-top: 10px;
  margin-left: 40px;
`;
export const BasicInput2 = styled.input`
  width: 300px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1px solid #dbdbdf;
  background: #fff;
  padding-left: 0.6rem;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: 'GmarketSansMedium';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 300;
  line-height: 30px;
  margin-bottom: 30px;
  margin-left: 40px;
`;
export const BasicButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 130px;
  height: 48px;
  margin-right: 5px;
  margin-top: 10px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background: #428aff;
  color: rgba(255, 255, 255, 0.8);
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: -2px;
  cursor: pointer;

  &:hover {
    background-color: #0461e5;
  }

  &:disabled {
    border: 1px solid #a6c8ff;
    background: #8fbaff;
    cursor: not-allowed;
  }

  &:disabled:hover {
    background-color: #8fbaff;
  }
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff; // 이 부분을 확인해보세요
  display: flex;
  z-index: 100;
`;
