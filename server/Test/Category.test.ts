import { disconnectDb, connectDb } from "../src/Infrestructure/Db/conexion.db";
import req from "supertest";
import { app } from "../src/Infrestructure/Server";
import mongoose from "mongoose";
import ICategory from "../src/Domain/Interfaces/Db Interfaces/ICategory";
import { adminId,  enterpriseToken, enterpriseId } from "./infrestucture/utils/UserUtils";
beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await disconnectDb();
});


describe("Category api", () => {
  it("Create category", async () => {
    const category: ICategory = {
      name: "category 2",
      description: "category 2 description",
      enterprise: enterpriseId,
      Admin: adminId,
      createAt: new Date().toLocaleDateString("es-co"),
    };

    const response = await req(app).post("/api/category/create").set("Authorization", `Bearer ${enterpriseToken}`).send(category);
    console.log(response.body, response.status);
  });
});
