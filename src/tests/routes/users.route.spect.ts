import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import AppDataSource from "../../data-source";

describe("Teste de rota de Clients", () => {
  let connection: DataSource;
  
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
        expect(newUser.body).toHaveProperty('id');
        expect(newUser.body.user).toBe('User 1');
        expect(newUser.body.balance).toBe(100);
    })

    test("Testando login com usuário inválido", async () => {
        const loginResp = await request(app).post(`/login`).send({username: "U9", password: "Pass1234"});
        expect(loginResp.body).toHaveProperty('message');
        expect(loginResp.body.message).toBe('O nome de usuário deve ter no mínimo 3 caracteres');
    })
    
    test("Testando login com senha inválida", async () => {
        const loginResp = await request(app).post(`/login`).send({username: "TestPassword", password: "Pass"});
        expect(loginResp.body).toHaveProperty('message');
        expect(loginResp.body.message).toBe('A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e 8 caracteres!');
    })

    test("Testando login", async () => {
        const loginResp = await request(app).post(`/login`).send({username: "User 1", password: "Pass1234"});
        expect(loginResp.body).toHaveProperty('token');
    })

    test("Testando GET de um usuário ", async ()=> {
        const responseUser = await request(app).post("/users/register").send({username: "User 3", password: "Pass1234"});
        const newUser = responseUser.body;
        const loginResp = await request(app).post(`/login`).send({username: "User 3", password: "Pass1234"});
        const token = loginResp.body.token;
        const response = await request(app).get(`/users/${newUser.id}`).set("Authorization", `Bearer ${token}`);
        expect(response.body.id).toBe(newUser.id)
        expect(response.body.user).toBe(newUser.username);
        expect(response.body).toHaveProperty('account');
        expect(response.body).not.toHaveProperty('password');
    }) 
    
    test("Testando GET de um usuário outro usuário", async ()=> {
        const loginResp = await request(app).post(`/login`).send({username: "User 3", password: "Pass1234"});
        const token = loginResp.body.token;
        const responseNotAuth = await request(app).post("/users/register").send({username: "Not Authorized", password: "NotAuthorized1234"});
        const userNotAuth = responseNotAuth.body;
        const resNotAuth = await request(app).get(`/users/${userNotAuth.id}`).set("Authorization", `Bearer ${token}`);
        expect(resNotAuth.body.message).toBe("Usuário não autorizado!");
        expect(resNotAuth.body).not.toHaveProperty('id')
        expect(resNotAuth.body).not.toHaveProperty('user');
        expect(resNotAuth.body).not.toHaveProperty('account');
     })


    test("Testando deleção de outro usuário", async ()=> {
        const loginResp = await request(app).post(`/login`).send({username: "User 3", password: "Pass1234"});
        const token = loginResp.body.token;
        const responseNotAuth = await request(app).post("/users/register").send({username: "Deleted Not Authorized", password: "DeletedNotAuthorized1234"});
        const userDeletedNotAuth = responseNotAuth.body;
        const resNotAuth = await request(app).delete(`/users/${userDeletedNotAuth.id}`).set("Authorization", `Bearer ${token}`);
        expect(resNotAuth.body.message).toBe("Usuário não autorizado!");
     })

     test("Testando deleção de um usuário com saldo na conta", async ()=> {
         const responseDelete = await request(app).post("/users/register").send({username: "Deleted Authorized", password: "DeletedAuthorized1234"});
        const userDeletedAuth = responseDelete.body;
        const loginResp = await request(app).post(`/login`).send({username: "Deleted Authorized", password: "DeletedAuthorized1234"});
        const tokenDeleted = loginResp.body.token;
        const resDeleted = await request(app).delete(`/users/${userDeletedAuth.id}`).set("Authorization", `Bearer ${tokenDeleted}`);
        expect(resDeleted.body.message).toEqual("O usuário ainda possui saldo em sua conta.");
     })


    test("Testando deleção de um usuário", async ()=> {
       const responseDelete = await request(app).post("/users/register").send({username: "DeletedUser", password: "DeletedUser1234"});
       const userDeletedAuth = responseDelete.body;
       const loginResp = await request(app).post(`/login`).send({username: "DeletedUser", password: "DeletedUser1234"});
       const tokenDeleted = loginResp.body.token;
       await request(app).post("/transactions").set("Authorization", `Bearer ${tokenDeleted}`).send({ usernameAddressee: "User 3", value: 10000 });
       const resDeleted = await request(app).delete(`/users/${userDeletedAuth.id}`).set("Authorization", `Bearer ${tokenDeleted}`);
       expect(resDeleted.body).toEqual({});
    
    
    })



    test("Testando atualização de senha", async () => {
       const newUserUpdate = await request(app).post("/users/register").send({username: "UserUpdate", password: "Pass1234"});
       const loginResp = await request(app).post(`/login`).send({username: "UserUpdate", password: "Pass1234"});
       const tokenUpdate: string = loginResp.body.token;
       const responseUpdated = await request(app).patch(`/users/${newUserUpdate.body.id}`).send({password: "updatedPassword1234"}).set("Authorization", `Bearer ${tokenUpdate}`);
        expect(responseUpdated.body.message).toBe('Senha atualizada com sucesso!');
     })

     test("Testando atualização com senha inválida", async () => {
        const newUserUpdate2 = await request(app).post("/users/register").send({username: "UserUpdate2", password: "Pass1234"});
        const loginResp2 = await request(app).post(`/login`).send({username: "UserUpdate2", password: "Pass1234"});
        const tokenUpdate2: string = loginResp2.body.token;
        const responseUpdated2 = await request(app).patch(`/users/${newUserUpdate2.body.id}`).send({password: "1234"}).set("Authorization", `Bearer ${tokenUpdate2}`);
        expect(responseUpdated2.body.message).toBe('A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e 8 caracteres!');
    })

    test("Testando atualização outro usuário", async ()=> {
        const newUserUpdate3 = await request(app).post("/users/register").send({username: "UserUpdate3", password: "Pass1234"});
        const loginResp2 = await request(app).post(`/login`).send({username: "UserUpdate2", password: "Pass1234"});
        const tokenUpdate2: string = loginResp2.body.token;
        const responseUpdated3 = await request(app).patch(`/users/${newUserUpdate3.body.id}`).send({password: "TesteUpdated1234"}).set("Authorization", `Bearer ${tokenUpdate2}`);
        expect(responseUpdated3.body.message).toBe('Usuário não autorizado!');
     })

});
