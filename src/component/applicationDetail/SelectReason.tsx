import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';

interface SelectStatusProps {
  onChange: (reason: string | null) => void;
}

function SelectReason({ onChange }: SelectStatusProps) {
  const [selectReason, setSelectReason] = useState<string | null>('');
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
    setSelectReason(selectedOption.value);
    onChange(selectedOption.value);
  };

  const Options = [
    { value: '코딩/프로그래밍', label: '코딩/프로그래밍' },
    { value: '사무 작업', label: '사무 작업' },
    { value: '학업', label: '학업' },
    { value: '디자인 실습', label: '디자인 실습' }
  ];

  return (
    <StyledSelect
      options={Options}
      value={selectReason ? { value: selectReason, label: selectReason } : null}
      onChange={handleCountChange}
      placeholder='사유 선택'
      styles={customStyles}
    />
  );
}

export default SelectReason;

const StyledSelect = styled(Select)`
  width: 715px;
  height: 36px;
  padding: 0px;
  flex-shrink: 0;
  appearance: none;
  border: none;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 30px;
  margin-bottom: 20px;
  margin-top: 10px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
