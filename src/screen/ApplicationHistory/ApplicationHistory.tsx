import React, { useEffect, useState } from 'react';
import {
  BorderLine,
  Title,
  Notice,
  NoticeDetail,
  NoticeTitle,
  BorderLine2,
  StausWrapper,
  StatusOption,
  ApplyOption,
  Container
} from './ApplicationStyle';
import { ApplicationDetailProps } from '../../component/applicationDetail/ApplicationDetailProps';
import ApplicationCard from './ApplicationCard';
import axios from 'axios';

function ApplicationHistory() {
  const storedToken = localStorage.getItem('verificationToken');
  const [applicationList, setApplicationList] = useState<
    ApplicationDetailProps[]
  >([]);
  useEffect(() => {
    console.log(storedToken);
    axios
      .get('https://lend2u.site/api/get', {
        headers: {
          Authorization: storedToken
        }
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          setApplicationList(response.data);
        } else {
          console.error('Application list data not available:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching application history:', error);
      });
  }, [storedToken]);
  const handleUpdate = () => {
    // This function will be called when the UpdateModal is submitted
    // Fetch updated data and update the applicationList state
    axios
      .get('https://lend2u.site/api/get', {
        headers: {
          Authorization: storedToken
        }
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          setApplicationList(response.data);
        } else {
          console.error('Application list data not available:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching application history:', error);
      });
  };
  return (
    <Container>
      <Title>신청 내역 조회</Title>
      <BorderLine />
      <Notice>
        <NoticeTitle>상태 표기</NoticeTitle>
        <StausWrapper>
          <StatusOption>접수중</StatusOption>
          <StatusOption style={{ background: '#ffa5a5' }}>
            신청 반려
          </StatusOption>
          <StatusOption>취소 완료</StatusOption>
          <StatusOption>승인 대기</StatusOption>
          <StatusOption>배송중</StatusOption>
          <StatusOption>배송 완료</StatusOption>
          <ApplyOption>반환 신청</ApplyOption>
          <StatusOption>반환 완료</StatusOption>
        </StausWrapper>
        <BorderLine2 />
        <NoticeTitle>주의사항</NoticeTitle>
        <NoticeDetail>
          취소와 수정은 상태가 접수중일때만 가능합니다.
        </NoticeDetail>
        <NoticeDetail>
          수령시 받은 택배 박스는 버리지 않고 반환 시 최대한 동일한 상태로
          포장하며 보내주시기 바랍니다.
        </NoticeDetail>
        <NoticeDetail>
          배송 완료 후 2주가 지나면 자동으로 ‘반환 신청’으로 상태가 변경되고,
          버튼을 눌러 운송장번호를 기입해주시기 바랍니다.
        </NoticeDetail>
        <NoticeDetail>반환 주소 : 서울특별시 서대문구 거북골로 34</NoticeDetail>
      </Notice>
      {applicationList.length > 0 ? (
        applicationList.map((data) => (
          <ApplicationCard
            key={data.id}
            {...data}
            applicationStatus={data.applicationStatus || '접수중'}
            returnDate={data.returnDate || ''} // Replace null with an empty string
            waybillNumber={data.waybillNumber || ''}
            courier={data.courier || ''}
            bank={data.bank || ''}
            deposit={data.deposit || ''}
            onUpdate={handleUpdate}
          />
        ))
      ) : (
        <p>No application data available.</p>
      )}
    </Container>
  );
}
export default ApplicationHistory;
