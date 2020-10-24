(function () {
    document.addEventListener('DOMContentLoaded', start);

    function start() {
        const saveButton = document.getElementById('save');
        const form = document.getElementsByTagName('form')[0];

        saveButton.addEventListener('click', event => {
            event.preventDefault();
            const data = window.serialize.getFormData(form);
            console.log(data);
        });
    }
})();
