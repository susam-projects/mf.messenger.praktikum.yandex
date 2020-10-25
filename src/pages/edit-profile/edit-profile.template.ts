const editProfilePageTemplate = `
  <main class="edit-profile-page root">
    <article class="card edit-profile-page__content-wrapper">
      <form class="edit-profile-page__form-wrapper">
        <label>
          <article class="avatar avatar-empty avatar-120 margin-top-40 edit-profile-page__avatar">
            <article class="icon icon-96 icon-upload">&nbsp;</article>
          </article>
          <input type="file" class="edit-profile-page__avatar-input" name="avatar" />
        </label>

        <section class="edit-profile-page__inputs margin-top-24">
          <article class="text-field">
            <label class="text-field__label">
              <span class="text-field__required-mark">*</span>
              Логин
            </label>
            <input class="text-field__input" placeholder="username" value="username" name="login" />
            <div class="text-field__error-text">Неправильный логин</div>
          </article>

          <article class="text-field margin-top-8">
            <label class="text-field__label">
              <span class="text-field__required-mark">*</span>
              Отображаемое имя
            </label>
            <input class="text-field__input" placeholder="username" value="Василий Тёркин" name="display_name" />
            <div class="text-field__error-text">Неправильное отображаемое имя</div>
          </article>

          <article class="text-field margin-top-8">
            <label class="text-field__label">
              <span class="text-field__required-mark">*</span>
              Имя
            </label>
            <input class="text-field__input" placeholder="Михаил" name="first_name" />
            <div class="text-field__error-text">Неправильное имя</div>
          </article>

          <article class="text-field margin-top-8">
            <label class="text-field__label">
              <span class="text-field__required-mark">*</span>
              Фамилия
            </label>
            <input class="text-field__input" placeholder="Нестеров" name="second_name" />
            <div class="text-field__error-text">Неправильная фамилия</div>
          </article>

          <article class="text-field margin-top-8">
            <label class="text-field__label">
              <span class="text-field__required-mark">*</span>
              Телефон
            </label>
            <input class="text-field__input" placeholder="+7 111 111 11 11" name="phone" />
            <div class="text-field__error-text">Неправильный телефон</div>
          </article>

          <article class="text-field margin-top-8">
            <label class="text-field__label">
              <span class="text-field__required-mark">*</span>
              Почта
            </label>
            <input class="text-field__input" placeholder="email@example.com" type="email" name="email" />
            <div class="text-field__error-text">Неправильная почта</div>
          </article>

          <article class="text-field margin-top-8">
            <label class="text-field__label">
              <span class="text-field__required-mark">*</span>
              Пароль
            </label>
            <input class="text-field__input" placeholder="●●●●●●●●●●●" type="password" name="oldPassword" />
            <div class="text-field__error-text">Пароль должен быть: &ge;6 символов, буквы и цифры</div>
          </article>

          <article class="text-field margin-top-8">
            <label class="text-field__label">
              <span class="text-field__required-mark">*</span>
              Новый Пароль
            </label>
            <input class="text-field__input" placeholder="&ge;6 символов, буквы и цифры" type="password" name="newPassword" />
            <div class="text-field__error-text">Пароль должен быть: &ge;6 символов, буквы и цифры</div>
          </article>

          <article class="text-field margin-top-8">
            <label class="text-field__label">
              <span class="text-field__required-mark">*</span>
              Новый Пароль (ещё раз)
            </label>
            <input
              class="text-field__input"
              placeholder="Подтвердите пароль"
              type="password"
              name="confirmPassword"
            />
            <div class="text-field__error-text">Пароли не совпадают</div>
          </article>
        </section>

        <section class="edit-profile-page__buttons margin-top-40 margin-bottom-8">
          <div id="save-button">{{{saveButton}}}</div>
          <div id="cancel-button">{{{cancelButton}}}</div>
        </section>
      </form>
    </article>
  </main>
`;

export default editProfilePageTemplate;
