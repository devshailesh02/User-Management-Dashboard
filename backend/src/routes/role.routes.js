import express from "express";

const router = express.Router();

router.use(express.json({ limit: "20kb" }));

export default router;
