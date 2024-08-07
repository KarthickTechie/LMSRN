import * as dbopsZonalMasters from "./dbopsZonalMasters";
import * as dbopsBranchMasters from "./dbopsBranchMasters";
import * as dbopsStatesMasters from "./dbopsStatesMasters";
import * as dbopsCityMasters from "./dbopsCityMasters";
import * as dbopsStaticDataMasters from "./dbopsStaticDataMasters";
import * as dbopsMainProductsMasters from "./dbopsMainProductsMasters";
import * as dbopsSubProductsMasters from "./dbopsSubProductsMasters";
import * as dbServices from "./dbservices";
import {
  deleteTableDataByTableNames,
  getColumns,
  prepareDB,
} from "./dbservices";

export {
  dbopsZonalMasters,
  dbopsBranchMasters,
  dbopsStatesMasters,
  dbopsCityMasters,
  dbopsStaticDataMasters,
  dbopsMainProductsMasters,
  dbopsSubProductsMasters,
  dbServices,
};
