import { number } from "yup";
import { KeyValueString, Master } from "./AppTypes";

export const StaticMasterData: Master[] = [
  { masterType: "Zonal Masters", downloadStatus: false },
  { masterType: "Branch Master", downloadStatus: false },
  { masterType: "Products Master", downloadStatus: false },
  { masterType: "Geography Master", downloadStatus: false },
  { masterType: "Static Data Master", downloadStatus: false },
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
export const OrganizationMasterColumns: KeyValueString = {
  orgCode: "TEXT",
  orgId: "TEXT",
  orgLevel: "TEXT",
  orgName: "TEXT",
  orgScode: "TEXT",
};

export const ProductMasterColumns: KeyValueString = {
  vertical: "TEXT",
  facDesc: "TEXT",
  facId: "TEXT",
  facParentID: "TEXT",
};

export const SubProductColumns: KeyValueString = {
  rdValueCode: "TEXT",
  rdValueDescription: "TEXT",
  loanProd: "TEXT",
};

export const StaticDataColumns: KeyValueString = {
  rdValueCode: "TEXT",
  rdValueDescription: "TEXT",
  master_id: "INTEGER NOT NULL DEFAULT ''",
};

export const StateMasterColumns: KeyValueString = {
  sgmStateName: "TEXT",
  sgmStateCode: "TEXT",
};

export const CityMasterColumns: KeyValueString = {
  sgmCityCode: "TEXT",
  sgmCityName: "TEXT",
  sgmStateCode: "TEXT",
};

export const LovReferenceKey: Record<string, string | number>[] = [
  { name: "lead_category", id: 1 },
  { name: "otheriddf", id: 2 },
  { name: "constitutiondf", id: 3 },
  { name: "lead_title", id: 4 },
  { name: "listed", id: 5 },
  { name: "registerd", id: 6 },
  { name: "emptype", id: 7 },
  { name: "applicantbankingwithus", id: 8 },
  { name: "guarantorisadded", id: 9 },
  { name: "coapplicantisadded", id: 10 },
  { name: "lead_source", id: 11 },
  { name: "customer_type", id: 12 },
  { name: "emp_gender", id: 13 },
  { name: "employment_type", id: 14 },
  { name: "common_yes_no", id: 15 },
  { name: "change_status", id: 15 },
  { name: "cust_type", id: 16 },
  { name: "business_description", id: 17 },
  { name: "app_yes_no", id: 18 },
  { name: "task_status_schedular", id: 19 },
  { name: "Task_Related_To", id: 20 },
  { name: "priority", id: 21 },
  { name: "report_type", id: 23 },
  { name: "change_sub_status", id: 24 },
];
