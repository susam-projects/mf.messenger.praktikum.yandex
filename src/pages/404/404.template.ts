const page404Template = `
  <main class="page-404 root">
    <article class="card page-404__content-wrapper">
      <h1 class="page-404__title margin-top-80">404</h1>
      <p class="page-404__description margin-top-64">Мы не смогли найти страницу :(</p>
      <span id="go-to-chats-button" class="margin-top-80 margin-bottom-16">{{{goToChatsButton}}}</span>
    </article>
  </main>
`;

export default page404Template;
