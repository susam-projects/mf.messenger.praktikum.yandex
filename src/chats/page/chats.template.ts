const chatPageTemplate = `
  <main class="chats-page prefer-menu root">
    {{{chatList}}}

    <section class="chats-page__chat chat {{#if (isNull chatId)}} chat_no-content {{/if}}">
      <section class="chat__no-content">
        <h2>Выберите или создайте чат</h2>
      </section>

      <section class="chat__content">
        <header class="chat__header">
          <section class="chat__header__top">
            <section class="chat__header__chat-info">
              <article class="avatar avatar-48"></article>
              <h1>{{chatTitle}}</h1>
            </section>
            <section class="chat__header__actions">
              {{{chatActionsButton}}}
              {{{chatActionsMenu}}}
            </section>
          </section>
          <hr class="divider" />
        </header>

        <section class="chat__messages">
          <ul class="chat__messages-container message-list">
            <li>
              <article class="message-list__date">
                <div class="message-list__date__text">23 июня</div>
                <hr class="divider" />
              </article>
            </li>

            <li class="message-container-my">
              <article class="message">
                <div class="message__bubble">
                  <div class="message__text">Some text</div>
                </div>
              </article>
              <article class="message-footer read">
                <div class="message-footer__icon left icon-check">&nbsp;</div>
                <div class="message-footer__time">12:37</div>
                <div class="message-footer__icon right icon-check">&nbsp;</div>
              </article>
            </li>

            <li class="message-container-my">
              <article class="message message-image">
                <div class="message__bubble">
                  <div class="message__image image-pair"></div>
                </div>
              </article>
              <article class="message-footer read">
                <div class="message-footer__icon left icon-check">&nbsp;</div>
                <div class="message-footer__time">12:37</div>
                <div class="message-footer__icon right icon-check">&nbsp;</div>
              </article>
            </li>

            <li class="message-container-my">
              <article class="avatar avatar-32">ВТ</article>
              <article class="message">
                <div class="message__bubble">
                  <div class="message__text">Some text</div>
                </div>
              </article>
              <article class="message-footer read">
                <div class="message-footer__icon left icon-check">&nbsp;</div>
                <div class="message-footer__time">12:37</div>
                <div class="message-footer__icon right icon-check">&nbsp;</div>
              </article>
            </li>

            <li class="message-container-other">
              <article class="avatar avatar-32"></article>
              <article class="message message-right">
                <div class="message__bubble">
                  <div class="message__text">
                    Some long text Some long text Some long text Some long text Some long text Some long text Some long
                    text Some long text Some long text
                  </div>
                </div>
              </article>
              <article class="message-footer read">
                <div class="message-footer__icon left icon-check">&nbsp;</div>
                <div class="message-footer__time">12:37</div>
                <div class="message-footer__icon right icon-check">&nbsp;</div>
              </article>
            </li>

            <li class="message-container-my">
              <article class="avatar avatar-32">ВТ</article>
              <article class="message">
                <div class="message__bubble">
                  <div class="message__text">Some t text</div>
                </div>
              </article>
              <article class="message-footer read">
                <div class="message-footer__icon left icon-check">&nbsp;</div>
                <div class="message-footer__time">12:37</div>
                <div class="message-footer__icon right icon-check">&nbsp;</div>
              </article>
            </li>

            <li class="message-container-other">
              <article class="avatar avatar-32"></article>
              <article class="message message-right">
                <div class="message__bubble">
                  <div class="message__text">Some Some text</div>
                </div>
              </article>
              <article class="message-footer">
                <div class="message-footer__icon left icon-check">&nbsp;</div>
                <div class="message-footer__time">12:37</div>
                <div class="message-footer__icon right icon-check">&nbsp;</div>
              </article>
            </li>
          </ul>
        </section>

        <section class="chat__control-panel">
          <section class="chat__control-panel__buttons">
            {{{smilesButton}}}
            {{{addDocumentButton}}}
            {{{addImageButton}}}
            {{{addVideoButton}}}
          </section>
          <section class="margin-top-16">
            <article id="message-field" class="text-field-with-icon message-field">
              <input class="text-field-with-icon__input" placeholder="Введите сообщение..." name="message" />
              <div id="send-message" class="text-field-with-icon__icon-container">
                <div class="text-field-with-icon__icon message-field__icon"></div>
              </div>
            </article>
          </section>
        </section>
      </section>
    </section>
    <section>{{{createChatModal}}}</section>
    <section>{{{deleteChatModal}}}</section>
    <section>{{{chatUsersModal}}}</section>
  </main>
`;

export default chatPageTemplate;
