import { disconnectDb, connectDb } from "../src/Infrestructure/Db/conexion.db";
import req from "supertest";
import { app } from "../src/Infrestructure/Server";
import mongoose from "mongoose";
import ICapacitation from "../src/Domain/Interfaces/Db Interfaces/ICapacitation";
import { categoryId, adminId, enterpriseToken, enterpriseId } from "./infrestucture/utils/UserUtils";
beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await disconnectDb();
});




describe("Capacitation api", () => {
  it("Create capacitation", async () => {
    const capacitation: ICapacitation = {
      name: "capacitation 1",
      description: "capacitation 1 description",
      enterprise: enterpriseId,
      Admin: adminId,
      createAt: new Date().toLocaleDateString("es-co"),
      category: categoryId,
    };

    const response = await req(app)
      .post("/api/capacitation/create").set("Authorization", `Bearer ${enterpriseToken}`)
      .send(capacitation);

    if (response.status === 201) {
      console.log(response.body);
    }
  });
});
