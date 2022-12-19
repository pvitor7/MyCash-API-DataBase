import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";
import createUserService from "../../service/users/createUser.service";

describe("Teste de rota de Clients", () => {
  let connection: DataSource;
  let token: string;
  
  beforeAll(async () => {
      await AppDataSource.initialize()
      .then((res) => {
          connection = res;
        })
        .catch((err) => {
            console.error("Erro durante a inicialização do banco de dados", err);
        });
    });
    
    afterAll(async () => {
        await connection.destroy();
    });

    test("Testando criação de usuário com nome inválido", async () => {
       const newUser = await request(app).post("/users/register").send({username: "U1", password: "Pass1234"});
        expect(newUser.body).toHaveProperty('message');
        expect(newUser.body.message).toBe('O nome de usuário deve ter no mínimo 3 caracteres');
    })
  
  
    test("Testando criação de usuário com senha inválida", async () => {
        const newUser = await request(app).post("/users/register").send({username: "TestPassword", password: "Pass"});
        expect(newUser.body).toHaveProperty('message');
        expect(newUser.body.message).toBe('A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e 8 caracteres!');
    })
    

    test("Testando a criação de um usuário", async () => {
        const newUser = await request(app).post("/users/register").send({username: "User 1", password: "Pass1234"});
        console.log(newUser.body);
        expect(newUser.body).toHaveProperty('id');
        expect(newUser.body.user).toBe('User 1');
        expect(newUser.body.balance).toBe(100);
    })


    test("Testando login com usuário inválido", async () => {
        const loginResp = await request(app).post(`/users/login`).send({username: "U9", password: "Pass1234"});
        expect(loginResp.body).toHaveProperty('message');
        expect(loginResp.body.message).toBe('O nome de usuário deve ter no mínimo 3 caracteres');
    })
    
    
    test("Testando login com senha inválida", async () => {
        const loginResp = await request(app).post(`/users/login`).send({username: "TestPassword", password: "Pass"});
        expect(loginResp.body).toHaveProperty('message');
        expect(loginResp.body.message).toBe('A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e 8 caracteres!');
    })

    test("Testando login", async () => {
        const loginResp = await request(app).post(`/users/login`).send({username: "User 1", password: "Pass1234"});
        expect(loginResp.body).toHaveProperty('token');
    })


});
