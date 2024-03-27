import { Request, Response, Router } from "express";
import { registerUserController } from "./controllers/RegisterUserController";
import { userLoginController } from "./controllers/UserLoginController";
import { userDetails } from "./controllers/UserDetailsController";
import { loginVerify } from "./middlewares/loginVerify";
import { updateUser } from "./controllers/UpdateUserController";

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
    return res.json("tudo certo 1");
});

routes.post("/usuarios", new registerUserController().store);
routes.post("/usuario", new userLoginController().login)

routes.use(loginVerify)

routes.get("/usuario", new userDetails().index)
routes.put("/usuario", new updateUser().update)

export default routes;
