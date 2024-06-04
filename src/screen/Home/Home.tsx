import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import {
  DownWrapper,
  Wrapper,
  BorderLine,
  UnderWrapper,
  HomePage,
  SecondWrapper,
  NoticeTitle,
  Notice,
  NoticeApply,
  ApplyButton,
  CheckButton,
  EmailCheckButton,
  NoticeDetail,
  Detail,
  SpecNotice,
  Agree,
  AgreeContent,
  Section,
  Title,
  BasicInfoText,
  BasicInfoAsterisk,
  BasicInput,
  StyledCheckbox,
  ServiceIntro,
  CardList,
  CheckWrapper,
  IsCorrectbutton,
  Resendbutton,
  CodeInput,
  Content,
  Time
} from './HomeStyle';
import { Element } from 'react-scroll';
import { Link } from 'react-router-dom';
import Footer from '../../component/Footer';
import '../../App.css';
import LaptopCard from '../../component/Spec/LaptopCard';
import TabletCard from '../../component/Spec/TabletCard';
import intro from '../../assets/service_intro.svg';
import img from '../../assets/tablet.svg';
import axios from 'axios';
import styled from 'styled-components';
function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCountdown, setVerificationCountdown] = useState(300);
  const [countdown, setCountdown] = useState<number>(300);
  const [isVerificationCompleted, setIsVerificationCompleted] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const [verificationButtonText, setVerificationButtonText] = useState('확인');

  const handleEmailVerification = () => {
    if (email === '') {
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
    console.log(email);
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
  const adminEmails = [
    'admin@example.com',
    'anotheradmin@example.com',
    'mju.outlion@gmail.com',
    'outlion@outlook.kr'
  ];
  function isEmailAdmin(email: string): boolean {
    return adminEmails.includes(email);
  }
  return (
    <div>
      <Header />
      <HomePage>
        <Element name='service-intro'>
          <Section>
            <ServiceIntro>
              <img src={intro} />
            </ServiceIntro>
            <Notice>
              <NoticeTitle>주의사항</NoticeTitle>
              <NoticeDetail>
                훼손이 발생할 경우에는 수리비가 보증금에서 차감되어 전액
                반환되지 않을 수 있습니다.
              </NoticeDetail>
              <NoticeDetail>
                장기 연체와 사용이 불가능할 정도의 심한 파손이 발생한 경우에는
                기기 재구매 비용과 법적 조치가 이어질 수 있습니다.
              </NoticeDetail>
              <NoticeDetail>
                전자기기의 사양은 최소사양만 조회 가능하며 사유에 맞게 랜덤으로
                제공되고, 대여기간은 2주입니다.
              </NoticeDetail>
            </Notice>
            <DownWrapper>
              <Agree>
                <AgreeContent>
                  주의사항 모두 확인했어요.
                  <BasicInfoAsterisk> (필수)</BasicInfoAsterisk>
                </AgreeContent>
                <StyledCheckbox
                  type='checkbox'
                  checked={isCheckboxChecked}
                  onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                />
              </Agree>
              <Link to={'/application'}>
                <ApplyButton disabled={!isCheckboxChecked}>
                  기기 신청하기
                </ApplyButton>
              </Link>
              <ApplyButton onClick={() => setIsModalOpen(true)}>
                신청내역 조회하기
              </ApplyButton>
            </DownWrapper>
            {isModalOpen && (
              <ModalOverlay>
                <ModalContainer>
                  <ModalContent>
                    <NoticeApply>
                      <Content>
                        <UnderWrapper>
                          <BasicInfoText>
                            이메일
                            <BasicInfoAsterisk>*</BasicInfoAsterisk>
                          </BasicInfoText>
                          <BasicInput
                            name='email'
                            type='text'
                            placeholder={
                              isEmailEmpty
                                ? '이메일을 먼저 입력해주세요'
                                : '이메일을 입력하세요'
                            }
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ borderColor: isEmailEmpty ? 'red' : '' }}
                          />
                        </UnderWrapper>
                        <CheckWrapper>
                          {isEmailVerified ? (
                            <>
                              <CodeInput
                                name='verificationCode'
                                type='text'
                                placeholder='인증번호'
                                value={verificationCode}
                                onChange={(e) =>
                                  setVerificationCode(e.target.value)
                                }
                                style={{
                                  borderColor: isCodeInvalid ? 'red' : ''
                                }}
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
                                코드 발송
                              </EmailCheckButton>
                            </>
                          )}
                        </CheckWrapper>
                      </Content>
                    </NoticeApply>
                    <ButtonWrapper>
                      <div>
                        {isVerificationCompleted && isEmailAdmin(email) ? (
                          <Link to={'/admin'}>
                            <CheckButton disabled={!isVerificationCompleted}>
                              관리자 페이지
                            </CheckButton>
                          </Link>
                        ) : (
                          <Link to={'/applicationhistory'}>
                            <CheckButton disabled={!isVerificationCompleted}>
                              신청내역 조회
                            </CheckButton>
                          </Link>
                        )}
                      </div>
                      <CheckButton onClick={handleCloseModal}>닫기</CheckButton>
                    </ButtonWrapper>
                  </ModalContent>
                </ModalContainer>
              </ModalOverlay>
            )}
          </Section>
        </Element>
        <Element name='device-specs'>
          <Section>
            <Title>기기 스펙 조회</Title>
            <BorderLine />
            <SpecNotice>
              <Wrapper>
                <Detail>
                  기기는 최소 보장 사양만을 조회할 수 있고, 순서와는 관계없이
                  신청 사유를 바탕으로 제공드려요!
                </Detail>
                <Detail>
                  모두에게 동등한 사용 기회를 제공하고자 하는 의도에서 시작했고,
                  최소 사양의 기기를 받더라도 사용상 문제가 없는 제품만을
                  제공해요
                </Detail>
              </Wrapper>
            </SpecNotice>
            <CardList>
              <LaptopCard></LaptopCard>
              <TabletCard></TabletCard>
            </CardList>
          </Section>
        </Element>
      </HomePage>
      <Footer />
    </div>
  );
}

export default Home;

const ModalContainer = styled.div`
  width: 791px;
  height: 336px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 20px 10px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 200px;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 600px;
`;
