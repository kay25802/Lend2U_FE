import React, { useState } from 'react';
import axios from 'axios';
import {
  ModalContainer,
  ModalContent,
  BasicButton,
  Title,
  ModalOverlay,
  Border,
  ButtonWrapper
} from './ModalStyle';
import SelectStatus from './SelectStatus';

interface AdminRefuseModalProps {
  id: number;
  applicationStatus: string;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const ControlStatusModal: React.FC<AdminRefuseModalProps> = ({
  id,
  applicationStatus,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [status, setStatus] = useState('');
  const handleStatusChange = (newStatus: string | null) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };
  const handleStatusSubmit = () => {
    const token = localStorage.getItem('verificationToken');
    console.log(token);
    if (status) {
      const apiUrl = `https://lend2u.site/api/admin/status/${id}/${status}`;
      axios
        .put(apiUrl, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          onUpdate();
          onClose();
        })
        .catch((error) => {
          // 처리 실패 시 에러 핸들링
          console.error('Error updating application status:', error);
        });
    }
    console.log(id, status);
    onClose();
  };

  return (
    <ModalContainer>
      <ModalOverlay>
        <ModalContent>
          <Title>내역상태 변경</Title>
          <Border></Border>
          <SelectStatus
            status={applicationStatus}
            onChange={handleStatusChange}
          />
          <ButtonWrapper>
            <BasicButton onClick={handleStatusSubmit}>저장</BasicButton>
            <BasicButton onClick={onClose}>취소</BasicButton>
          </ButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
};

export default ControlStatusModal;
