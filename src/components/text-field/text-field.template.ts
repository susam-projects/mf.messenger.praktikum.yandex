const textFieldTemplate = `
  <div
    class="
      text-field
      {{#if isRequired}}text-field_required{{/if}}
      {{#if isError}}text-field_error{{/if}}
      root
    "
  >
    <label class="text-field__label">
      <span class="text-field__required-mark">*</span>
      {{label}}
    </label>
    <input
      class="text-field__input"
      placeholder="{{placeholder}}"
      value="{{defaultValue}}"
      type="{{type}}"
      name="{{name}}"
    />
    <div class="text-field__error-text">{{errorText}}</div>
  </div>
`;

export default textFieldTemplate;
