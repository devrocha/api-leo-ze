import express, { json } from "express";
import { v4 } from 'uuid'

const app = express();
const port = 3000;

app.use(json())  

const pessoas = [];

// CRUD -> CREATE (post) READ (get) UPDATE (put ou patch) DELETE (delete)

// raiz
app.get("/", (request, response) => {
  response.json('Opaaaa');
});

app.post("/add-pessoa", (req, res) => {
  const body = req.body

  pessoas.push({
    id: v4(),
    ...body
  })

  res.json(pessoas)
})

// req params = parametro enviado pelo client
app.put("/att-pessoa/:id", (req, res) => {
  const id = req.params.id
  const body = req.body

  const pessoa = pessoas.find((pessoa) => pessoa.id === id)
  const index = pessoas.findIndex((pessoa) => pessoa.id === id)

  console.log('pessoa', pessoa)
  console.log('body', body)

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

  pessoas.splice(index, 1)

  res.json(pessoas)
})

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
