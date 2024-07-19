import * as yup from 'yup';

 const SourcingFormValidationSchema =  yup.object().shape({
    sourcingid: yup.string().required().label('Sourcing ID'),
    preferredbranch: yup.string().required().label('Preferred Branch'),
    businessdescription: yup.string().required("Business Description is required"),
    sourcingchannel: yup.string().required("Sourcing Channel is Required"),
    sourcingname: yup.string().required("Sourcing Name is Required"),
    branchcode:yup.string().required("Branch Code is Required"),
    leadby : yup.string().required(),
    leadid:yup.string().required(),
    customername:yup.string().required("Customer Name is Required"),
    dob:yup.string().required("Date of birth is required"),
    mobileno:yup.string().required("Mobile no is required"),
    productinterested:yup.string().required("Product is required"),
  })

  export {SourcingFormValidationSchema}