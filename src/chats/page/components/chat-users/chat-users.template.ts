const chatUsersTemplate = `
  <div class="chat-users">
    <section class="chat-users__search">
      <article class="text-field-with-icon search-field">
        <input class="text-field-with-icon__input" placeholder="Поиск" name="search" />
        <div id="search" class="text-field-with-icon__icon-container">
          <div class="text-field-with-icon__icon search-field__icon"></div>
        </div>
      </article>
    </section>
    <hr class="divider margin-top-16" />
    <section class="chat-users__user-list">
      <ul>
        <li>
          <article class="chat-info">
            <section class="chat-info__image-section">
              <div class="avatar avatar-24">&nbsp;</div>
            </section>
            <section class="chat-info__text-section">
              <div class="chat-info__text-section__first-line">
                <h3>Название чата</h3>
                <div class="chat-info__time">15:32</div>
              </div>
              <div class="chat-info__last-message">
                Текст какого-то сообщения, которое было последним в этом чате
              </div>
            </section>
          </article>
        </li>
      </ul>
    </section>
  </div>
`;

export default chatUsersTemplate;
