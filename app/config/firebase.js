// Dùng để kết nối với firebase

import admin from "firebase-admin";
import path from "path";

// Initialize firebase admin SDK
// gọi đến method initializeApp: dùng để khởi tạo 1 cái kết nối, gồm 2 options
admin.initializeApp({ //initializeApp: dùng để khởi tạo 1 cái kết nối
    /**
     * credential: kết nối 
     * path.resolve: liên kết đến đường dẫn, trỏ đến file cần lấy
     * ./webbanhang-firebase.json: link file
     */
    credential: admin.credential.cert(path.resolve('./webbanhang-firebase.json')),
    /**
     * storageBucket: là phần để biết mình lưu vào storage nào
     * webbanhang-1bf46.appspot.com: là phần storage vừa tạo ra trong firebase
     */
    storageBucket: 'webbanhang-1bf46.appspot.com',
});
const bucket = admin.storage().bucket() //bucket: như là 1 kho chứa do firebase cung cấp

export default {
    bucket
};