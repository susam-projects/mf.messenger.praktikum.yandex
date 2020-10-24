import simpleRouter from "./utils/simple-router.js";
import TestPage from "./pages/test-page/test-page.js";
import LoginPage from "./pages/login/login-page.js";

simpleRouter
    .registerPage("test", new TestPage())
    .registerPage("login", new LoginPage())
    .registerPage("chats", new TestPage())
    .registerPage("sign-up", new TestPage());

simpleRouter.setPage("login");
