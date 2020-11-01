const profilePageTemplate = `
  <main class="profile-page root">
    <section id="back-line" class="profile-page__back">
      <div class="profile-page__back__icon icon-back"></div>
    </section>
    <section class="profile-page__content">
      <article class="card profile-page__content-wrapper">
        <article class="avatar avatar-120 margin-top-40">ВТ</article>

        <div id="login" class="margin-top-24">
            {{{loginField}}}
        </div>

        <div id="display-name" class="margin-top-16">
            {{{displayNameField}}}
        </div>

        <div id="first-name" class="margin-top-16">
            {{{firstNameField}}}
        </div>

        <div id="second-name" class="margin-top-16">
            {{{secondNameField}}}
        </div>

        <div id="phone" class="margin-top-16">
            {{{phoneField}}}
        </div>

        <div id="email" class="margin-top-16">
            {{{emailField}}}
        </div>

        <section class="profile-page__content__buttons margin-top-40 margin-bottom-24">
          <div id="edit-button">
            {{{editButton}}}
          </div>
          <div id="logout-button">
            {{{logoutButton}}}
          </div>
        </section>
      </article>
    </section>
  </main>
`;

export default profilePageTemplate;
