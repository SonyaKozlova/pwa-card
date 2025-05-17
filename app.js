// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Функция для показа QR-кодов
function showQr(type) {
    // Скрываем все QR-коды
    document.querySelectorAll('.qr-container').forEach(el => {
        el.classList.add('hidden');
    });

    // Показываем выбранный QR-код
    const qrElement = document.getElementById(`${type}-qr`);
    if (qrElement) {
        qrElement.classList.remove('hidden');
    }
}

// Обработка установки PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Предотвращаем автоматическое отображение подсказки
    e.preventDefault();
    // Сохраняем событие для использования позже
    deferredPrompt = e;

    // Показываем кнопку установки
    showInstallPromotion();
});

function showInstallPromotion() {
    console.log('PWA can be installed');
}

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
}
