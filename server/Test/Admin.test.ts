import { disconnectDb, connectDb } from "../src/Infrestructure/Db/conexion.db";
import req from "supertest";
import { app } from "../src/Infrestructure/Server";
import IAdmin from "../src/Domain/Interfaces/Db Interfaces/IAdmin";
import mongoose from "mongoose";
import {  enterpriseToken, enterpriseId } from "./infrestucture/utils/UserUtils";
beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await disconnectDb();
});

describe("Admin api", () => {
  it("Register new admin", async () => {
    const admin: IAdmin = {
      dni: "1234567890",
      name: "Admin 1",
      lastName: "Admin 1",
      email: "admin1@example.com",
      password: "password123",
      enterprise: new mongoose.Types.ObjectId("67f6048225711a079bcef031"),
      createAt: new Date().toLocaleDateString("es-co"),
    };
    const response = await req(app)
      .post("/api/admin/register")
      .set("Authorization", "Bearer " + enterpriseToken)
      .send(admin);

    if (response.status === 201) {
      console.log(response.body);
    } else {
      console.log(response.body);
    }
  });

  it("Login admin", async () => {
    const response = await req(app)
      .post("/api/admin/login")
      .set("Authorization", "Bearer " + enterpriseToken)
      .send({
        dni: "1234567890",
        password: "password123",
      });

    if (response.status === 200) {
      console.log(response.headers["set-cookie"][0]);
    } else {
      console.log(response.body);
    }
  });

  it("Get Admin", async () => {
    const adminId = "67f614c9f40d0154ce559b6d";
    const response = await req(app)
      .get("/api/admin/get/" + adminId)
      .set("Authorization", "Bearer " + enterpriseToken);
    console.log(response.body);
  });
});
