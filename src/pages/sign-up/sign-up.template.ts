const signUpPageTemplate = `
  <main class="sign-up-page root">
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
          <div class="text-field__error-text">Неправильная почта</div>
        </article>
        <article class="text-field text-field_required margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Пароль
          </label>
          <input class="text-field__input" placeholder="&ge;6 символов, буквы и цифры" type="password" name="password" />
          <div class="text-field__error-text">Пароль должен быть: &ge;6 символов, буквы и цифры</div>
        </article>
        <article class="text-field text-field_required margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Пароль (ещё раз)
          </label>
          <input class="text-field__input" placeholder="Подтвердите пароль" type="password" name="confirm_password" />
          <div class="text-field__error-text">Пароли не совпадают</div>
        </article>
        <article class="text-field margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Имя
          </label>
          <input class="text-field__input" placeholder="Михаил" name="first_name" />
          <div class="text-field__error-text">Неправильное имя</div>
        </article>
        <article class="text-field margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Фамилия
          </label>
          <input class="text-field__input" placeholder="Нестеров" name="second_name" />
          <div class="text-field__error-text">Неправильная фамилия</div>
        </article>
        <article class="text-field margin-top-16">
          <label class="text-field__label">
            <span class="text-field__required-mark">*</span>
            Телефон
          </label>
          <input class="text-field__input" placeholder="+7 111 111 11 11" name="phone" />
          <div class="text-field__error-text">Неправильный телефон</div>
        </article>
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
