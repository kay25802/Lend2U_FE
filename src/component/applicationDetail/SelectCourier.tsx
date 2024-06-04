import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';

interface SelectStatusProps {
  onChange: (status: string | null) => void;
}

function SelectCourier({ onChange }: SelectStatusProps) {
  const [selectCourier, setSelectCourier] = useState<string | null>('');
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: 'none',
      borderRadius: '10px',
      background: provided.background,
      cursor: 'pointer'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    singleValue: (provided) => ({
      ...provided,
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    })
  };
  const handleCountChange = (selectedOption: any) => {
    setSelectCourier(selectedOption.value);
    onChange(selectedOption.value);
  };

  const Options = [
    { value: '우체국택배', label: '우체국택배' },
    { value: 'CJ대한통운', label: 'CJ대한통운' },
    { value: '로젠택배', label: '로젠택배' },
    { value: '한진택배', label: '한진택배' },
    { value: '롯데택배', label: '롯데택배' },
    { value: '드림택배', label: '드림택배' },
    { value: '배송중', label: '배송중' },
    { value: '배송 완료', label: '배송 완료' },
    { value: '대신택배', label: '대신택배' },
    { value: '일양로지스', label: '일양로지스' },
    { value: '경동택배', label: '경동택배' },
    { value: '천일택배', label: '천일택배' },
    { value: '건영택배', label: '건영택배' }
  ];

  return (
    <StyledSelect
      options={Options}
      value={
        selectCourier ? { value: selectCourier, label: selectCourier } : null
      }
      onChange={handleCountChange}
      placeholder='택배사 선택'
      styles={customStyles}
    />
  );
}

export default SelectCourier;

const StyledSelect = styled(Select)`
  width: 310px;
  height: 36px;
  padding: 0px;
  flex-shrink: 0;
  appearance: none;
  border: none;
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 42px;
  margin-bottom: 20px;
  margin-top: 10px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
