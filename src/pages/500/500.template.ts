const page500Template = `
  <main class="page-500">
    <article class="card page-500__content-wrapper">
      <h1 class="page-500__title margin-top-80">500</h1>
      <p class="page-500__description margin-top-64">Что-то пошло не так во время последней операции.</p>
      <p class="page-500__description">Наши специалисты уже работают над решением проблемы.</p>
      <span id="go-to-chats-button" class="margin-top-80 margin-bottom-16">{{{goToChatsButton}}}</span>
    </article>
  </main>
`;

export default page500Template;
