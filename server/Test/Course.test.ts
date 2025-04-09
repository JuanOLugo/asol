import { disconnectDb, connectDb } from "../src/Infrestructure/Db/conexion.db";
import req from "supertest";
import { app } from "../src/Infrestructure/Server";
import mongoose from "mongoose";
import ICourse from "../src/Domain/Interfaces/Db Interfaces/ICourse";
import { categoryId, adminId,  titleId,  enterpriseToken, enterpriseId } from "./infrestucture/utils/UserUtils";
beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await disconnectDb();
});



describe("Course api", () => {
    it("Create course", async () => {
        const course: ICourse = {
            name: "Course 1",
            description: "Course 1 description",
            createAt: new Date().toLocaleDateString("es-co"),
            enterprise: enterpriseId,
            Admin: adminId,
            category: categoryId,
            title: titleId,
        }

        const response = await req(app).post("/api/course/create").set("Authorization", `Bearer ${enterpriseToken}`).send(course);
        console.log(response.body, response.status);
    })
})