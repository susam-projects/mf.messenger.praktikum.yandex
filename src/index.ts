import "./utils/handlebars-helpers.js";
import ChatsPage from "./pages/chats/chats.js";
import EditProfilePage from "./pages/edit-profile/edit-profile.js";
import ProfilePage from "./pages/profile/profile.js";
import SignUpPage from "./pages/sign-up/sign-up.js";
import simpleRouter from "./utils/simple-router.js";
import LoginPage from "./pages/login/login.js";

simpleRouter
    .registerPage("login", new LoginPage())
    .registerPage("sign-up", new SignUpPage())
    .registerPage("chats", new ChatsPage())
    .registerPage("profile", new ProfilePage())
    .registerPage("edit-profile", new EditProfilePage());

simpleRouter.setPage("login");
