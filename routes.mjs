import { resolve } from "path";
import db from "./models/index.mjs";
import passport from "passport";

import initTestController from "./controllers/testController.mjs"; // TEST - TO REMOVE
import initUserController from "./controllers/users.mjs";
import initTransactionController from "./controllers/transactions.mjs";

export default function routes(app) {
  // TEST - TO REMOVE
  const TestController = initTestController(db);
  app.get("/test", TestController.test);

  const UserController = initUserController(db);
  app.post("/login", UserController.login);
  app.post("/signup", UserController.signup);
  app.delete("/logout", UserController.logout);

  const TransactionController = initTransactionController(db);
  app.get(
    "/transactions",
    passport.authenticate("jwt", { session: false }),
    TransactionController.index
  );

  // test protected route
  app.get(
    "/protected",
    passport.authenticate("jwt", { session: false }),
    TestController.test
  );

  // special JS page. Include the webpack index.html file
  app.get("/home", (request, response) => {
    response.sendFile(resolve("dist", "main.html"));
  });
}
