import "./ui/component-system/handlebars-helpers.js";
import Page404 from "./modules/404/404.js";
import Page500 from "./modules/500/500.js";
import ChatsPage from "./modules/chats/page/chats.js";
import EditProfilePage from "./modules/profile/edit-profile/page/edit-profile.js";
import ProfilePage from "./modules/profile/view-profile/page/profile.js";
import SignUpPage from "./modules/start-page/sign-up/page/sign-up.js";
import simpleRouter from "./ui/component-system/simple-router.js";
import LoginPage from "./modules/start-page/login/page/login.js";

simpleRouter
    .registerPage("login", new LoginPage())
    .registerPage("sign-up", new SignUpPage())
    .registerPage("chats", new ChatsPage())
    .registerPage("profile", new ProfilePage())
    .registerPage("edit-profile", new EditProfilePage())
    .registerPage("404", new Page404())
    .registerPage("500", new Page500());

simpleRouter.setPage("login");
