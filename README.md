# Sistema empréstimo de livros

RESTful API, utilizando TypeScript, para administrar empréstimos de livros para alunos. A API contém as seguintes funcionalidades:

## Usuário do sistema

-   Cadastrar Usuário
-   Fazer Login
-   Detalhar Perfil do Usuário Logado
-   Editar Perfil do Usuário Logado

## Livros

-   Listar livros
-   Detalhar livro

## Alunos

-   Cadastrar Aluno
-   Listar Alunos
-   Detalhar aluno
-   Editar aluno
-   Remover aluno

# Empréstimos

-   Registrar empréstimo de um livro para um aluno
-   Devolver um livro emprestado ao aluno
-   Listar empréstimos
-   Detalhar empréstimo

## **Banco de dados**

Banco de Dados PostgreSQL chamado `emprestimos` contendo as seguintes tabelas e colunas:

-   usuarios

    -   id
    -   nome
    -   email (campo único)
    -   senha

-   livros

    -   id
    -   titulo
    -   autor
    -   descricao

-   alunos

    -   id
    -   nome
    -   email (campo único)

-   emprestimos

    -   id
    -   livro_id
    -   aluno_id
    -   devolvido


## **Endpoints**

### **Cadastrar usuário**

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

### **Login do usuário**

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, exigem o token de autenticação do usuário logado, recebido no header com o formato Bearer Token.

---

### **Detalhar usuário**

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

### **Atualizar usuário**

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

### **Listar livros**

#### **Exemplo de requisição**

```javascript
// GET /livros
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204

;[
    {
        id: 1,
        titulo: "O Hobbit",
        autor: "J.R.R. Tolkien",
        descricao: "Lançado em 1937...",
    },
    {
        id: 2,
        titulo: "1984",
        autor: "George Orwell",
        descricao: "Publicada originalmente em 1949...",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
;[]
```

### **Detalhar um livro**

#### **Exemplo de requisição**

```javascript
// GET /livro/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 2,
    "titulo": "1984",
    "autor": "George Orwell",
    "descricao": "Publicada originalmente em 1949...",
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Livro não encontrado."
}
```

### **Listar Alunos**

#### **Exemplo de requisição**

```javascript
// GET /alunos
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
;[
    {
        id: 1,
        nome: "Maria",
        email: "maria@email.com",
    },
    {
        id: 2,
        nome: "João",
        email: "joao@email.com",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
;[]
```

### **Detalhar um aluno**

#### **Exemplo de requisição**

```javascript
// GET /aluno/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 2,
    "nome": "João",
    "email": "joao@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Aluno(a) não encontrado(a)."
}
```

### **Cadastrar Aluno**

#### **Exemplo de requisição**

```javascript
// POST /alunos
{
    "nome": "Maria",
    "email": "maria@email.com"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "Maria",
    "email": "maria@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já existe para outro aluno."
}
```

### **Atualizar Aluno**

#### **Exemplo de requisição**

```javascript
// PUT /alunos/1
{
	"nome": "Maria",
    "email": "maria@email.com"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já existe para outro aluno."
}
```

### **Excluir Aluno**

#### **Exemplo de requisição**

```javascript
// DELETE /alunos/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Aluno não encontrado."
}
```

### **Emprestar um livro para um aluno**

#### **Exemplo de requisição**

```javascript
// POST /emprestimos
{
	"livro_id": 6,
	"aluno_id": 1
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
	"id": 5,
	"aluno_id": 1,
	"livro_id": 6,
	"devolvido": false
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O livro informado já está emprestado para outro aluno."
}
```

### **Devolver um livro**

#### **Exemplo de requisição**

```javascript
// PATCH /emprestimos/:id
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O empréstimo informado já houve a devolução anteriormente."
}
```

### **Listar Empréstimos**

#### **Exemplo de requisição**

```javascript
// GET /emprestimos
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
;[
    {
        id: 1,
        devolvido: false,
        aluno: {
            id: 1,
            nome: "João",
            email: "joao@email.com",
        },
        livro: {
            id: 1,
            titulo: "O Hobbit",
            autor: "J.R.R. Tolkien",
            descricao: "Lançado em 1937...",
        },
    },
    {
        id: 2,
        devolvido: false,
        aluno: {
            id: 2,
            nome: "Maria",
            email: "maria@email.com",
        },
        livro: {
            id: 2,
            titulo: "1984",
            autor: "George Orwell",
            descricao: "Publicada originalmente em 1949...",
        },
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
;[]
```

### **Detalhar um empréstimo**

#### **Exemplo de requisição**

```javascript
// GET /emprestimos/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    id: 2,
    devolvido: false,
    aluno: {
        id: 2,
        nome: "Maria",
        email: "maria@email.com",
    },
    livro: {
        id: 2,
        titulo: "1984",
        autor: "George Orwell",
        descricao: "Publicada originalmente em 1949...",
    },
},
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Empréstimo não encontrado."
}
```

---