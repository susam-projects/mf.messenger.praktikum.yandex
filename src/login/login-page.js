import Block from '../utils/block';
import loginPageTemplate from './login.template.js';
import simpleRouter from '../utils/simple-router';

class LoginPage extends Block {
    constructor() {
        super('div', loginPageTemplate);
    }

    bindContent() {
        const loginButton = this.element.querySelector('#login-button');
        const notRegisteredButton = this.element.querySelector('#not-registered-button');

        loginButton.addEventListener('click', event => {
            event.preventDefault();
            // simpleRouter.setPage('chats');
        });

        notRegisteredButton.addEventListener('click', event => {
            event.preventDefault();
            // simpleRouter.setPage('sign-up');
        });
    }
}

export default LoginPage;
