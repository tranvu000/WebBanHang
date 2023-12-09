import express from "express";
import router from "./router/index.js";
import { MulterError } from "multer";
import { responseError } from "./app/Common/helpers.js";
import cors from 'cors';
import mongoDbConnect from "./database/mongodb.js";
import { createServer } from "http";
import { Server } from "socket.io";

mongoDbConnect();

const app = express();

app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: 'http://localhost:3000'
});

io.of('admins').on('connection', (socket) => {
  socket.join('room1');
  socket.on('client_send', (data) => {
    io.of('admins').to('room1').emit('server_send', { data: 'server send data ' + socket.id })
  })
})

app.use(express.json());
app.use(express.static("storage"));

router(app)

app.use((err, req, res, next) => {
  if(err instanceof MulterError) {
    return res.status(422).json(responseError(err, 422))
  }

  res.json(responseError(err))
});

const PORT = process.env.PORT || 5050;

httpServer.listen(PORT, () => {
  console.log("Server listrning on port: " + PORT);
});
