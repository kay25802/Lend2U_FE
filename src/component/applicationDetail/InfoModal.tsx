import React, { useState } from 'react';
import {
  ModalContainer,
  ModalContent,
  BasicButton,
  BasicInput,
  BasicLabel,
  Title,
  ModalOverlay,
  Border,
  SpecialWrapper
} from './ModalStyle';

interface AdminRefuseModalProps {
  isOpen: boolean;
  onClose: () => void;
  waybillNumber: string;
  courier: string;
  bank: string;
  deposit: string;
}

const InfoModal: React.FC<AdminRefuseModalProps> = ({
  isOpen,
  onClose,
  deposit,
  courier,
  bank,
  waybillNumber
}) => {
  return (
    <ModalContainer>
      <ModalOverlay>
        <ModalContent>
          <Title>반환 정보 조회</Title>
          <Border></Border>
          <BasicLabel>택배사: {courier}</BasicLabel>
          <BasicLabel>운송장 번호: {waybillNumber}</BasicLabel>
          <BasicLabel>은행: {bank}</BasicLabel>
          <BasicLabel>보증금 계좌: {deposit}</BasicLabel>
          <SpecialWrapper>
            <BasicButton onClick={onClose}>닫기</BasicButton>
          </SpecialWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
};

export default InfoModal;
