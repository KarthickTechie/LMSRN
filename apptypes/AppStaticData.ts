import { number } from "yup";
import { Master } from "./AppTypes";

export const StaticMasterData: Master[] = [
  { masterType: "Zonal Masters", downloadStatus: false },
  { masterType: "Branch Master", downloadStatus: false },
  { masterType: "Products Master", downloadStatus: false },
  { masterType: "Geography Master", downloadStatus: false },
  { masterType: "Vehicle Master", downloadStatus: false },
];

export const SourcingFormInitialData = {
  sourcingid: "",
  preferredbranch: "",
  businessdescription: "",
  sourcingchannel: "",
  sourcingname: "",
  branchcode: "",
  leadby: "",
  leadid: "",
  customername: "",
  dob: "",
  mobileno: "",
  productinterested: "",
};

export const ClientVisitFormInitialData = {
  name: "",
  dateOfVisit: "",
  timeOfVisit: "",
  mobileNo: "",
  interestPrd: "",
  loanAmt: "",
  leadCategory: "",
  reason: "",
  remarks: "",
  latCode: "",
  longCode: "",
  address1: "",
  address2: "",
  state: "",
  city: "",
  pincode: "",
};
