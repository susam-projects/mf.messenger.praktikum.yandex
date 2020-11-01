import "./ui/component-system/handlebars-helpers.js";
import Page404 from "./modules/error-pages/404/404.js";
import Page500 from "./modules/error-pages/500/500.js";
import ChatsPage from "./modules/chats/page/chats.js";
import EditProfilePage from "./modules/profile/edit-profile/page/edit-profile.js";
import ProfilePage from "./modules/profile/view-profile/page/profile.js";
import SignUpPage from "./modules/sign-up/page/sign-up.js";
import LoginPage from "./modules/login/page/login.js";
import { Router } from "./ui/component-system/router.js";
import Block from "./ui/component-system/block.js";
import createRedirect from "./ui/component-system/redirect.js";

const router = new Router("#app")
    .use("/", LoginPage as typeof Block)
    .use("/sign-up", SignUpPage as typeof Block)
    .use("/chats", ChatsPage as typeof Block)
    .use("/profile", ProfilePage as typeof Block)
    .use("/edit-profile", EditProfilePage as typeof Block)
    .use("/404", Page404 as typeof Block)
    .use("/500", Page500 as typeof Block)
    .use("/*", createRedirect("/404"));

router.start();

// if (await this._controller.isAuthorized()) {
//       this._router.go("/chats");
// }

// for dev
// @ts-ignore
window.__router = router;
