(function () {
    document.addEventListener('DOMContentLoaded', start);

    function start() {
        const signUpButton = document.getElementById('sign-up');
        const form = document.getElementsByTagName('form')[0];

        signUpButton.addEventListener('click', event => {
            event.preventDefault();
            const data = window.serialize.getFormData(form);
            console.log(data);
        });
    }
})();
