const loginPageTemplate = `
  <main class="login-page root">
    <article class="card">
      <h1 class="login-page__title margin-top-24">Вход</h1>
      <form>
        <div class="margin-top-40">
          {{{userNameField}}}
        </div>
        <div class="margin-top-16">
          {{{passwordField}}}
        </div>

        <section class="login-page__buttons">
          {{{loginButton}}}
          {{{goToSignUpButton}}}
        </section>
      </form>
    </article>
  </main>
`;

export default loginPageTemplate;
