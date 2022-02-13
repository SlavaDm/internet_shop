importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyB_xAGiIn7samIH2Eh7IV2YH6Ag1NcVj8A',
  authDomain: 'nextjs-1cc28.firebaseapp.com',
  projectId: 'nextjs-1cc28',
  storageBucket: 'nextjs-1cc28.appspot.com',
  messagingSenderId: '958624697513',
  appId: '1:958624697513:web:fb36fdb3ef3e3d16b6edb8',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
