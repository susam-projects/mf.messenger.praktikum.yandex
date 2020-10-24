(function () {
    document.addEventListener('DOMContentLoaded', start);

    function start() {
        const searchField = document.getElementById('search-field');
        const searchButton = document.getElementById('search');
        const sendButton = document.getElementById('send-message');
        const messageField = document.getElementById('message-field');

        searchButton.addEventListener('click', () => {
            const data = window.serialize.getFormData(searchField);
            console.log(data);
        });

        sendButton.addEventListener('click', event => {
            const data = window.serialize.getFormData(messageField);
            console.log(data);
        });
    }
})();
