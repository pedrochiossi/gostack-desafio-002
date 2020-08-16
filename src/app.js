
const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



app.get("/repositories", (request, response) => {
    return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;
  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0 
  }
  repositories.push(newRepository)
  return response.status(200).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const indexToUpdate = repositories.findIndex(rep => rep.id === id);
  if (indexToUpdate === -1 ) return response.status(400).json({ Error: `Could not find id ${id} on database` })

  const newRep = { id, title, url, techs, likes: repositories[indexToUpdate].likes }
  repositories.splice(indexToUpdate, 1, newRep);
  return response.status(200).json(newRep);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const indexToDelete = repositories.findIndex(rep => rep.id === id);
  if (indexToDelete === -1 ) {
    console.log('entrou');
    return response.status(400).send('Error');
  } 
  repositories.splice(indexToDelete, 1);
  return response.status(204).send('OK');
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const indexToLike = repositories.findIndex(rep => rep.id === id);
  if (indexToLike === -1 ) {
    console.log('entrou');
    return response.status(400).send('Error')
  } 
  repositories[indexToLike].likes += 1;
  return response.status(200).json(repositories[indexToLike]);
});

module.exports = app;
