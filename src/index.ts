import "./utils/handlebars-helpers.js";
import SignUpPage from "./pages/sign-up/sign-up.js";
import simpleRouter from "./utils/simple-router.js";
import TestPage from "./pages/test-page/test-page.js";
import LoginPage from "./pages/login/login.js";

simpleRouter
    .registerPage("login", new LoginPage())
    .registerPage("sign-up", new SignUpPage())
    .registerPage("chats", new TestPage());

simpleRouter.setPage("sign-up");
