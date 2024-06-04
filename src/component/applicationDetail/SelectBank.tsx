import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';

interface SelectStatusProps {
  onChange: (status: string | null) => void;
}

function SelectBank({ onChange }: SelectStatusProps) {
  const [selectBank, setSelectBank] = useState<string | null>('');
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
    setSelectBank(selectedOption.value);
    onChange(selectedOption.value);
  };

  const Options = [
    { value: '하나은행', label: '하나은행' },
    { value: '제일은행', label: '제일은행' },
    { value: '국민은행', label: '국민은행' },
    { value: '신한은행', label: '신한은행' },
    { value: '외환은행', label: '외환은행' },
    { value: '우리은행', label: '우리은행' },
    { value: '한국시티은행', label: '한국시티은행' },
    { value: '기업은행', label: '기업은행' },
    { value: '경남은행', label: '경남은행' },
    { value: '광주은행', label: '광주은행' },
    { value: '대구은행', label: '대구은행' },
    { value: '부산은행', label: '부산은행' },
    { value: '전북은행', label: '전북은행' },
    { value: '제주은행', label: '제주은행' },
    { value: '농협', label: '농협' },
    { value: '한국산업은행', label: '한국산업은행' }
  ];

  return (
    <StyledSelect
      options={Options}
      value={selectBank ? { value: selectBank, label: selectBank } : null}
      onChange={handleCountChange}
      placeholder='은행 선택'
      styles={customStyles}
    />
  );
}

export default SelectBank;

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
