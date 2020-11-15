const chatUsersTemplate = `
  <div class="chat-users">
    <section class="chat-users__search">
      {{{searchField}}}
    </section>
    <hr class="divider margin-top-16" />
    <section class="chat-users__user-list">
      <ul>
        {{#each users}}
          <li>
            <div class="chat-user">
              <section class="chat-user__image-section">
                <div class="avatar avatar-24">&nbsp;</div>
              </section>
              <section class="chat-user__text-section">
                <h3>{{this.name}}</h3>
                <div class="chat-user__role">
                  {{this.role}}
                </div>
              </section>
              <section class="chat-user__action-button">
                {{#if this.canRemove}}
                  <div class="chat-user__action-icon icon-remove-chat-user"></div>
                {{/if}}
                {{#if this.canAdd}}
                  <div class="chat-user__action-icon icon-add-chat-user"></div>
                {{/if}}
              </section>
            </div>
          </li>
        {{/each}}
      </ul>
    </section>
  </div>
`;

export default chatUsersTemplate;
