import { Router } from "express";
import { registerUserController } from "./controllers/userControllers/RegisterUserController";
import { userLoginController } from "./controllers/userControllers/UserLoginController";
import { userDetails } from "./controllers/userControllers/UserDetailsController";
import { loginVerify } from "./middlewares/loginVerify";
import { updateUser } from "./controllers/userControllers/UpdateUserController";
import { listBooks } from "./controllers/bookControllers/listBooksController";
import { booksDetails } from "./controllers/bookControllers/bookDetailsController";
import { listStudents } from "./controllers/studentControllers/listStudemtsController";
import { studentDetails } from "./controllers/studentControllers/studentDetailsController";
import { registerStudent } from "./controllers/studentControllers/registerStudent";
import { studentUpdate } from "./controllers/studentControllers/updateStudentController";
import { deleteStudent } from "./controllers/studentControllers/deleteStudentController";
import { lendBook } from "./controllers/loanControllers/lendBookController";
import { returnBook } from "./controllers/loanControllers/returnBookController";

const routes = Router();

routes.post("/usuarios", new registerUserController().store);
routes.post("/usuario", new userLoginController().login);

routes.use(loginVerify);

routes.get("/usuario", new userDetails().index);
routes.put("/usuario", new updateUser().update);

routes.get("/livros", new listBooks().list)
routes.get("/livro/:id", new booksDetails().index)

routes.get("/alunos", new listStudents().list)
routes.get("/aluno/:id", new studentDetails().index)
routes.post("/aluno", new registerStudent().store)
routes.put("/aluno/:id", new studentUpdate().update)
routes.delete("/aluno/:id", new deleteStudent().delete)

routes.post("/emprestimos", new lendBook().loan)
routes.patch("/emprestimos/:id", new returnBook().loan)

export default routes;  
