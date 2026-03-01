// PRR Calculator Service Worker - v1.0.0
const CACHE_NAME = 'prr-calculator-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg'
];

// インストール: 全アセットをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// アクティベート: 古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// フェッチ: キャッシュ優先 → ネットワークフォールバック
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          // キャッシュがあればすぐ返す（バックグラウンドで更新）
          const fetchPromise = fetch(event.request).then(response => {
            if (response && response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            }
            return response;
          }).catch(() => {});
          return cached;
        }
        // キャッシュがなければネットワークから取得してキャッシュ
        return fetch(event.request).then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
  );
});
