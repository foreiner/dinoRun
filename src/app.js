import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket';

const app = express();
const server = createServer(app);

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
initSocket(server);

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});