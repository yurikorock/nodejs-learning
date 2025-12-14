import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.send('Hello, Express');
});

app.get('/students/:id', (req, res) => {
  console.log(req.params.id);
  res.json({
    status: 200,
    message: 'Successfully get student',
    data: { id: req.params.id },
  });
});

export default app;
