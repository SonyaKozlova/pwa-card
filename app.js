// ����������� Service Worker
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

// ������� ��� ������ QR-�����
function showQr(type) {
    // �������� ��� QR-����
    document.querySelectorAll('.qr-container').forEach(el => {
        el.classList.add('hidden');
    });

    // ���������� ��������� QR-���
    const qrElement = document.getElementById(`${type}-qr`);
    if (qrElement) {
        qrElement.classList.remove('hidden');
    }
}

// ��������� ��������� PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // ������������� �������������� ����������� ���������
    e.preventDefault();
    // ��������� ������� ��� ������������� �����
    deferredPrompt = e;

    // ���������� ������ ���������
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
