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
        <article class="text-field text-field_error margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Пароль
          </label>
          <input class="text-field__input" placeholder="●●●●●●●●●●●" type="password" name="password" />
          <div class="text-field__error-text">Неправильный пароль</div>
        </article>

        <section class="login-page__buttons">
          <button id="login-button" class="button_primary">Авторизоваться</button>
          <button id="not-registered-button" class="text-button_primary margin-top-16">Нет аккаунта?</button>
        </section>
      </form>
    </article>
  </main>
`;

export default loginPageTemplate;
