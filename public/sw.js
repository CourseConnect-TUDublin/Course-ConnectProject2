if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let o={};const c=e=>a(e,n),r={module:{uri:n},exports:o,require:c};s[n]=Promise.all(i.map((e=>r[e]||c(e)))).then((e=>(t(...e),o)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"bcf6a5f01e1238682e98e84ad45602cc"},{url:"/_next/static/6g1i7BBJaokePCDoxdRsv/_buildManifest.js",revision:"8ad19c91a36caebd667022ab27898913"},{url:"/_next/static/6g1i7BBJaokePCDoxdRsv/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1188-bf2cee72883aaa0b.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/1517-eb3a52d6e70b392b.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/2108-49ae7c2f99b806bf.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/226-bbdad8f11b3b1c85.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/2282-293b934c89016e3d.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/2615-e91030de78be14ca.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/2976-ab6994fa60433090.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/3526-fd17c8e578d69d2c.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/4bd1b696-72533e0caf978141.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/5417-1b2ec55b1e834d86.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/5829-183ae0ae7dbf4938.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/6084-7a6c1e7ab4244987.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/6775-c27f67ad23f88120.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/7032-8769a8163cb18e76.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/7536-016de24fd3acf989.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/7652-a89b622f2490d24d.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/8173-7f156bf729227f73.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/8352-58cede3f503b2c4e.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/8617-7298521bc05eae32.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/8888-614c5307c720b878.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/9905-ae4835d04b2cd6e6.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/a6eb9415-83d3ca1176e22bd4.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/StudyBuddy/%5Bid%5D/page-8608ffe2d7ea4d2b.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/StudyBuddy/page-93b5d4db187cf6ad.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/TaskManager/archive/page-a425d71a6e8324d4.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/TaskManager/page-133c2abd043d5e98.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/_not-found/page-d5f22a8731710a9d.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-b7912ca01a6fdfa0.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/feedback/route-2040be11a0e0ed8b.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/hello/route-bdb9ab8d8d5485f5.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/login/route-b8ce93aab155e1e2.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/programmeData/route-472b35991253b0e5.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/register/route-a7f0db315d2fd66f.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/session-requests/route-cdda142743805a29.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/sessions/route-4ba98a0b720d8a59.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/studybuddies/route-979bb8675d09836c.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/tasks/%5Bid%5D/route-b1d8a3e44eac21bd.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/tasks/route-f7ab96bee72e5c20.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/api/timetable/route-3fc03cb02e09ba71.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/calendar/page-cf898698e490e845.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/dashboard/page-1ccebc95e0d27f91.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/home/layout-856c9e9594d6ecb8.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/home/page-9273a2c880e9fee2.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/layout-5f070f07e9ca5f40.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/login/page-9f7c081f03762a87.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/register/page-816be93abb08941f.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/session/%5Bid%5D/page-0b998702ed2d6453.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/studyhub/page-1459c3a01c7a0331.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/app/timetable/page-cc6f073a60b176a8.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/eeac573e-318f53a889cf9036.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/framework-c8065bab8b311d0e.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/main-0750726b6ba33015.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/main-app-29e416481e7eadf1.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/pages/_app-5f03510007f8ee45.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-a51c6e9c279026ee.js",revision:"6g1i7BBJaokePCDoxdRsv"},{url:"/_next/static/css/ecf91dfb57c6fb4f.css",revision:"ecf91dfb57c6fb4f"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/manifest.json",revision:"a86da42a32ec5a8e11cf3e30f61e6193"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
