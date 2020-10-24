const loginPageTemplate = `
  <link rel="stylesheet" href="../fonts/latofonts.css" />
  <link rel="stylesheet" href="../utils/reset.css" />
  <link rel="stylesheet" href="../components/layout.css" />
  <link rel="stylesheet" href="../components/text-field.css" />
  <link rel="stylesheet" href="../components/button.css" />
  <link rel="stylesheet" href="../components/card.css" />
  <link rel="stylesheet" href="./login/login.css" />

  <main class="login-page">
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
          <button id="login" class="button_primary">Авторизоваться</button>
          <button class="text-button_primary margin-top-16">Нет аккаунта?</button>
        </section>
      </form>
    </article>
  </main>
  <script src="../utils/serialize.js"></script>
  <script src="./login.js"></script>
`;