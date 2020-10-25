const chatPageTemplate = `
  <main class="chats-page prefer-menu root">
    <article class="chats-page__left-menu chat-list">
      <header class="chat-list__header">
        <section class="chat-list__header__controls">
          <article id="search-field" class="text-field-with-icon search-field">
            <input class="text-field-with-icon__input" placeholder="Поиск" name="search" />
            <div id="search" class="text-field-with-icon__icon-container">
              <div class="text-field-with-icon__icon search-field__icon"></div>
            </div>
          </article>
          <button class="icon-button">
            <span class="icon-button__icon icon-plus"></span>
          </button>
        </section>
        <hr class="divider margin-top-16" />
      </header>

      <section class="chat-list__content">
        <nav>
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
            <li>
              <article class="chat-info selected">
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
            <li>
              <article class="chat-info">
                <section class="chat-info__image-section badge-parent">
                  <div class="avatar avatar-24">&nbsp;</div>
                  <div class="badge badge-top-right badge-danger-circle">3</div>
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
        </nav>
      </section>

      <footer class="chat-list__footer">
        <hr class="divider" />
        <article id="user-info" class="user-info">
          <h2 class="user-info__name">Василий Тёркин</h2>
          <div class="user-info__avatar avatar avatar-48">ВТ</div>
        </article>
      </footer>
    </article>

    <article class="chats-page__chat chat">
      <header class="chat__header">
        <section class="chat__header__top">
          <section class="chat__header__chat-info">
            <article class="avatar avatar-48"></article>
            <h1>Название чата</h1>
          </section>
          <section class="chat__header__actions">
            <button class="icon-button">
              <span class="icon-button__icon icon-vertical-dots"></span>
            </button>
            <nav class="menu chat__header__actions-menu">
              <article class="card card-lite">
                <ul>
                  <li class="menu__item">
                    <span class="menu__item__icon icon-edit"></span>
                    <span>Редактировать</span>
                  </li>
                  <li class="menu__item">
                    <span class="menu__item__icon icon-user-group"></span>
                    <span>Управлять участниками</span>
                  </li>
                  <li class="menu__item">
                    <span class="menu__item__icon icon-lock"></span>
                    <span>Задать пароль</span>
                  </li>
                  <li class="menu__item menu__item-danger">
                    <span class="menu__item__icon icon-trash"></span>
                    <span>Удалить</span>
                  </li>
                </ul>
              </article>
            </nav>
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
          <button class="icon-button">
            <span class="icon-button__icon icon-smile"></span>
          </button>
          <button class="icon-button">
            <span class="icon-button__icon icon-document"></span>
          </button>
          <button class="icon-button">
            <span class="icon-button__icon icon-image"></span>
          </button>
          <button class="icon-button">
            <span class="icon-button__icon icon-video"></span>
          </button>
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
    </article>
  </main>
`;

export default chatPageTemplate;
