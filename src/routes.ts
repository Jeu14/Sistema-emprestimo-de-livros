import { Request, Response, Router } from "express";
import { registerUserController } from "./controllers/userControllers/RegisterUserController";
import { userLoginController } from "./controllers/userControllers/UserLoginController";
import { userDetails } from "./controllers/userControllers/UserDetailsController";
import { loginVerify } from "./middlewares/loginVerify";
import { updateUser } from "./controllers/userControllers/UpdateUserController";

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
    return res.json("tudo certo 1");
});

routes.post("/usuarios", new registerUserController().store);
routes.post("/usuario", new userLoginController().login);

routes.use(loginVerify);

routes.get("/usuario", new userDetails().index);
routes.put("/usuario", new updateUser().update);

export default routes;
