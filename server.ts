import express, { json, Request } from "express";
import { v4 } from 'uuid'

const app = express();
const port = 3000;

app.use(json())

interface IPessoas {
  id?: string
  nome: string
  idade: number
  altura: number
  temPet: string[]
}

const pessoas: IPessoas[] = [];

// CRUD -> CREATE (post) READ (get) UPDATE (put ou patch) DELETE (delete)

function validaPessoa(pessoa?: IPessoas, index?: number) {
  if (!pessoa || index == -1) {
    return "Pessoa não encontrada"
  }

  return pessoa
}

// raiz
// endpoints de api - rotas de api
app.get("/", (request, response) => {
  response.json(pessoas);
});

app.get("/pessoa-id/:id", (req, res) => {
  const id = req.params.id

  const pessoa = pessoas.find(item => item.id === id)

  const pessoaValidada = validaPessoa(pessoa)

  res.json(pessoaValidada)
})

app.post("/add-pessoa", (req: Request<any, any, Omit<IPessoas, 'id'>>, res) => {
  const body = req.body

  pessoas.push({
    id: v4(),
    ...body
  })

  res.json(pessoas)
})

// req params = parametro enviado pelo client
app.put("/att-pessoa/:id", (req: Request<any, any, Omit<IPessoas, 'id'>>, res) => {
  const id = req.params.id
  const body = req.body

  const pessoa = pessoas.find((pessoa) => pessoa.id === id)
  const index = pessoas.findIndex((pessoa) => pessoa.id === id)

  validaPessoa(pessoa, index)

  const novaPessoa = {
    ...pessoa,
    ...body
  }

  pessoas.splice(index, 1, novaPessoa)

  res.json(pessoas)
})

app.delete('/delete-pessoa/:id', (req, res) => {
  const id = req.params.id

  const index = pessoas.findIndex((pessoa) => pessoa.id === id)

  validaPessoa(undefined, index)

  pessoas.splice(index, 1)

  res.json(pessoas)
})

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
