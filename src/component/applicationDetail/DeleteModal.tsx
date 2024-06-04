import React from 'react';
import axios from 'axios';
import {
  ModalContainer3,
  ModalContent,
  BasicButton,
  BasicLabel,
  Title,
  ModalOverlay,
  Border,
  ButtonWrapper
} from './ModalStyle';

interface AdminRefuseModalProps {
  id: number;
  onClose: () => void;
  onUpdate: () => void;
}

const DeleteModal: React.FC<AdminRefuseModalProps> = ({
  id,
  onClose,
  onUpdate
}) => {
  const handleDeleteSubmit = () => {
    const token = localStorage.getItem('verificationToken');
    axios
      .put(`https://lend2u.site/api/cancel/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        onUpdate();
        onClose(); // 삭제 성공 시 모달 닫기
      })
      .catch((error) => {
        console.error('Error deleting application:', error);
      });
    onClose();
  };

  return (
    <ModalContainer3>
      <ModalOverlay>
        <ModalContent>
          <Title>신청내역 삭제</Title>
          <Border></Border>
          <BasicLabel>신청내역을 삭제하시겠습니까?</BasicLabel>
          <ButtonWrapper>
            <BasicButton onClick={handleDeleteSubmit}>삭제</BasicButton>
            <BasicButton onClick={onClose}>취소</BasicButton>
          </ButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer3>
  );
};

export default DeleteModal;
