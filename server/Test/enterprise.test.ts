import { disconnectDb, connectDb } from "../src/Infrestructure/Db/conexion.db";
import req from "supertest";
import { app } from "../src/Infrestructure/Server";
import IEnterprise from "../src/Domain/Interfaces/Db Interfaces/IEnterprise";

beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await disconnectDb();
});


describe("Enterprise api", () => {
  it("Register new enterprise", async () => {
    const enterprise: IEnterprise = {
      name: "Enterprise 1",
      description: "Enterprise 1 description",
      email: "enterprise1@example.com",
      password: "password123",
      createAt: new Date().toLocaleDateString("es-co"),
    };
    const response = await req(app)
      .post("/api/enterprise/register")
      .send(enterprise);

    if (response.status === 201) {
      console.log(response.body);
    } else {
      console.log(response.body);
    }
  });

  it("Login enterprise", async () => {
    const response = await req(app).post("/api/enterprise/login").send({
      email: "enterprise1@example.com",
      password: "password123",
    });

    if (response.status === 200) {
      console.log(response.headers["set-cookie"][0]);
    } else {
      console.log(response.body);
    }
  });

  it("Get Enterprise", async () => {
    const enterpriseId = "67f6048225711a079bcef031";
    const enterpriseToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjYwNDgyMjU3MTFhMDc5YmNlZjAzMSIsImlhdCI6MTc0NDE3NzY2Mn0.icMGq_uJDzGA8IEYddW8Gu_aU_0ou8gLh9tp_S0X3AE";
    const response = await req(app)
      .get("/api/enterprise/get/" + enterpriseId)
      .set("Authorization", "Bearer " + enterpriseToken);
    console.log(response.body);
  });

  it("Update Enterprise", async () => {
    const enterpriseId = "67f6048225711a079bcef031";
    const enterpriseToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjYwNDgyMjU3MTFhMDc5YmNlZjAzMSIsImlhdCI6MTc0NDE3NzY2Mn0.icMGq_uJDzGA8IEYddW8Gu_aU_0ou8gLh9tp_S0X3AE";
    const response = await req(app)
      .put("/api/enterprise/update/" + enterpriseId)
      .set("Authorization", "Bearer " + enterpriseToken)
      .send({
        name: "Enterprise 1 updated 2",
      });
    console.log(response.body);
  });
});
