import { Router } from "express";
import authentication_controller from "../src/controllers/authentication_controller.js";
import { register_request } from "../src/controllers/requests/auth/register.js";
import { login_request } from "../src/controllers/requests/auth/login.js";
import auth_middleware from "../src/middlewares/auth_middleware.js";

const router = Router();

router.post('/login', login_request, authentication_controller.login);
router.post('/register', register_request, authentication_controller.register);
router.get('/me', auth_middleware, authentication_controller.me);
router.put('/refresh/:token', auth_middleware, authentication_controller.refresh);

export default router;