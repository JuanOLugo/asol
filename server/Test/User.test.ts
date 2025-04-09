import req from "supertest";
import {app} from "../src/Infrestructure/Server/index";
import { connectDb, disconnectDb } from "../src/Infrestructure/Db/conexion.db";
import IUser from "../src/Domain/Interfaces/Db Interfaces/IUser";
import mongoose from "mongoose";
import { categoryId, adminId, capacitationId, titleId, courseId, enterpriseToken, enterpriseId } from "./infrestucture/utils/UserUtils";

beforeAll(async () => {
    await connectDb();
});

afterAll(async () => {
    await disconnectDb();
});




describe("User api", () => {
    it("Create user", async () => {
        const user: IUser = {
            name: "Juan Perez",
            email: "juanperez@gmail.com",
            password: "123456",
            enterprise: enterpriseId,
            dni: "1234567890",
            Admin: adminId,
            capacitation: capacitationId,
            title: titleId,
            createAt: new Date().toLocaleDateString("es-co"),
            lastName: "Perez",
            category: categoryId,
            course: [courseId],
        }

        const response = await req(app).post("/api/user/create").set("Authorization", `Bearer ${enterpriseToken}`).send(user);
        console.log(response.body, response.status);
    })
})