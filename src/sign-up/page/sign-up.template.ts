const signUpPageTemplate = `
  <main class="sign-up-page root">
    <article class="card">
      <h1 class="sign-up-page__title margin-top-24">Регистрация</h1>

      <form>
        <div id="login-field" class="margin-top-40">
          {{{loginField}}}
        </div>
        <div id="email-field" class="margin-top-16">
          {{{emailField}}}
        </div>
        <div id="phone-field" class="margin-top-16">
          {{{phoneField}}}
        </div>
        <div id="password-field" class="margin-top-16">
          {{{passwordField}}}
        </div>
        <div id="confirm-password-field" class="margin-top-16">
          {{{confirmPasswordField}}}
        </div>
        <div id="first-name-field" class="margin-top-16">
          {{{firstNameField}}}
        </div>
        <div id="second-name-field" class="margin-top-16">
          {{{secondNameField}}}
        </div>
      </form>

      <section class="sign-up-page__buttons">
        <div id="sign-up-button" class="sign-up-page__button-container">
          {{{signUpButton}}}
        </div>
        <div id="go-to-login-button" class="sign-up-page__button-container margin-top-16">
          {{{goToLoginButton}}}
        </div>
      </section>
    </article>
  </main>
`;

export default signUpPageTemplate;
