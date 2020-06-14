import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import userRoutes from "./routes/users";
import authenticationRoutes from "./routes/authentication";
import departmentRoutes from "./routes/department";
import localeRoutes from "./routes/locale";
// import serviceRoutes from "./routes/services";
// import organizationRoutes from "./routes/organization";
// import dispensaryRoutes from "./routes/dispensary";
// import beneficiaryRoutes from "./routes/beneficiary";

// import logger from "./utilities/helpers/logger";

dotenv.config();
const applicationName = process.env.APPLICATION_NAME;
const port = process.env.PORT;
const bnshia: Application = express();

bnshia.use(express.json());
bnshia.use(bodyParser.urlencoded({ extended: false }));
bnshia.use(bodyParser.json());
bnshia.use(cors());

bnshia.use("/auth", authenticationRoutes);
bnshia.use("/users", userRoutes);
bnshia.use("/locale", localeRoutes);
bnshia.use("/departments", departmentRoutes);
// bnshia.use("/services", serviceRoutes);
// bnshia.use("/organizations", organizationRoutes);
// bnshia.use("/dispensary", dispensaryRoutes);
// bnshia.use("/beneficiaries", beneficiaryRoutes);

bnshia.listen(port, async () => {
  console.log(`${applicationName} running and listening on port ${port}`);

  // try {
  //   // loadDispensaryItemsFromMasterFiles();
  // } catch (error) {
  //   // logger.error(error.message);
  // }
});
