const CACHE_NAME = 'my-visit-card-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    './photo.jpg',
    './phone-qr.png',
    './telegram-qr.png',
    './email-qr.png',
    '/offline.html'
];

// Óñòàíîâêà ñåðâèñ-âîðêåðà
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(c => c.addAll(FILES))
    );
    self.skipWaiting(); // Ñðàçó àêòèâèðîâàòü íîâûé âîðêåð
});

// Àêòèâàöèÿ (î÷èñòêà ñòàðîãî êýøà)
self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Îáðàáîòêà çàïðîñîâ îò ñòðàíèöû
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request) // Ïûòàåìñÿ íàéòè ôàéë â êýøå
            .then(r => r || fetch(e.request)) // Åñëè íåò — ïðîáóåì çàãðóçèòü èç èíòåðíåòà
            .catch(() => caches.match("/offline.html")) // Åñëè ñîâñåì íå óäàëîñü — ïîêàçàòü offline.html
    );
}); 
