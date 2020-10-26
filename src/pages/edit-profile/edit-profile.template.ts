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
          <div id="login-field">
            {{{loginField}}}
          </div>
          <div id="display-name-field" class="margin-top-8">
            {{{displayNameField}}}
          </div>
          <div id="first-name-field" class="margin-top-8">
            {{{firstNameField}}}
          </div>
          <div id="second-name-field" class="margin-top-8">
            {{{secondNameField}}}
          </div>
          <div id="phone-field" class="margin-top-8">
            {{{phoneField}}}
          </div>
          <div id="email-field" class="margin-top-8">
            {{{emailField}}}
          </div>
          <div id="old-password-field" class="margin-top-8">
            {{{oldPasswordField}}}
          </div>
          <div id="new-password-field" class="margin-top-8">
            {{{newPasswordField}}}
          </div>
          <div id="confirm-password-field" class="margin-top-8">
            {{{confirmPasswordField}}}
          </div>
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
