const loginPageTemplate = `
  <main class="login-page root">
    <article class="card">
      <h1 class="login-page__title margin-top-24">Вход</h1>
      <form>
        <div id="username-field" class="margin-top-40">
          {{{userNameField}}}
        </div>
        <div id="password-field" class="margin-top-16">
          {{{passwordField}}}
        </div>

        <section class="login-page__buttons">
          <div id="login-button" class="login-page__button-container">
            {{{loginButton}}}
          </div>
          <div id="go-to-sign-up-button" class="login-page__button-container margin-top-16">
            {{{goToSignUpButton}}}
          </div>
        </section>
      </form>
    </article>
  </main>
`;

export default loginPageTemplate;
