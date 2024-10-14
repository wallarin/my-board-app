import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, initializeAuth, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfigTest = {
    apiKey: "",
    authDomain: "my-board-app-54dbe.firebaseapp.com",
    projectId: "my-board-app-54dbe",
    storageBucket: "my-board-app-54dbe.appspot.com",
    messagingSenderId: "44261967373",
    appId: "1:44261967373:web:3594a2ba6cf864372a7744",
    measurementId: "G-5GGX9LJ5T0"
};

const appTest = initializeApp(firebaseConfigTest);
const authTest = getAuth(appTest);
let verificationID2 = '';

export const handleSendCode2 = (recivePhoneNumber) => {

    return new Promise((resolve, reject) => {
        window.recaptchaVerifier = new RecaptchaVerifier(authTest, "recaptcha-container", {
            size: "invisible",
            callback: (response) => {
            },
        });

        authTest.languageCode = "ko";
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(authTest, recivePhoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                verificationID2 = confirmationResult;
                resolve('인증 코드가 전송되었습니다.');
            })
            .catch((error) => {
                reject('인증 코드 전송에 실패하였습니다.');
            })
    });

};

export const handleVerifyCode2 = (certification) => {

    return new Promise((resolve, reject) => {
        if (!verificationID2) {
            reject('인증 ID가 없습니다. 다시 시도해 주세요.');
            return;
        }

        window.confirmationResult
            .confirm(certification)
            .then((result) => {
                const user = result.user;
                resolve('인증 성공! 로그인 완료.');
            }).catch((error) => {
                reject('인증 실패! 오류');
            })
    })
};

function Test() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationID, setVerificationID] = useState(null);
    const [message, setMessage] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const firebaseConfig = {
        apiKey: "AIzaSyAHo_Crwl1yVIclXe4r8Bt9EUqAZdWxHN0",
        authDomain: "my-board-app-54dbe.firebaseapp.com",
        projectId: "my-board-app-54dbe",
        storageBucket: "my-board-app-54dbe.appspot.com",
        messagingSenderId: "44261967373",
        appId: "1:44261967373:web:3594a2ba6cf864372a7744",
        measurementId: "G-5GGX9LJ5T0"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    //auth.settings.appVerificationDisabledForTesting = true; // 테스트용으로만 사용

    // reCAPTCHA 설정
    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible', // 'invisible' 또는 'normal'로 설정 가능
            callback: (response) => {
                console.log('reCAPTCHA solved:', response);
            }
        });
    };

    // 인증 코드 전송 처리
    const handleSendCode = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: (response) => {
            },
        });

        auth.languageCode = "ko";
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setVerificationID(confirmationResult);
                setIsCodeSent(true);
                setMessage('인증 코드가 전송되었습니다.');
            })
            .catch((error) => {
                console.log("SMS FAILED");
            })


        // provider.verifyPhoneNumber(phoneNumber, appVerifier)
        //     .then((verificationId) => {
        //         setVerificationID(verificationId);
        //         setIsCodeSent(true);
        //         setMessage('인증 코드가 전송되었습니다.');
        //     })
        //     .catch((error) => {
        //         setMessage(`코드 전송 실패: ${error.message}`);
        //     });
    };

    // 인증 코드 확인 처리
    const handleVerifyCode = () => {
        if (!verificationID) {
            setMessage('인증 ID가 없습니다. 다시 시도해 주세요.');
            return;
        }

        window.confirmationResult
            .confirm(verificationCode)
            .then((result) => {
                const user = result.user;
                setMessage('인증 성공! 로그인 완료.');
            }).catch((error) => {
                setMessage('인증 실패! 오류');
            })

        // const credential = PhoneAuthProvider.credential(verificationID, verificationCode);

        // signInWithCredential(auth, credential)
        //     .then((result) => {
        //         setMessage('인증 성공! 로그인 완료.');
        //         const currentUser = auth.currentUser;
        //         if (currentUser) {
        //             currentUser.getIdToken(true)
        //                 .then((idToken) => {
        //                     // Firebase ID 토큰 받기 완료
        //                     localStorage.setItem('FirebaseidToken', idToken);
        //                     console.log('ID Token:', idToken);
        //                 })
        //                 .catch((error) => {
        //                     console.error('ID 토큰 획득 실패:', error);
        //                 });
        //         }
        //     })
        //     .catch((error) => {
        //         setMessage(`인증 실패: ${error.message}`);
        //     });
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-100">
            <h2 className="text-lg font-bold mb-4">전화번호 인증</h2>

            {!isCodeSent ? (
                <>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+821012345678" // 국제전화번호 형식
                        className="w-full p-2 border rounded mb-4"
                    />
                    <button
                        onClick={handleSendCode}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        인증 코드 전송
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="인증 코드를 입력하세요"
                        className="w-full p-2 border rounded mb-4"
                    />
                    <button
                        onClick={handleVerifyCode}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        인증 완료
                    </button>
                </>
            )}

            <div id="recaptcha-container"></div>
            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
}

export default Test;
