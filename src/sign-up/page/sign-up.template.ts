const signUpPageTemplate = `
  <main class="sign-up-page root">
    <article class="card">
      <h1 class="sign-up-page__title margin-top-24">Регистрация</h1>

      <form>
        <div class="margin-top-40">
          {{{loginField}}}
        </div>
        <div class="margin-top-16">
          {{{emailField}}}
        </div>
        <div class="margin-top-16">
          {{{phoneField}}}
        </div>
        <div class="margin-top-16">
          {{{passwordField}}}
        </div>
        <div class="margin-top-16">
          {{{confirmPasswordField}}}
        </div>
        <div class="margin-top-16">
          {{{firstNameField}}}
        </div>
        <div class="margin-top-16">
          {{{secondNameField}}}
        </div>
      </form>

      <section class="sign-up-page__buttons">
        {{{signUpButton}}}
        {{{goToLoginButton}}}
      </section>
    </article>
  </main>
`;

export default signUpPageTemplate;
