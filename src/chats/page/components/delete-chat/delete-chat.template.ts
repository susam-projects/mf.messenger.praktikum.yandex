const deleteChatTemplate = `
  <div class="delete-chat">
    <h1 class="delete-chat__header margin-top-24">Вы действительно хотите удалить чат "{{chatTitle}}"?</h1>
    <section class="delete-chat__buttons margin-top-40">
      {{{deleteButton}}}
      {{{cancelButton}}}
    </section>
  </div>
`;

export default deleteChatTemplate;
