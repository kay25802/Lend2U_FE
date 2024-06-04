import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 1150px;
  height: 195px;
  padding: 1px 1px 1px 0px;
  display: flex;
  justify-content: flex-start;
  border-radius: 16px;
  border: 1px solid #dfdfdf;
  background: #fff;
  margin-top: 30px;
`;
export const AdminCardContainer = styled.div`
  width: 1140px;
  height: 235px;
  padding: 1px 1px 1px 0px;
  display: flex;
  justify-content: flex-start;
  border-radius: 16px;
  border: 1px solid #dfdfdf;
  background: #fff;
  margin-left: 382px;
  margin-top: 30px;
`;

export const UnderWrapper = styled.div`
  float: left;
  width: 180px;
  margin-left: auto;
  margin-top: 30px;
  margin-right: 10px;
`;
export const UpWrapper = styled.div`
  float: left;
  width: 910px;
  margin-left: 15px;
  margin-top: 27px;
`;
export const InsideWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
`;
export const Title = styled.div`
  float: left;
  display: flex;
`;
export const SubTitle = styled.div`
  margin-left: auto;
`;
export const BorderLine = styled.div`
  stroke-width: 2px;
  width: 890px;
  flex-shrink: 0;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 11px;
  margin-bottom: 11px;
  margin-left: 20px;
`;
export const StatusButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 170px;
  height: 54p x;
  margin-right: 5px;
  border: 0px solid #a6c8ff;
  border-radius: 15px;
  background: #83b2ff;
  color: #222;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: -1px;
  cursor: pointer;

  &:hover {
    background-color: #0461e5;
  }

  &:disabled {
    background: #e1e4fb;
    cursor: not-allowed;
  }
`;
export const RefuseButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 159px;
  height: 38px;
  margin-right: 5px;
  margin-bottom: 10px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background: #428aff;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 38px;
  letter-spacing: -1px;
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

export const DeleteButton = styled.button`
  font-family: 'GmarketSansBold';
  width: 130px;
  height: 43px;
  margin-right: 5px;
  margin-top: 7px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background-color: #0461e5;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  cursor: pointer;

  &:hover {
    background: #428aff;
  }

  &:disabled {
    border: 1px solid #a6c8ff;
    background: #aecdff;
    cursor: not-allowed;
  }
`;
export const UpdateButton = styled.button`
  font-family: 'GmarketSansBold';
  width: 130px;
  height: 43px;
  margin-right: 10px;
  margin-top: 7px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background-color: #0461e5;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  cursor: pointer;

  &:hover {
    background: #428aff;
  }

  &:disabled {
    border: 1px solid #a6c8ff;
    background: #aecdff;
    cursor: not-allowed;
  }
`;
