i18next
    .use(i18nextHttpBackend)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        }
    }, function (err, t) {
        document.getElementById('output').innerHTML = i18next.t('welcome');
    });
