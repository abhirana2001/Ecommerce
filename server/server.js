import http from "http";
import app from "./app/app.js";

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, console.log(`server is up and running on port ${port}`));
