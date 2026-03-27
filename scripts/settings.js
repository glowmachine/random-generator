const tabs = document.querySelectorAll('.menu__tab-radio');

tabs.forEach((tab) => {
    tab.addEventListener('change', (e) => {
        if (!e.target.matches('.menu__tab-radio')) return;

        document.querySelectorAll('.menu__content').forEach((section) => {
            section.classList.remove('active');
        });
        document.getElementById(e.target.value).classList.add('active');
    });
});