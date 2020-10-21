const signUpPageTemplate = `
  <link rel="stylesheet" href="../fonts/latofonts.css" />
  <link rel="stylesheet" href="../utils/reset.css" />
  <link rel="stylesheet" href="../components/layout.css" />
  <link rel="stylesheet" href="../components/text-field.css" />
  <link rel="stylesheet" href="../components/button.css" />
  <link rel="stylesheet" href="../components/card.css" />
  <link rel="stylesheet" href="./sign-up/sign-up.css" />

  <main class="sign-up-page">
    <article class="card">
      <h1 class="sign-up-page__title margin-top-24">Регистрация</h1>

      <form>
        <article class="text-field text-field_required margin-top-40">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Логин
          </label>
          <input class="text-field__input" placeholder="username" name="login" />
          <div class="text-field__error-text">Неправильный логин</div>
        </article>
        <article class="text-field text-field_required margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Почта
          </label>
          <input class="text-field__input" placeholder="email@example.com" type="email" name="email" />
          <div class="text-field__error-text">Неправильный email</div>
        </article>
        <article class="text-field text-field_required margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Пароль
          </label>
          <input class="text-field__input" placeholder="Буквы и цифры" type="password" name="password" />
          <div class="text-field__error-text">Неправильный пароль</div>
        </article>
        <article class="text-field text-field_required margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Пароль (ещё раз)
          </label>
          <input class="text-field__input" placeholder="Подтвердите пароль" type="password" name="confirm_password" />
          <div class="text-field__error-text">Неправильный пароль</div>
        </article>
        <article class="text-field margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Имя
          </label>
          <input class="text-field__input" placeholder="Михаил" name="first_name" />
          <div class="text-field__error-text">Неправильный пароль</div>
        </article>
        <article class="text-field margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Фамилия
          </label>
          <input class="text-field__input" placeholder="Нестеров" name="second_name" />
          <div class="text-field__error-text">Неправильный пароль</div>
        </article>
        <article class="text-field margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Телефон
          </label>
          <input class="text-field__input" placeholder="+7 111 111 11 11" name="phone" />
          <div class="text-field__error-text">Неправильный пароль</div>
        </article>
      </form>

      <section class="sign-up-page__buttons">
        <button class="button_primary" id="sign-up">Зарегистрироваться</button>
        <button class="text-button_primary margin-top-16">Войти</button>
      </section>
    </article>
  </main>
  <script src="../utils/serialize.js"></script>
  <script src="./sign-up.js"></script>
`;
