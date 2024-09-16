import express from "express";
import routes from "./routes.js";

const app = express();

const port = Number(process.env.PORT) || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
