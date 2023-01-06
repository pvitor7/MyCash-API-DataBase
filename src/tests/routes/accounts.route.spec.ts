import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";

describe("Teste de rota de Transações", () => {
  let connection: DataSource;
  let loginResp: any;
  let token: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Erro durante a inicialização do banco de dados", err);
      });

    const userTest1 = { username: "User 1", password: "Pass1234" };
    await request(app).post("/users/register").send(userTest1);
    loginResp = await request(app).post(`/login`).send(userTest1);
    token = loginResp.body.token;

    const userTest2 = { username: "User 2", password: "Pass1234" };
    await request(app).post("/users/register").send(userTest2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Testando rota de transferência com valor inválido", async () => {
    const response = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ usernameAddressee: "User 2", value: 0 });
    expect(response.body.message).toBe("O valor zero é invalido.");
  });

  test("Testando rota de transferência para um nome de usuário inválido", async () => {
    const response = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ usernameAddressee: "Us", value: 1000 });
    expect(response.body.message).toBe(
      "O nome do destinatário deve ter no mínimo 3 caracteres"
    );
  });

  test("Testando rota de transferência para um usuário inexistente", async () => {
    const response = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ usernameAddressee: "Not Exist", value: 1000 });
    expect(response.body.message).toBe("Destinatário não encontrado!");
  });

  test("Testando rota de transferência para um usuário", async () => {
    const response = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({ usernameAddressee: "User 2", value: 1000 });
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("value");
    expect(response.body).toHaveProperty("debited");
    expect(response.body).toHaveProperty("credited");
    expect(response.body.credited).toBe("User 2");
    expect(response.body.value).toBe(10);
  });

  test("Testando rota de listagem de todas as transferências", async () => {
    const response = await request(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("createdAt");
    expect(response.body[0]).toHaveProperty("value");
    expect(response.body[0]).toHaveProperty("debited");
    expect(response.body[0]).toHaveProperty("credited");
    expect(response.body[0].value).toBe(10);
  });

  test("Testando rota de listagem de todas as transferências enviadas", async () => {
    const response = await request(app)
      .get("/transactions/cash-out")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("createdAt");
    expect(response.body[0]).toHaveProperty("value");
    expect(response.body[0]).toHaveProperty("credited");
    expect(response.body[0].value).toBe(10);
  });

  test("Testando rota de listagem de transferências recebidas", async () => {

    const loginUser2Resp = await request(app).post(`/login`).send({ username: "User 2", password: "Pass1234" });
    const tokenUser2 = loginUser2Resp.body.token;
    await request(app).post("/transactions").set("Authorization", `Bearer ${tokenUser2}`).send({ usernameAddressee: "User 1", value: 2000 });
    const response = await request(app).get("/transactions/cash-in").set("Authorization", `Bearer ${token}`);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("createdAt");
    expect(response.body[0]).toHaveProperty("value");
    expect(response.body[0]).toHaveProperty("debited");
    expect(response.body[0].value).toBe(20);
  });
});
