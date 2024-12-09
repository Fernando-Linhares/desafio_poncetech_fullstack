import { Router } from "express";
import health_check_controller from "../src/controllers/health_check_controller.js";
import auth_middleware from "../src/middlewares/auth_middleware.js";
import person_crud_controller from "../src/controllers/person_crud_controller.js";
import { person_request } from "../src/controllers/requests/person.js";

const router = Router();

router.get('/', health_check_controller);

router.get('/person', auth_middleware, person_crud_controller.index)
router.post('/person', auth_middleware, person_request, person_crud_controller.create);
router.get('/person/:id', auth_middleware, person_crud_controller.show);
router.put('/person/:id', auth_middleware, person_crud_controller.update);
router.delete('/person/:id', auth_middleware, person_crud_controller.delete);

export default router;