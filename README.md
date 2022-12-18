<h1 align="center">
  MyCash
</h1>

<p align = "center">
Projeto backend para a aplicação MyCash - uma aplicação onde é possível se cadastrar e realizar transações financeiras e gerar um registro das mesmas. Cada usuário pode se cadastrar utilizando um nome de usuário e uma senha, e automaticamente é criada uma conta vinculada a seu nome com um saldo inicial. Assim ele pode realizar transferências para outros usuários cadastrados utilizando o username do destinatário.
O projeto faz a criação do banco de dados com as tabelas necessárias. E a criação de uma API para criação e leitura de usuários e suas transferências.
</p>

<blockquote align="center"></blockquote>

<h3 align= "center">
  Tecnologias&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</h3>

<p align="center" >
  As tecnologias utilizadas no projeto foram: Typescript | PostgreSQL | Express | Typeorm | Repository Pattern | Class Transformer | Error Global | Docker.
</p>

A API possui 7 Eendpoints, sendo os principais de criação de usuário, transferência e leitura de seus históricos.

<br />
<br />

<h3 align= "center">
  Instruções para instalação da aplicação&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</h3>

Para a instalação das dependencias do projeto, o usuário deve acessar a pasta raiz, e no terminal utilizar o comando de execução dos gerenciador de dependências utilizado. 

YARN: - yarn install <br/>

Após as instalações, é necessário criar os containers, utilizando o seguinte comando:

- docker-compose up

O próximo passo é rodar as migrations, comandos que geram as tabelas necessárias no banco de dados.
Essas migrations devem ser executadas dentro do container da api. 

<br />

Em outro terminal rode os seguintes comandos:

- docker exec api yarn typeorm migration:generate src/migrations/createTable -d src/data-source.ts
- docker exec api yarn typeorm migration:run -d src/data-source.ts

<br />

A api também possui testes, que podem ser rodados com o comando:

- docker exec api yarn test


<br />
<br />

## **Endpoints**

## Rotas do Usuário

```json
[{ "baseurl": "https://localhost:3000" }]
```

<h2 align ='center'> Criando um Usuário </h2>

`POST /users/register`

```json
{
  {
  "username": "User 1",
	"password": "Pass0123"
  }
}
```

<h2 align ='center'> Resposta de sucesso </h2>

`FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"id": "1a9f73d7-ebbb-4416-9637-2730c386ebb9",
	"username": "User 1",
	"account": {
		"id": 1
	}
}
```


<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo inválido, como a senha no exemplo da resposta abaixo, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "message": "A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um    número e 8 caracteres!"
}
```

Caso o usuário já exista.

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Já existe um usuário com este username."
}
```

<h2 align ='center'> Realizando uma transferência </h2>
Para o envio de uma transferência deve ser informado um nome de usuário e o valor a ser transferido. O valor deve ser no mínimo de 3 números, incluindo os centavos.

`POST /transactions`

```json
{
	"usernameAddressee": "Destinatário",
	"value": 100
}
```

<h2 align ='center'> Resposta de sucesso </h2>

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"transferId": 3,
	"createdAt": "Tue Nov 22 2022 11:32:43 GMT+0000 (Coordinated Universal Time)",
	"value": "1.00",
	"debitedUser": "User 1",
	"creditedUser": "Destinatário"
}
```

Caso não haja saldo suficiente.

`FORMATO DA RESPOSTA - STATUS 406`

```json
{
  "Error": "Saldo insuficiente para transferência."
}
```

<h2 align ='center'> Listando transferências </h2>

Listar todas as transferências.

`GET /transactions - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": 1,
		"value": "1.00",
		"createdAt": "2022-11-20T21:50:04.553Z",
		"debitedAccountId": {
			"id": 1
		},
		"creditedAccountId": {
			"id": 2
		}
	},
	{
		"id": 2,
		"value": "1.00",
		"createdAt": "2022-11-20T21:50:23.502Z",
		"debitedAccountId": {
			"id": 2
		},
		"creditedAccountId": {
			"id": 1
		}
	}
]
```

Também é possível istar transferências por enviadas (cash-out) e recebidas (cash-in).

`GET - category/cash-in` ou `category/cash-out  - FORMATO DA RESPOSTA - STATUS 200` 
 

```json
[
	{
		"id": 1,
		"value": "1.00",
		"createdAt": "2022-11-20T21:50:04.553Z",
		"debitedAccountId": {
			"id": 1
		},
		"creditedAccountId": {
			"id": 2
		}
	},
	{
		"id": 2,
		"value": "1.00",
		"createdAt": "2022-11-20T21:50:23.502Z",
		"debitedAccountId": {
			"id": 2
		},
		"creditedAccountId": {
			"id": 1
		}
	}
]
```

Também é possível existe o filtro de transferências por data. Que pode ser feito com o modelo abaixo.

`POST /transactions/category`

```json
{
	"day": 22,
	"month": 11,
	"age": 2022
}
```

`FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": 3,
		"value": "1.00",
		"createdAt": "2022-11-22T11:32:43.368Z",
		"debitedAccountId": {
			"id": 3
		},
		"creditedAccountId": {
			"id": 4
		}
	},
	{
		"id": 4,
		"value": "20.00",
		"createdAt": "2022-11-22T12:08:51.649Z",
		"debitedAccountId": {
			"id": 3
		},
		"creditedAccountId": {
			"id": 4
		}
	}
]
```

Caso seja informado um ano maior do que o atual, a resposta será assim.

`FORMATO DA RESPOSTA - STATUS 406`

```json
{
  "message": "O ano não pode ser maior do que o atual!"
}
```

