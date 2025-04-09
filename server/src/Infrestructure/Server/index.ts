import express from "express";
import cors from "cors";
import path from "path";
import { connectDb } from "../Db/conexion.db";

// Routes
import UserRouter from "../../Interfaces/Http/Routes/User";
import AdminRouter from "../../Interfaces/Http/Routes/Admin";
import EnterpriseRouter from "../../Interfaces/Http/Routes/Enterprise";

// Passport
import passportConfig from "../Auth/Passport.config";


// Server
export const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use("/api/user", UserRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/enterprise", EnterpriseRouter);

// Passport config
app.use(passportConfig.initialize());

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port", port);
  connectDb();
});
