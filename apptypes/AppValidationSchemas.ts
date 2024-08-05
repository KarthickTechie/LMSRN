import * as yup from "yup";

const SourcingFormValidationSchema = yup.object().shape({
  sourcingid: yup.string().required().label("Sourcing ID"),
  preferredbranch: yup.string().required().label("Preferred Branch"),
  businessdescription: yup
    .string()
    .required("Business Description is required"),
  sourcingchannel: yup.string().required("Sourcing Channel is Required"),
  sourcingname: yup.string().required("Sourcing Name is Required"),
  branchcode: yup.string().required("Branch Code is Required"),
  leadby: yup.string().required(),
  leadid: yup.string().required(),
  customername: yup.string().required("Customer Name is Required"),
  dob: yup.string().required("Date of birth is required"),
  mobileno: yup.string().required("Mobile no is required"),
  productinterested: yup.string().required("Product is required"),
});

const ClientVisitFormValidationSchema = yup.object().shape({
  name: yup.string().required().label("Name is Required"),
  dateOfVisit: yup.string().required(),
  timeOfVisit: yup.string().required(),
  mobileNo: yup
    .string()
    .required("Mobile Number is Required")
    .matches(/^[0-9]{10}$/, "Enter valid mobile number")
    .min(10, ({ min }) => `Mobile number must be ${min} characters`)
    .max(10, ({ max }) => `Mobile number must be ${max} characters`),
  interestPrd: yup.string().required("Interest Product is Required"),
  loanAmt: yup
    .string()
    .required("Loan Amount is Required")
    .matches(/^[0-9,.]*/, "Enter valid loan amount."),
  leadCategory: yup.string().required("Lead Category is Required"),
  reason: yup.string().required("Reason is Required"),
  remarks: yup.string().required("Remarks is Required"),
  latCode: yup.string().required("Latitute is Required"),
  longCode: yup.string().required("Longitude is Required"),
  address1: yup.string().required("Address 1 is Required"),
  address2: yup.string(),
  state: yup.string().required("State is Required"),
  city: yup.string().required("City is Required"),
  pincode: yup
    .string()
    .required("Pincode is Required")
    .max(6, ({ max }) => `Pincode number must be ${max} characters`)
    .matches(/^[0-9]*/, "Enter valid loan amount."),
});

export { SourcingFormValidationSchema, ClientVisitFormValidationSchema };
