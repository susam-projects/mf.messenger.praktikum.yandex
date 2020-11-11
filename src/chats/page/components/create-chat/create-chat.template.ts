const createChatTemplate = `
  <div class="create-chat">
    <h1 class="create-chat__title margin-top-24">Создание чата</h1>
    <section class="margin-top-40">
      {{{chatNameField}}}
    </section>
    <section class="create-chat__buttons">
      {{{createButton}}}
      {{{cancelButton}}}
    </section>
  </div>
`;

export default createChatTemplate;
