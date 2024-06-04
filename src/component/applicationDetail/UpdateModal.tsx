import React, { useState } from 'react';
import axios from 'axios';
import {
  ModalContainer,
  ModalContent,
  BasicButton,
  BasicInput2,
  BasicLabel,
  Title,
  ModalOverlay,
  Border,
  ButtonWrapper
} from './ModalStyle';
import SelectDevice2 from './SelectDevice2';
import SelectReason2 from './SelectReason2';

interface AdminRefuseModalProps {
  id: number;
  name: string;
  phoneNum: string;
  device: string;
  applicationReason: string;
  certificationFile: string;
  detailAddress: string;
  roadAddress: string;
  depositorName: string;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const UpdateModal: React.FC<AdminRefuseModalProps> = ({
  id,
  name,
  phoneNum,
  device,
  applicationReason,
  certificationFile,
  detailAddress,
  roadAddress,
  depositorName,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedPhoneNum, setUpdatedPhoneNum] = useState(phoneNum);
  const [updatedDevice, setUpdatedDevice] = useState(device);
  const [updatedApplicationReason, setUpdatedApplicationReason] =
    useState(applicationReason);
  const [updatedCertificationFile, setUpdatedCertificationFile] =
    useState(certificationFile);
  const [updatedDetailAddress, setUpdatedDetailAddress] =
    useState(detailAddress);
  const [updatedRoadAddress, setUpdatedRoadAddress] = useState(roadAddress);
  const [updatedDepositorName, setUpdatedDepositorName] =
    useState(depositorName);
  const handleDeviceChange = (newCourier: string | null) => {
    if (newCourier !== null) {
      setUpdatedDevice(newCourier);
    }
  };
  const handleReasonChange = (newBank: string | null) => {
    if (newBank !== null) {
      setUpdatedApplicationReason(newBank);
    }
  };
  const handleSubmit = () => {
    const applicationData = {
      name: updatedName,
      phoneNum: updatedPhoneNum,
      device: updatedDevice,
      applicationReason: updatedApplicationReason,
      certificationFile: updatedCertificationFile,
      detailAddress: updatedDetailAddress,
      roadAddress: updatedRoadAddress,
      depositorName: updatedDepositorName
    };
    const formData = new FormData();
    formData.append(
      'editRequestDto',
      new Blob([JSON.stringify(applicationData)], { type: 'application/json' }),
      'editRequestDto'
    );

    const token = localStorage.getItem('verificationToken');

    axios
      .patch(
        `https://lend2u.site/api/update/${id}`,
        formData, // Use the FormData object here
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Set the content type for FormData
          }
        }
      )
      .then((response) => {
        onUpdate();
        onClose();
        console.log(response);
      })
      .catch((error) => {
        console.error('Error updating application:', error);
      });
  };
  return (
    <ModalContainer>
      <ModalOverlay>
        <ModalContent>
          <Title>내역 수정</Title>
          <Border></Border>
          <BasicLabel>이름</BasicLabel>
          <BasicInput2
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <BasicLabel>전화번호</BasicLabel>
          <BasicInput2
            value={updatedPhoneNum}
            onChange={(e) => setUpdatedPhoneNum(e.target.value)}
          />
          <BasicLabel>신청 기기</BasicLabel>
          <SelectDevice2 onChange={handleDeviceChange} />
          <BasicLabel>신청 사유</BasicLabel>
          <SelectReason2 onChange={handleReasonChange} />
          <BasicLabel>파일 선택</BasicLabel>
          <BasicInput2
            value={updatedCertificationFile}
            onChange={(e) => setUpdatedCertificationFile(e.target.value)}
          />
          <BasicLabel>도로명 주소</BasicLabel>
          <BasicInput2
            value={updatedRoadAddress}
            onChange={(e) => setUpdatedRoadAddress(e.target.value)}
          />
          <BasicLabel>상세 주소</BasicLabel>
          <BasicInput2
            value={updatedDetailAddress}
            onChange={(e) => setUpdatedDetailAddress(e.target.value)}
          />
          <BasicLabel>입금자명</BasicLabel>
          <BasicInput2
            value={updatedDepositorName}
            onChange={(e) => setUpdatedDepositorName(e.target.value)}
          />
          <ButtonWrapper>
            <BasicButton onClick={handleSubmit}>저장</BasicButton>
            <BasicButton onClick={onClose}>취소</BasicButton>
          </ButtonWrapper>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
};

export default UpdateModal;
