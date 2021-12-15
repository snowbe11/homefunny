import express from "express";
import { proxyRequestDictionary } from "../api/restApiProxy";

const router = express.Router();

router.get("/hello", async (request, response) => {
  console.log("server hello");

  response.json({
    status: "success",
    payload: { message: "hello"},
  });
});

router.get("/openapi/", async (request, response) => {
  console.log("openapi");

  response.json({
    status: "success",
    payload: { message: "openapi ready"},
  });
});

router.get("/openapi/:word", async (request, response) => {
  const { word } = request.params;
  console.log(word);

  const json = await proxyRequestDictionary(word);

  response.json(json);
});

export default router;