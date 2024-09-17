import express from "express";
import apiRoutes from "./apiRoutes.js";
import { validateToken } from "./tokenValidation.js";
import internalRoutes from "./internalRoutes.js";

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/internal", internalRoutes);

app.use(validateToken);

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
