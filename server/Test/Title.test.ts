import { disconnectDb, connectDb } from "../src/Infrestructure/Db/conexion.db";
import req from "supertest";
import { app } from "../src/Infrestructure/Server";
import mongoose from "mongoose";
import ITitle from "../src/Domain/Interfaces/Db Interfaces/ITitle";
import { adminId,  enterpriseToken, enterpriseId } from "./infrestucture/utils/UserUtils";
beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await disconnectDb();
});


describe("Title api", () => {
    it("Create title", async () => {
        const title: ITitle = {
            name: "Title 1",
            description: "Title 1 description",
            enterprise: enterpriseId,
            Admin: adminId,
           createAt: new Date().toLocaleDateString("es-co"),
        }

        const response = await req(app).post("/api/title/create").set("Authorization", `Bearer ${enterpriseToken}`).send(title);
        console.log(response.body, response.status);
    });
});
