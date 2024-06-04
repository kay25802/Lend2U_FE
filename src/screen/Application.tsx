import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SelectReason from '../component/applicationDetail/SelectReason';
import SelectDevice from '../component/applicationDetail/SelectDevice';
import StyledFileInput from '../component/applicationDetail/StyledFileInput';
import axios from 'axios';
import { Link } from 'react-router-dom';
import scrollbar from '../assets/scrollBar.svg';
declare global {
  interface Window {
    daum: any; // Daum 우편번호 서비스 API 객체의 타입 정의
  }
}

function Application() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCountdown, setVerificationCountdown] = useState(300);
  const [countdown, setCountdown] = useState<number>(300);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const [verificationButtonText, setVerificationButtonText] = useState('확인');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [depositorName, setDepositorName] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const cleanPhoneNumber = (input: string) => {
    return input.replace(/-/g, '');
  };
  useEffect(() => {
    // Daum 우편번호 서비스 스크립트 동적 로드
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);

  const handleSearchAddress = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //주소 검색 로직
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          setAddress(data.address);
        }
      }).open();
    } else {
      console.error('Daum Postcode API not loaded.');
    }
  };
  const handleDeviceTypeChange = (newCourier: string | null) => {
    if (newCourier !== null) {
      setSelectedDevice(newCourier);
    }
  };
  const handleSelectedReasonChange = (newCourier: string | null) => {
    if (newCourier !== null) {
      setSelectedReason(newCourier);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailVerification = () => {
    if (email === '') {
      setIsEmailEmpty(true);
      return;
    }
    if (!email.includes('@')) {
      setEmail('');
      setIsEmailEmpty(true);
      return;
    }
    alert('코드를 발송했습니다. 메일을 확인해주세요');
    const formData = new FormData();
    formData.append('email', email);

    axios
      .post('https://lend2u.site/api/sendCode', formData)
      .then((response) => {
        setIsEmailVerified(true);
        setIsVerificationCompleted(false);
        setIsCodeInvalid(false);
        setIsEmailEmpty(false);
      })
      .catch((error) => {
        console.error('Error sending email confirmation:', error);
      });
    setIsEmailEmpty(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (countdown > 0 && isEmailVerified && !isVerificationCompleted) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0 || isVerificationCompleted) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countdown, isEmailVerified, isVerificationCompleted]);

  const handleResendEmail = () => {
    const formData = new FormData();
    formData.append('email', email);

    axios
      .post('https://lend2u.site/api/sendCode', formData)
      .then((response) => {
        setIsEmailVerified(true);
        setIsVerificationCompleted(false);
        setIsCodeInvalid(false);
        setIsEmailEmpty(false);
      })
      .catch((error) => {
        console.error('Error sending email confirmation:', error);
      });
    setVerificationCountdown(300); // Reset countdown
    setCountdown(300); // Reset the countdown timer to 5 minutes
  };

  const handleVerify = () => {
    // 이메일과 사용자가 입력한 인증번호를 서버로 보내서 처리
    const formData = new FormData();
    formData.append('email', email); // 이메일 주소
    formData.append('code', verificationCode); // 사용자가 입력한 인증번호

    axios
      .post('https://lend2u.site/api/confirmEmail', formData)
      .then((response) => {
        if (response.status === 200) {
          // HTTP 상태 코드 200일 경우 처리 (성공)
          console.log('Email verification successful:', response);

          // 토큰 저장
          const token = response.data; // 이 부분은 실제 응답에 맞게 수정해야 합니다.
          console.log(token);
          localStorage.setItem('verificationToken', token); // 로컬 스토리지에 토큰 저장

          setIsVerificationCompleted(true);
          setIsCodeInvalid(false);
          setVerificationButtonText('인증완료');
          alert('인증되었습니다.');
        } else {
          // HTTP 상태 코드가 200이 아닌 경우 처리 (실패)
          console.log('Email verification failed:', response);
          setIsVerificationCompleted(false);
          setIsCodeInvalid(true);
          setVerificationButtonText('재입력');
          alert('코드가 다릅니다. 재전송 후 다시 확인해주세요');
        }
      })
      .catch((error) => {
        // HTTP 요청 실패 시 처리
        console.error('Error confirming email:', error);
        setIsVerificationCompleted(false);
        setIsCodeInvalid(true);
        setVerificationButtonText('재입력');
      });
  };
  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handeleDetailAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetailAddress(event.target.value);
  };
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Update the isFormComplete state whenever any required field changes
  useEffect(() => {
    const allFieldsFilled =
      name !== '' &&
      phoneNumber !== '' &&
      email !== '' &&
      selectedDevice !== '' &&
      selectedReason !== '' &&
      selectedFile !== null &&
      address !== '' &&
      detailAddress !== '' &&
      depositorName !== '' &&
      isCheckboxChecked;

    setIsFormComplete(allFieldsFilled);
  }, [
    name,
    phoneNumber,
    email,
    selectedDevice,
    selectedReason,
    selectedFile,
    address,
    detailAddress,
    depositorName,
    isCheckboxChecked
  ]);
  const handleSubmit = async () => {
    if (!isCheckboxChecked) {
      return;
    }

    const verificationToken = localStorage.getItem('verificationToken');

    if (!verificationToken) {
      console.error('Verification token not found');
      return;
    }

    const applicationData = {
      name: name,
      phoneNum: phoneNumber,
      device: selectedDevice,
      applicationReason: selectedReason,
      email: email,
      detailAddress: detailAddress,
      roadAddress: address,
      depositorName: depositorName
    };

    const formData = new FormData();
    formData.append(
      'applicationRequestDto',
      new Blob([JSON.stringify(applicationData)], { type: 'application/json' })
    ); // Application data as JSON
    formData.append('file', selectedFile as Blob);
    try {
      const response = await axios.post(
        'https://lend2u.site/api/submit',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data' // 올바른 Content-Type 설정
          }
        }
      );

      if (response.status === 200) {
        console.log('Application submitted successfully');
        // 성공 처리를 위한 로직 추가
      } else {
        console.error('Application submission failed');
        // 실패 처리를 위한 로직 추가
      }
    } catch (error) {
      const err = error as Error;
      console.error('폼 제출 오류:', err.message);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  return (
    <Container>
      <Title>신청하기</Title>
      <BorderLine />
      <Container>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Blank></Blank>
          <SmallTitle>
            이름<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={'예시 - 홍길동'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            전화번호<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <BasicInput
            id='name'
            type='text'
            value={cleanPhoneNumber(phoneNumber)} // cleanPhoneNumber 함수를 사용해서 하이픈을 제거한 값을 보여줌
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={'하이픈(-) 없이 입력해주세요'}
          />
          <BorderLine2></BorderLine2>
          <SmallTitle>
            이메일<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <DownWrapper>
            <EmailInput
              id='name'
              type='text'
              value={email}
              onChange={handleEmailChange}
              placeholder={
                isEmailEmpty
                  ? '올바른 이메일 형식을 입력하세요'
                  : '이메일은 신청내역 조회에 사용되니 정확하게 입력해주세요'
              }
              style={{
                borderColor: isEmailEmpty ? 'red' : ''
              }}
            />
            <CheckWrapper>
              {isEmailVerified ? (
                <>
                  <CodeInput
                    name='verificationCode'
                    type='text'
                    placeholder='인증번호'
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    style={{ borderColor: isCodeInvalid ? 'red' : '' }} // border 색 추가
                  />
                  <Time>{formatTime(countdown)}</Time>
                  <IsCorrectbutton onClick={handleVerify}>
                    {verificationButtonText}
                  </IsCorrectbutton>
                  <Resendbutton onClick={handleResendEmail}>
                    재전송
                  </Resendbutton>
                </>
              ) : (
                <>
                  <EmailCheckButton
                    onClick={handleEmailVerification}
                    disabled={isEmailVerified}>
                    코드 전송
                  </EmailCheckButton>
                </>
              )}
            </CheckWrapper>
          </DownWrapper>
          <BorderLine2></BorderLine2>
          <SmallTitle>
            신청 기기<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectDevice onChange={handleDeviceTypeChange}></SelectDevice>
          <SmallTitle>
            신청 사유<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SelectReason onChange={handleSelectedReasonChange}></SelectReason>
          <SmallTitle>
            기초수급자 증명서 업로드<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <StyledFileInput onChange={handleFileChange} />
          <SmallTitle>
            배송 주소<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <AddressInput
            type='text'
            value={address}
            onChange={handleAddressChange}
            placeholder='도로명 주소 검색'
          />
          <AddressButton onClick={handleSearchAddress}>검색</AddressButton>
          <AddressInput2
            type='text'
            value={detailAddress}
            onChange={handeleDetailAddressChange}
            placeholder='상세 주소'></AddressInput2>
          <SmallTitle>
            입금자명<BasicInfoAsterisk>*</BasicInfoAsterisk>
          </SmallTitle>
          <SmallInfo>
            금액 8만원 = 7만원 (보증금/환불 예정) + 1만원 (배송비/제품관리비용)
            <br />
            농협은행 333-123456-45678 (예금주명 아웃라이언)
          </SmallInfo>
          <BorderLine3></BorderLine3>
          <Input3
            id='name'
            type='text'
            value={depositorName}
            onChange={(e) => setDepositorName(e.target.value)}
            placeholder={'예시 - 홍길동'}
          />
          <ScrollableContent>
            <PrivacyAgreement>
              <h4>개인정보 수집 동의</h4>
              <p>[개인정보 수집 동의서]</p>
              <p>
                [수집하는 개인정보 항목] 1. 성명 2. 주소 3. 연락처 (전화번호,
                이메일) 4. 기초생활수급자 증명서 5. 대여기록 6. 결제 정보
                (계좌번호)
              </p>
              <p>
                [개인정보의 수집 및 이용 목적]
                <br />
                위에서 수집하는 개인정보는 다음과 같은 목적으로 이용됩니다.
                <br />
                1. 서비스 제공: 상품 또는 서비스의 구매, 판매, 배송 등 거래 및
                2. 서비스 제공을 위하여 개인정보를 수집하고 이용합니다.
                <br />
                3. 고객 상담 및 문의 처리: 고객 문의사항에 대한 처리, 불만 접수
                및 처리, 서비스 문제 해결을 위해 개인정보를 수집하고 이용합니다.
                <br />
                4. 서비스 개선: 서비스의 품질 향상, 새로운 서비스 개발 등을 위해
                개인정보를 활용합니다.
              </p>
              <p>
                [개인정보의 보유 및 이용기간]
                <br />
                이용자의 개인정보는 개인정보의 수집 및 이용목적이 달성되거나,
                이용자가 동의를 철회하는 경우에는 지체 없이 파기됩니다. 단,
                법령에 특별한 규정이 있는 경우에는 그에 따라 보존할 수 있습니다.
              </p>
              <p>
                [개인정보 제공 동의]
                <br />
                개인정보의 수집 및 이용에 동의합니다. 제공하는 개인정보는 해당
                서비스의 제공을 위한 목적으로만 이용되며, 목적 이외의 용도로는
                사용되지 않습니다. 동의를 거부할 권리가 있으나, 동의를 거부하는
                경우에는 일부 서비스가 제한될 수 있습니다.
              </p>
            </PrivacyAgreement>
          </ScrollableContent>
          <DownWrapper>
            <StyledCheckbox
              type='checkbox'
              checked={isCheckboxChecked}
              onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
            />
            <Agree>동의합니다</Agree>
          </DownWrapper>
          <Link to={'/'}>
            <SubmitButton
              type='button'
              disabled={!isFormComplete}
              onClick={handleSubmit}>
              작성 완료
            </SubmitButton>
          </Link>
        </Form>
      </Container>
    </Container>
  );
}

export default Application;
const DownWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Blank = styled.div`
  height: 30px;
`;
const AddressButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 100px;
  height: 41px;
  margin-right: 10px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background: #428aff;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 41px;
  cursor: pointer;
  margin-left: 15px;
`;
const AddressInput = styled.input`
  height: 30px;
  width: 600px;
  margin-left: 30px;
  margin-bottom: 15px;
  margin-top: 13px;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 15px; /* Apply border-radius */
  font-size: 14px;
  font-family: 'GmarketSansMedium';
  color: #999999;
`;
const AddressInput2 = styled.input`
  height: 30px;
  width: 720px;
  margin-left: 30px;
  margin-bottom: 20px;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 15px; /* Apply border-radius */
  font-size: 14px;
  font-family: 'GmarketSansMedium';
  color: #999999;
`;
const Input3 = styled.input`
  height: 30px;
  width: 320px;
  margin-left: 30px;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  border-radius: 15px; /* Apply border-radius */
  font-size: 14px;
  font-family: 'GmarketSansMedium';
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;
const BorderLine3 = styled.hr`
  stroke-width: 2px;
  width: 700px;
  flex-shrink: 0;
  margin-left: 36px;
  margin-right: 8px;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 6px;
`;
const BorderLine2 = styled.hr`
  stroke-width: 2px;
  width: 700px;
  flex-shrink: 0;
  margin-left: 36px;
  margin-right: 8px;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-top: 6px;
  margin-bottom: 25px;
`;
const BasicInput = styled.input`
  width: 600px;
  height: 16px;
  padding: 0px;
  flex-shrink: 0;
  border: none;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-bottom: 0px;
  margin-top: 10px;
  outline: none;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;
const EmailInput = styled.input`
  width: 370px;
  height: 16px;
  padding: 0px;
  flex-shrink: 0;
  border: none;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-top: 13px;
  outline: none;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;
const CheckWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const CodeInput = styled.input`
  width: 90px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1px solid #dbdbdf;
  background: #fff;
  padding-left: 0.6rem;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: 'GmarketSansMedium';
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 300;
  line-height: 30px;
  margin-left: 17px;
`;
const IsCorrectbutton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 67px;
  height: 31px;
  margin-right: 10px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  border: 1px solid #dbdbdf;
  background: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 31px;
  letter-spacing: -2px;
  cursor: pointer;

  &:hover {
    background: rgba(118, 118, 118, 0.1);
  }
`;

const Time = styled.div`
  font-family: 'GmarketSansMedium';
  width: 60px;
  height: 31px;
  margin-left: 10px;
  margin-top: 2px;
  border: none;
  background: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 31px;
  cursor: pointer;
`;

const Resendbutton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 67px;
  height: 31px;
  margin-right: 10px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  border: 1px solid #dbdbdf;
  background: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 31px;
  letter-spacing: -2px;
  cursor: pointer;

  &:hover {
    background: rgba(118, 118, 118, 0.1);
  }
`;
const EmailCheckButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 67px;
  height: 31px;
  margin-left: 10px;
  margin-top: 2px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  border: 1px solid #dbdbdf;
  background: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 31px;
  letter-spacing: -2px;
  cursor: pointer;
  &:hover {
    background: rgba(118, 118, 118, 0.1);
  }
`;
const SmallTitle = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-bottom: 2px;
}`;
const SmallInfo = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 36px;
  margin-bottom: 2px;
  margin-top: 10px;
}`;
const Agree = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
}`;
const BasicInfoAsterisk = styled.span`
  color: red;
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 16px;
  height: 16px;
  margin-top: 8px;
  margin-right: 7px;
  margin-left: 670px;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;

const BorderLine = styled.hr`
  /*borderline 스타일 설정*/
  stroke-width: 2px;
  width: 860px;
  flex-shrink: 0;
  color: #dbdbdf;
  border: none;
  border-top: 1px solid #dbdbdf;
  margin-bottom: 5px;
