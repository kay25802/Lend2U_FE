import React, { useState } from 'react';
import axios from 'axios';
import {
  ModalContainer,
  ModalContent,
  BasicButton,
  BasicLabel,
  Title,
  ModalOverlay,
  ButtonWrapper,
  Border,
  BasicInput2
} from './ModalStyle';
import SelectCourier from './SelectCourier';
import SelectBank from './SelectBank';

interface AdminRefuseModalProps {
  id: number;
  onClose: () => void;
}

const StatusModal: React.FC<AdminRefuseModalProps> = ({ id, onClose }) => {
  const [billNumber, setBillNumber] = useState('');
  const [courierName, setCourierName] = useState('');
  const [bankName, setBankName] = useState('');
  const [depositNum, setDepositNum] = useState('');
  const handleCourierChange = (newCourier: string | null) => {
    if (newCourier !== null) {
      setCourierName(newCourier);
    }
  };
  const handleBankChange = (newBank: string | null) => {
    if (newBank !== null) {
      setBankName(newBank);
    }
  };
  const handleSubmit = () => {
    if (billNumber && courierName && bankName && depositNum) {
      const returnData = {
        id: id.toString(),
        waybillNumber: billNumber,
        courier: courierName,
        bank: bankName,
        deposit: depositNum
      };
      const formData = new FormData();
      formData.append(
        'returnRequestDto',
        new Blob([JSON.stringify(returnData)], { type: 'application/json' }),
        'returnRequestDto'
      );

      const token = localStorage.getItem('verificationToken');

      axios
        .post(
          'https://lend2u.site/api/return',
          formData, // Use the FormData object here
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data' // Set the content type for FormData
            }
          }
        )
        .then((response) => {
          console.log(response);
          onClose();
        })
        .catch((error) => {
          console.error('Error updating return status:', error);
        });
    }
  };

  return (
    <ModalContainer>
      <ModalOverlay>
        <ModalContent>
          <Title>반환정보 입력</Title>
          <Border></Border>
          <BasicLabel>반환 택배 정보</BasicLabel>
          <SelectCourier onChange={handleCourierChange} />
          <BasicInput2
            id='billNumber'
            value={billNumber}
            placeholder={'운송장 번호 입력'}
            onChange={(e) => setBillNumber(e.target.value)}
          />
          <BasicLabel>보증금 환불 정보</BasicLabel>
          <SelectBank onChange={handleBankChange} />
          <BasicInput2
            id='depositNum'
            value={depositNum}
            placeholder={'보증금 환불 계좌번호 입력'}
            onChange={(e) => setDepositNum(e.target.value)}
          />
          <ButtonWrapper>
            <BasicButton onClick={handleSubmit}>제출</BasicButton>
            <BasicButton onClick={onClose}>취소</BasicButton>
          </ButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
};

export default StatusModal;
