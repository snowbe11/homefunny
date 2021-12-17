import express from "express";

const router = express.Router();

router.get("/hello", async (request, response) => {
  console.log("server hello");

  response.json({
    status: "success",
    payload: { message: "hi to client" },
  });
});

export default router;
