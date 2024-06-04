export interface ApplicationDetailProps {
  id: number;
  name: string;
  phoneNum: string;
  device: string;
  applicationReason: string;
  email: string;
  certificationFile: string;
  detailAddress: string;
  roadAddress: string;
  applyDate: string;
  returnDate: string;
  depositorName: string;
  applicationStatus: string;
  refuseReason: string;
  waybillNumber: string;
  courier: string;
  bank: string;
  deposit: string;
  onUpdate: () => void;
}
