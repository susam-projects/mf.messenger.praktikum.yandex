const loginPageTemplate = `
  <main class="login-page root">
    <article class="card">
      <h1 class="login-page__title margin-top-24">Вход</h1>
      <form>
        <article class="text-field margin-top-40">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Логин
          </label>
          <input class="text-field__input" placeholder="username" name="login" />
          <div class="text-field__error-text">Неправильный логин</div>
        </article>
        <article class="text-field margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Пароль
          </label>
          <input class="text-field__input" placeholder="●●●●●●●●●●●" type="password" name="password" />
          <div class="text-field__error-text">Пароль должен быть: &ge;6 символов, буквы и цифры</div>
        </article>

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
