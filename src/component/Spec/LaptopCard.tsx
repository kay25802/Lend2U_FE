import React, { useEffect, useRef, useState } from 'react';
import toggleIcon_down from '../../assets/toggle_down.svg';
import toggleIcon_up from '../../assets/toggle_up.svg';
import {
  CardContainer,
  UpWrapper,
  LogoImage,
  CardInfo,
  Details,
  SpecWrapper,
  Spec,
  SpecTitle,
  SpecContent
} from './CardStyle';
import img from '../../assets/laptop.svg';

function LaptopCard() {
  const [showSpec, setShowSpec] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      const cardHeight = 200 + calculateExpandedOptionsHeight();
      cardRef.current.style.height = `${cardHeight}px`;
    }
  }, [showSpec]);

  const calculateExpandedOptionsHeight = () => {
    let height = 0;
    if (showSpec) height += 650;
    return height;
  };

  return (
    <CardContainer ref={cardRef}>
      <UpWrapper>
        <LogoImage src={img} alt='로고 이미지' />
        <CardInfo>
          <h3>노트북</h3>
        </CardInfo>
      </UpWrapper>
      <Details onClick={() => setShowSpec((prevState) => !prevState)}>
        <p>최소사양 조회</p>
        <img
          src={showSpec ? toggleIcon_up : toggleIcon_down}
          className='toggle-icon'
          alt='Toggle'
        />
      </Details>
      {showSpec && (
        <>
          <Spec>
            <SpecWrapper>
              <SpecTitle>화면정보</SpecTitle>
              <SpecContent>
                {' '}
                39.6cm(15.6인치) / 1920x1080(FHD) / 250nit
              </SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>주사율</SpecTitle>
              <SpecContent>144Hz</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>CPU</SpecTitle>
              <SpecContent>
                인텔 / 코어i7-12세대 / i7-12650H (2.3GHz) / 10코어(6P+4E)
              </SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>RAM</SpecTitle>
              <SpecContent>DDR4 / 램 용량: 8GB / 3200MHz</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>그래픽</SpecTitle>
              <SpecContent>
                외장그래픽 / RTX4050 / TGP: 45W / VRAM:6GB
              </SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>저장장치</SpecTitle>
              <SpecContent>M.2(NVMe) / 512GB / 저장 슬롯: 2개</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>네트워크</SpecTitle>
              <SpecContent>
                무선랜: 802.11ax(Wi-Fi 6) 유선랜: 기가비트
              </SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>영상입출력</SpecTitle>
              <SpecContent>HDMI / 웹캠(HD)</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>단자</SpecTitle>
              <SpecContent>USB-C: 1개 / USB-A: 3개</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>입력장치</SpecTitle>
              <SpecContent>키보드 / ㅗ형 방향키</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>배터리</SpecTitle>
              <SpecContent>52.4Wh</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>어댑터</SpecTitle>
              <SpecContent>120W</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>충전단자</SpecTitle>
              <SpecContent>DC</SpecContent>
            </SpecWrapper>
          </Spec>
        </>
      )}
    </CardContainer>
  );
}

export default LaptopCard;
