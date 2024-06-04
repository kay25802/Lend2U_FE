import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';

interface SelectStatusProps {
  onChange: (status: string | null) => void;
  status: string;
}

function SelectStatus({ onChange, status }: SelectStatusProps) {
  const [selectStatus, setSelectStatus] = useState<string | null>(status);
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
    setSelectStatus(selectedOption.value);
    onChange(selectedOption.value);
  };

  const Options = [
    { value: '접수중', label: '접수중' },
    { value: '승인', label: '승인' },
    { value: '배송중', label: '배송중' },
    { value: '배송완료', label: '배송완료' },
    { value: '반환완료', label: '반환완료' }
  ];

  return (
    <StyledSelect
      options={Options}
      value={selectStatus ? { value: selectStatus, label: selectStatus } : null}
      onChange={handleCountChange}
      placeholder=''
      styles={customStyles}
    />
  );
}

export default SelectStatus;

const StyledSelect = styled(Select)`
  width: 320px;
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
  margin-left: 36px;
  margin-bottom: 20px;
  margin-top: 30px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
