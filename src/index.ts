import "./common/component-system/handlebars-helpers.js";
import Page404 from "./error-pages/404/404.js";
import Page500 from "./error-pages/500/500.js";
import ChatsPage from "./chats/page/chats.js";
import EditProfilePage from "./profile/edit-profile/page/edit-profile.js";
import ProfilePage from "./profile/view-profile/page/profile.js";
import SignUpPage from "./sign-up/page/sign-up.js";
import LoginPage from "./login/page/login.js";
import Router from "./common/component-system/router.js";
import Block from "./common/component-system/block.js";
import createRedirect from "./common/component-system/redirect.js";
import IndexController from "./index-controller.js";

const controller = new IndexController();

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

// give router some time to go to initial page
setTimeout(async () => {
    const isStartPage = router.currentRoute === "/" || router.currentRoute === "/sign-up";
    const isAuthorized = await controller.isAuthorized();
    if (isStartPage && isAuthorized) {
        router.go("/chats");
    }
    if (!isAuthorized) {
        router.go("/");
    }
}, 100);

// for dev
// @ts-ignore
window.__router = router;
