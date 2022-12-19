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
        const userTest = {username: "User 1", password: "Pass1234"};
        await request(app).post("/users/register").send(userTest);
        loginResp = await request(app).post(`/users/login`).send(userTest);
        token = loginResp.body.token;
      });
            
      afterAll(async () => {
          await connection.destroy();
      });

      test("Testando o acesso a conta do usuário", async () => {
        const response = await request(app).get("/accounts/user").set("Authorization", `Bearer ${token}`);
        expect(response.body).toHaveProperty('balance');
      })
    
      test("Testando o saldo inicial da conta do usuário", async () => {
        const response = await request(app).get("/accounts/user").set("Authorization", `Bearer ${token}`);
        expect(response.body.balance).toBe(100);
      })
    
  });
  