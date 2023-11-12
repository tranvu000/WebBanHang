import admin from 'firebase-admin';
import path from 'path';

admin.initializeApp({
    credential: admin.credential.cert(path.resolve('./webbanhang-firebase.json')),

    storageBucket: 'webbanhang-1bf46.appspot.com',
});

const bucket = admin.storage().bucket('admin');

export default {
    bucket
};