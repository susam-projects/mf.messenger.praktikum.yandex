const profilePageTemplate = `
  <main class="profile-page root">
    <section id="back-button" class="profile-page__back">
      <div class="profile-page__back__icon icon-back"></div>
    </section>
    <section class="profile-page__content">
      <article class="card profile-page__content-wrapper">
        <article class="avatar avatar-120 margin-top-40">ВТ</article>

        <article class="field-info margin-top-24">
          <h3>Логин</h3>
          <div class="field-info__value">username</div>
        </article>

        <article class="field-info margin-top-16">
          <h3>Отображаемое имя</h3>
          <div class="field-info__value">Василий Тёркин</div>
        </article>

        <article class="field-info margin-top-16">
          <h3>Имя</h3>
          <div class="field-info__value">---</div>
        </article>

        <article class="field-info margin-top-16">
          <h3>Фамилия</h3>
          <div class="field-info__value">---</div>
        </article>

        <article class="field-info margin-top-16">
          <h3>Телефон</h3>
          <div class="field-info__value">---</div>
        </article>

        <article class="field-info margin-top-16">
          <h3>Почта</h3>
          <div class="field-info__value">sample@mail.com</div>
        </article>

        <section class="profile-page__content__buttons margin-top-40 margin-bottom-24">
          <span id="edit-button">
            {{{editButton}}}
          </span>
          <span id="logout-button">
            {{{logoutButton}}}
          </span>
        </section>
      </article>
    </section>
  </main>
`;

export default profilePageTemplate;