`;

const ScrollableContent = styled.div`
  max-height: 140px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 15px;
  margin-top: 20px;
  width: 700px;
  margin-left: 30px;
  border-radius: 4px;
  scrollbar-width: none; /* Remove default scrollbar */
  &::-webkit-scrollbar {
    width: 4px; /* Set width of the new custom scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    background-image: url(${scrollbar});
    background-repeat: no-repeat;
    background-size: 4px 134px;
    border-radius: 2px; /* Rounded corners for the thumb */
  }
`;

const PrivacyAgreement = styled.div`
  /* 개인정보 동의서 스타일 설정 */
  font-size: 12px;
  line-height: 1.5;
  max-width: 100%; /* 내용이 너무 커질 때 가로스크롤이 나타나지 않도록 */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.div`
  margin-top: 100px;
  font-size: 28px;
  margin-bottom: 10px;
  margin-right: 750px;
`;

const Form = styled.form`
  border-radius: 13px;
  background: #fff;
  padding: 20px;
  width: 800px;
  height: 1080px;
  box-shadow: 0px 4px 20px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 50px;
  margin-left: 8px;
  margin-top: 50px;
`;

const SubmitButton = styled.button`
  font-family: 'GmarketSansMedium';
  width: 200px;
  height: 41px;
  margin-right: 10px;
  margin-left: 300px;
  margin-top: 20px;
  border: 1px solid #a6c8ff;
  border-radius: 15px;
  background: #428aff;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 41px;
  letter-spacing: -2px;
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
