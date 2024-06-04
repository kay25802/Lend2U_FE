import React, { useState } from 'react';
import { ApplicationDetailProps } from './ApplicationDetailProps';
import {
  UpWrapper,
  CardInfo,
  Title,
  SubTitle,
  BorderLine,
  RefuseButton,
  UnderWrapper,
  AdminCardContainer
} from './CardStyle';
import AdminRefuseModal from './AdminRefuseModal';
import ControlStatusModal from './ControlStatusModal';
import InfoModal from './InfoModal';
import axios from 'axios';

const ApplicationCardForAdmin = ({
  id,
  name,
  phoneNum,
  device,
  applicationReason,
  email,
  certificationFile,
  detailAddress,
  roadAddress,
  applyDate,
  returnDate,
  depositorName,
  applicationStatus,
  refuseReason,
  waybillNumber,
  courier,
  bank,
  deposit,
  onUpdate
}: ApplicationDetailProps) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [controlModalOpen, setControlModalOpen] = useState(false);
  const [retrieveInfoModalOpen, setRetrieveInfoModalOpen] = useState(false);
  const isRejected = applicationStatus === '신청반려';
  const openRejectModal = () => {
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
  };
  const openControlModal = () => {
    setControlModalOpen(true);
  };

  const closeControlModal = () => {
    setControlModalOpen(false);
  };
  const openInfoModal = () => {
    setRetrieveInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setRetrieveInfoModalOpen(false);
  };
  const handleRejectSubmit = () => {
    // 모달 닫기
    closeRejectModal();
  };
  const handleCertificationDownload = () => {
    if (certificationFile) {
      const token = localStorage.getItem('verificationToken');
      console.log(token);
      // Assuming certificationFile contains the file ID or filename
      axios({
        url: `https://lend2u.site/api/download/${id}`,
        method: 'GET',
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          const blob = new Blob([response.data], {
            type: response.headers['content-type']
          });
          const blobUrl = URL.createObjectURL(blob);

          window.open(blobUrl, '_blank');

          URL.revokeObjectURL(blobUrl);
        })
        .catch((error) => {
          console.error('Error downloading certification file:', error);
        });
    }
  };
  return (
    <AdminCardContainer>
      <UpWrapper>
        <CardInfo>
          <Title>이름 · 전화번호 · 신청기기</Title>
          <SubTitle>
            {name} · {phoneNum} · {device}
          </SubTitle>
        </CardInfo>
        <BorderLine> </BorderLine>
        <CardInfo>
          <Title>주소</Title>
          <SubTitle>
            {roadAddress} {detailAddress}
          </SubTitle>
        </CardInfo>
        <BorderLine> </BorderLine>
        <CardInfo>
          <Title>입금자명 · 이메일</Title>
          <SubTitle>
            {depositorName} · {email}
          </SubTitle>
        </CardInfo>
        <BorderLine></BorderLine>
        <CardInfo>
          <Title>신청사유</Title>
          <SubTitle>{applicationReason}</SubTitle>
        </CardInfo>
        <BorderLine></BorderLine>
        <CardInfo>
          <Title>내역 상태</Title>
          <SubTitle>{applicationStatus}</SubTitle>
        </CardInfo>
      </UpWrapper>
      <UnderWrapper>
        <RefuseButton disabled={isRejected} onClick={openControlModal}>
          내역 상태 변경
        </RefuseButton>
        <RefuseButton
          disabled={isRejected}
          onClick={handleCertificationDownload}>
          증명서 다운로드
        </RefuseButton>
        <RefuseButton
          disabled={isRejected}
          onClick={openRejectModal}
          style={{ background: isRejected ? '#FFA5A5' : '' }}>
          {isRejected ? '반려 확정' : '접수 내역 반려'}
        </RefuseButton>
        <RefuseButton disabled={isRejected} onClick={openInfoModal}>
          반환 정보 조회
        </RefuseButton>
      </UnderWrapper>
      {isRejectModalOpen && (
        <AdminRefuseModal
          id={id}
          isOpen={isRejectModalOpen}
          onClose={closeRejectModal}
          onConfirm={handleRejectSubmit}
          onUpdate={onUpdate}
        />
      )}
      {controlModalOpen && (
        <ControlStatusModal
          id={id}
          applicationStatus={applicationStatus}
          isOpen={controlModalOpen}
          onClose={closeControlModal}
          onUpdate={onUpdate}
        />
      )}
      {retrieveInfoModalOpen && (
        <InfoModal
          deposit={deposit}
          courier={courier}
          bank={bank}
          waybillNumber={waybillNumber}
          isOpen={retrieveInfoModalOpen}
          onClose={closeInfoModal}
        />
      )}
    </AdminCardContainer>
  );
};

export default ApplicationCardForAdmin;
