const buttonTemplate = `
    <button
      class="root {{className}}
      {{#if (equals variant 'primary')}}
        button_primary
      {{/if}}
      {{#if (equals variant 'neutral')}}
        button_neutral
      {{/if}}
      {{#if (equals variant 'danger')}}
        button_danger
      {{/if}}
      {{#if (equals variant 'text-primary')}}
        text-button_primary
      {{/if}}
      {{#if (equals variant 'text-danger')}}
        text-button_danger
      {{/if}}
      "
    >
      {{label}}
    </button>
`;

export default buttonTemplate;
