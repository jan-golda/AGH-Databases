import express from "express";
import {apiErrorHandler} from "./ApiError";
import {patients, appointments, index} from "./routes/index";

// setup
const app = express();

// logging
app.use((req, res, next) => {
  console.log(`Handling ${req.method} ${req.originalUrl}`);
  next();
});

// routing
app.get("/", index);
app.use("/patients", patients);
app.use("/appointments", appointments);

// error handling
app.use(apiErrorHandler);

// start server
app.listen(3000);
