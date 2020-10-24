import simpleRouter from './utils/simple-router';
import TestPage from './test-page/test-page';
import LoginPage from './login/login-page';


simpleRouter
    .registerPage('test', new TestPage())
    .registerPage('login', new LoginPage());

simpleRouter.setPage('login');
