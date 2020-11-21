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
import createRedirect from "./common/component-system/redirect";
import IndexController from "./index-controller";

const controller = new IndexController();

const router = new Router("#app")
    .use("/", LoginPage)
    .use("/sign-up", SignUpPage)
    .use("/chats", ChatsPage)
    .use("/profile", ProfilePage)
    .use("/edit-profile", EditProfilePage)
    .use("/404", Page404)
    .use("/500", Page500)
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
