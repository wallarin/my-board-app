import axios from "axios";
import auth from '../../firebaseConfig';

auth.languageCode = "ko";

export const handleSendCode = async (recivePhoneNumber) => {
    try {
        const res = await axios.post('/api/send-verification-code', null, {
            params: {
                phoneNumber: recivePhoneNumber
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
// return new Promise((resolve, reject) => {
//     if (!window.recaptchaVerifier) {
//         window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//             'size': "invisible",
//             'callback': (response) => {
//                 // reCAPTCHA solved - allow the user to proceed.
//                 console.log(response)
//             },
//             'expired-callback': () => {
//                 // reCAPTCHA expired
//                 reject('reCAPTCHA가 만료되었습니다. 다시 시도해 주세요.');
//             }
//         }, auth);
//     }

//     const appVerifier = window.recaptchaVerifier;

//     signInWithPhoneNumber(auth, recivePhoneNumber, appVerifier)
//         .then((confirmationResult) => {
//             window.confirmationResult = confirmationResult;
//             resolve('인증 코드가 전송되었습니다.');
//         })
//         .catch((error) => {
//             console.error('Error during signInWithPhoneNumber:', error);
//             reject(`인증 코드 전송에 실패하였습니다. 오류: ${error.message}`);
//         })
// });



export const handleVerifyCode = async (recivePhoneNumber, certification) => {
    try {
        const res = await axios.post('/api/verify-code', null, {
            params: {
                phoneNumber: recivePhoneNumber,
                verifyCode: certification
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};