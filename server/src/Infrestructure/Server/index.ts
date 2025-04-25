import express from "express";
import cors from "cors";
import path from "path";
import { connectDb } from "../Db/conexion.db";

// Routes
import UserRouter from "../../Interfaces/Http/Routes/User";
import AdminRouter from "../../Interfaces/Http/Routes/Admin";
import EnterpriseRouter from "../../Interfaces/Http/Routes/Enterprise";
import TitleRouter from "../../Interfaces/Http/Routes/Title";
import CapacitationRouter from "../../Interfaces/Http/Routes/Capacitation";
import CourseRouter from "../../Interfaces/Http/Routes/Couse";

// Passport
import passportConfig from "../../Infrestructure/Auth/Passport.config";
import CategoryRouter from "../../Interfaces/Http/Routes/Category";
import DeveloperRouter from "../../Interfaces/Http/Routes/Developer";
import GeneralTitleRouter from "../../Interfaces/Http/Routes/GeneralTitle";

// Server
export const app = express();

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/enterprise", EnterpriseRouter);
app.use("/api/title", TitleRouter);
app.use("/api/capacitation", CapacitationRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/course", CourseRouter);
app.use("/api/developer", DeveloperRouter);
app.use("/api/general-title", GeneralTitleRouter);

// Passport config
app.use(passportConfig.initialize()); 

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.use('/archivos', express.static(path.join(__dirname + '../../../../public/Files')));

// Start server
const port = process.env.PORT || 3000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log("Server is running on port", port);
  });
});
