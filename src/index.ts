import "./index.scss";
import "./common/component-system/handlebars-helpers";
import Page404 from "./error-pages/404/404";
import Page500 from "./error-pages/500/500";
import ChatsPage from "./chats/page/chats";
import EditProfilePage from "./profile/edit-profile/page/edit-profile";
import ProfilePage from "./profile/view-profile/page/profile";
import SignUpPage from "./sign-up/page/sign-up";
import LoginPage from "./login/page/login";
import Router from "./common/component-system/router";
import Block from "./common/component-system/block";
import createRedirect from "./common/component-system/redirect";
import IndexController from "./index-controller";

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
