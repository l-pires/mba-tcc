import app from './app.js';


const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
