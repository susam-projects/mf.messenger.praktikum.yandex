const chatListTemplate = `
  <section class="chat-list {{className}}">
    <header class="chat-list__header">
      <section class="chat-list__header__controls">
        <div id="search-field" class="text-field-with-icon search-field">
          <input class="text-field-with-icon__input" placeholder="Поиск" name="search" />
          <div id="search" class="text-field-with-icon__icon-container">
            <div class="text-field-with-icon__icon search-field__icon"></div>
          </div>
        </div>
        {{{createChatButton}}}
      </section>
      <hr class="divider margin-top-16" />
    </header>

    <section class="chat-list__content">
      <nav>
        <ul>
          {{#each chats}}
            <li data-id="{{this.id}}">
              <div class="chat-info {{#if this.selected}} selected {{/if}}">
                <section class="chat-info__image-section badge-parent">
                  <div class="avatar avatar-24" style="background-image:url('{{this.avatar}}')">&nbsp;</div>
                  {{#if this.haveUnreadMessages}}
                    <div class="badge badge-top-right badge-danger-circle">{{this.unreadMessagesCount}}</div>
                  {{/if}}
                </section>
                <section class="chat-info__text-section">
                  <div class="chat-info__text-section__first-line">
                    <h3>{{this.title}}</h3>
                    <div class="chat-info__time">15:32</div>
                  </div>
                  <div class="chat-info__last-message">
                    Текст последнего сообщения, которое будем получать из чата
                  </div>
                </section>
              </div>
            </li>
          {{/each}}
        </ul>
      </nav>
    </section>

    <footer class="chat-list__footer">
      <hr class="divider" />
      <div id="user-info" class="user-info">
        <h2 class="user-info__name">{{userName}}</h2>
        <div class="user-info__avatar avatar avatar-48" style="background-image:url('{{userAvatar}}')"></div>
      </div>
    </footer>
  </section>
`;

export default chatListTemplate;
