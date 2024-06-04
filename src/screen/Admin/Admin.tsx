import React, { useEffect, useState } from 'react';
import { BorderLine, Title } from './AdminStyle';
import { ApplicationDetailProps } from '../../component/applicationDetail/ApplicationDetailProps';
import ApplicationCardForAdmin from '../../component/applicationDetail/ApplicationCardForAdmin';
import axios from 'axios';

function Admin() {
  const storedToken = localStorage.getItem('verificationToken');
  const [applicationList, setApplicationList] = useState<
    ApplicationDetailProps[]
  >([]);
  const handleUpdate = () => {
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
  useEffect(() => {
    // API 호출을 통해 신청 내역 데이터 가져오기
    axios
      .get('https://lend2u.site/api/get', {
        headers: {
          Authorization: storedToken
        }
      })
      .then((response) => {
        setApplicationList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching application history:', error);
      });
  }, [storedToken]);
  return (
    <div>
      <Title>관리자 페이지</Title>
      <BorderLine />
      {applicationList.map((data) => (
        <ApplicationCardForAdmin
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
      ))}
    </div>
  );
}

export default Admin;
