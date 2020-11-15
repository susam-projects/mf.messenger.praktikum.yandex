const textFieldWithIconTemplate = `
  <article class="text-field-with-icon {{className}}">
    <input class="text-field-with-icon__input" placeholder="{{placeholder}}" name="{{name}}" />
    <div class="text-field-with-icon__icon-container">
      <div class="text-field-with-icon__icon {{iconClassName}}"></div>
    </div>
  </article>
`;

export default textFieldWithIconTemplate;
