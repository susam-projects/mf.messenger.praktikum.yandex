const chatUsersTemplate = `
  <div class="chat-users">
    <section class="chat-users__search">
      {{{searchField}}}
    </section>
    <hr class="divider margin-top-16" />
    <section class="chat-users__user-list">
      <ul>
        {{#each users}}
          <li data-id="{{this.id}}" data-role="{{this.role}}">
            <div class="chat-user">
              <section class="chat-user__image-section">
                <div class="avatar avatar-24" style="background-image: url('{{this.avatar}}')">&nbsp;</div>
              </section>
              <section class="chat-user__text-section">
                <h3>{{this.name}}</h3>
                <div class="chat-user__role">
                  {{#if (isNull this.role)}}
                    &nbsp;
                  {{else}}
                    {{this.role}}
                  {{/if}}
                </div>
              </section>
              <section class="chat-user__action-button">
                {{#if (equals this.role 'regular')}}
                  <div class="chat-user__action-icon icon-remove-chat-user"></div>
                {{/if}}
                {{#if (isNull this.role)}}
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
