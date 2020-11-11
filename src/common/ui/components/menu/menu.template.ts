const menuTemplate = `
  <nav class="menu {{className}}">
    <div class="card card-lite">
      <ul>
        {{#each items}}
          <li class="menu__item {{#if this.isDanger}}menu__item-danger{{/if}}">
            <span class="menu__item__icon {{this.iconClass}}"></span>
            <span>{{this.label}}</span>
          </li>
        {{/each}}
      </ul>
    </div>
  </nav>
`;

export default menuTemplate;
