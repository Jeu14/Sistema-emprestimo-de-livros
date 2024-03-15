import { Request, Response, Router } from "express";
// import { UserController } from "./controllers/UserController";
// import { User } from "./entities/User";
// import { userRepository } from "./repositories/userRepository";
// import { addresRepository } from "./repositories/addressRepository";
// import { roleRepository } from "./repositories/roleRepository";

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
    return res.json("tudo certo");
});

routes.post("/usuarios");

export default routes;
