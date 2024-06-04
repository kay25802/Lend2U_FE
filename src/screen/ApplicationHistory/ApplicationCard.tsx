import React, { useState } from 'react';
import { ApplicationDetailProps } from '../../component/applicationDetail/ApplicationDetailProps';
import {
  CardContainer,
  UpWrapper,
  CardInfo,
  Title,
  SubTitle,
  StatusButton,
  BorderLine,
  InsideWrapper,
  DeleteButton,
  UpdateButton,
  UnderWrapper
} from '../../component/applicationDetail/CardStyle';
import DeleteModal from '../../component/applicationDetail/DeleteModal';
import StatusModal from '../../component/applicationDetail/StatusModal';
import UpdateModal from '../../component/applicationDetail/UpdateModal';
import RefuseInfoModal from '../../component/applicationDetail/RefuseInfoModal';
import axios from 'axios';
import styled from 'styled-components';
const ApplicationCard: React.FC<ApplicationDetailProps> = ({
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
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [StatusModalOpen, setStatusModalOpen] = useState(false);
  const [UpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [RefuseInfoModalOpen, setRefuseInfoModalOpen] = useState(false);
  const isReceptionStatus = applicationStatus === '접수중';
  const Apply = applicationStatus === '반환신청';
  const isRefuse = applicationStatus === '신청반려';
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const openStatusModal = () => {
    setStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setStatusModalOpen(false);
  };
  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };
  const openRefuseInfoModal = () => {
    console.log(refuseReason);
    setRefuseInfoModalOpen(true);
  };

  const closeRefuseInfoModal = () => {
    setRefuseInfoModalOpen(false);
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
    <div>
      <CardContainer>
        <UpWrapper>
          <CardInfo>
            <Title>신청일</Title>
            <SubTitle>{applyDate}</SubTitle>
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
            <Title>입금자명/입금계좌</Title>
            <SubTitle>
              {depositorName} / 농협 333-123456-7891((주)아웃라이언)
            </SubTitle>
          </CardInfo>
          <BorderLine></BorderLine>
          <CardInfo>
            <Title>반납일</Title>
            {returnDate != '' && <SubTitle>{returnDate}</SubTitle>}
            {returnDate == '' && <SubTitle>배송완료 후 자동 확정</SubTitle>}
          </CardInfo>
        </UpWrapper>
        <UnderWrapper>
          <StatusButton
            style={isRefuse ? { background: '#FFA5A5' } : {}}
            disabled={!Apply && !isRefuse}
            onClick={isRefuse ? openRefuseInfoModal : openStatusModal}>
            {applicationStatus}
          </StatusButton>
          <DownButton onClick={handleCertificationDownload}>
            증명서 조회
          </DownButton>
          <InsideWrapper>
            <DeleteButton
              disabled={!isReceptionStatus}
              onClick={openDeleteModal}>
              취소
            </DeleteButton>
            <UpdateButton
              disabled={!isReceptionStatus}
              onClick={openUpdateModal}>
              수정
            </UpdateButton>
          </InsideWrapper>
        </UnderWrapper>
      </CardContainer>
      {DeleteModalOpen && (
        <DeleteModal id={id} onClose={closeDeleteModal} onUpdate={onUpdate} />
      )}
      {StatusModalOpen && <StatusModal id={id} onClose={closeStatusModal} />}
      {UpdateModalOpen && (
        <UpdateModal
          id={id}
          name={name}
          phoneNum={phoneNum}
          device={device}
          applicationReason={applicationReason}
          certificationFile={certificationFile}
          detailAddress={detailAddress}
          roadAddress={roadAddress}
          depositorName={depositorName}
          isOpen={UpdateModalOpen}
          onClose={closeUpdateModal}
          onUpdate={onUpdate}
        />
      )}
      {RefuseInfoModalOpen && (
        <RefuseInfoModal
          refuseReason={refuseReason} // 반려 사유를 props로 전달
          onClose={closeRefuseInfoModal}
        />
      )}
    </div>
  );
};

export default ApplicationCard;

const DownButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 170px;
  height: 38px;
  margin-right: 5px;
  margin-top: 7px;
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
