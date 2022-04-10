const router = require('express').Router();
import { UserController } from "../controllers";

router.post(
    "/login",
    UserController.login
  );