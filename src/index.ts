import "dotenv/config";
import "express-async-errors";
import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import routes from "./routes";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
    .then(() => {
        const app = express();

        app.use(express.json());
        app.use(routes);

        app.use(errorMiddleware);
        const port = process.env.DB_PORT as number | undefined;
        return app.listen(port);
    })
    .catch((error) => {
        console.log(error);
    });
