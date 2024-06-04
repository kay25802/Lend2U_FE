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
import img from '../../assets/tablet.svg';

function TabletCard() {
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
    if (showSpec) height += 510;
    return height;
  };

  return (
    <CardContainer ref={cardRef}>
      <UpWrapper>
        <LogoImage src={img} alt='로고 이미지' />
        <CardInfo>
          <h3>태블릿</h3>
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
                12.7인치 / LCD / 2944x1840 / 16:10 / 144Hz / 400nits
              </SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>시스템</SpecTitle>
              <SpecContent>램:8GB / 내장:128GB / microSD지원</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>네트워크</SpecTitle>
              <SpecContent>Wi-Fi6 / 블루투스v5.2</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>카메라 후면</SpecTitle>
              <SpecContent>1,300만화소</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>카메라 전면</SpecTitle>
              <SpecContent>800만화소</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>스피커</SpecTitle>
              <SpecContent>4개 / JBL튠 / 돌비애트모스</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>전용펜</SpecTitle>
              <SpecContent>O</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>전용키보드</SpecTitle>
              <SpecContent>X</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>배터리 단자</SpecTitle>
              <SpecContent>C타입 / 10,200mAh / 최대20W</SpecContent>
            </SpecWrapper>
            <SpecWrapper>
              <SpecTitle>규격</SpecTitle>
              <SpecContent>
                가로: 293.4mm / 세로: 190.8mm / 두께: 6.9mm
              </SpecContent>
            </SpecWrapper>
          </Spec>
        </>
      )}
    </CardContainer>
  );
}

export default TabletCard;
