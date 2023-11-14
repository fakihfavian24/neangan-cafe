import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

const assetsToCache = [
  './',
  './icons/neangancafelogo-72x72.png',
  './icons/neangancafelogo-96x96.png',
  './icons/neangancafelogo-128x128.png',
  './icons/neangancafelogo-144x144.png',
  './icons/neangancafelogo-152x152.png',
  './icons/neangancafelogo-192x192.png',
  './icons/neangancafelogo-384x384.png',
  './icons/neangancafelogo-512x512.png',
  './index.html',
  './favicon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

/* eslint-disable no-unused-vars */
self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
