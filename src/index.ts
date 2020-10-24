import simpleRouter from './utils/simple-router.js';
import TestPage from './test-page/test-page.js';
import LoginPage from './login/login-page.js';

simpleRouter
    .registerPage('test', new TestPage())
    .registerPage('test-2', new TestPage())
    .registerPage('login', new LoginPage());

simpleRouter.setPage('login');
