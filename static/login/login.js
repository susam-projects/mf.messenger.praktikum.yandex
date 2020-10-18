(function () {
    document.addEventListener('DOMContentLoaded', start);

    function start() {
        const loginButton = document.getElementById('login');
        const form = document.getElementsByTagName('form')[0];

        loginButton.addEventListener('click', event => {
            event.preventDefault();
            const data = window.serialize.getFormData(form);
            console.log(data);
        });
    }
})();
