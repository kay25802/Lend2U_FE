import React, { useState } from 'react';
import axios from 'axios';
import {
  ModalContainer,
  ModalContent,
  BasicButton,
  BasicInput,
  Title,
  ModalOverlay,
  ButtonWrapper,
  Border
} from './ModalStyle';

interface AdminRefuseModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (rejectReason: string) => void;
  onUpdate: () => void;
}

const AdminRefuseModal: React.FC<AdminRefuseModalProps> = ({
  id,
  isOpen,
  onClose,
  onConfirm,
  onUpdate
}) => {
  const [rejectReason, setRejectReason] = useState('');
  const storedToken = localStorage.getItem('verificationToken');
  const handleRejectSubmit = () => {
    const token = localStorage.getItem('verificationToken');
    console.log(token);
    if (rejectReason) {
      const apiUrl = `https://lend2u.site/api/admin/refuse/${id}/${rejectReason}`;
      axios
        .put(apiUrl, null, {
          headers: {
            Authorization: storedToken
          }
        })
        .then((response) => {
          onConfirm(rejectReason);
          onUpdate();
          onClose();
        })
        .catch((error) => {
          // 처리 실패 시 에러 핸들링
          console.log(error.data);
          console.error('Error updating application status:', error);
        });
    }
    console.log(rejectReason);
    onClose();
  };

  return (
    <ModalContainer>
      <ModalOverlay>
        <ModalContent>
          <Title>신청내역 반려</Title>
          <Border></Border>
          <BasicInput
            id='rejectReason'
            value={rejectReason}
            placeholder={'거절 사유를 작성해주세요.'}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <ButtonWrapper>
            <BasicButton onClick={handleRejectSubmit}>제출</BasicButton>
            <BasicButton onClick={onClose}>취소</BasicButton>
          </ButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
};

export default AdminRefuseModal;
