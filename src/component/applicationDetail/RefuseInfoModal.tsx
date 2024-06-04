import React, { useState } from 'react';
import {
  ModalContainer3,
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
  onClose: () => void;
  refuseReason: string;
}

const RefuseInfoModal: React.FC<AdminRefuseModalProps> = ({
  onClose,
  refuseReason
}) => {
  return (
    <ModalContainer3>
      <ModalOverlay>
        <ModalContent>
          <Title>반환 정보 조회</Title>
          <Border></Border>
          <BasicLabel>신청 반려 사유</BasicLabel>
          <BasicLabel>{refuseReason}</BasicLabel>
          <SpecialWrapper>
            <BasicButton onClick={onClose}>닫기</BasicButton>
          </SpecialWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer3>
  );
};

export default RefuseInfoModal;
