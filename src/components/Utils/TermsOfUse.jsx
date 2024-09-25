import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TermsOfUse() {
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();

    const handleAgree = () => {
        if (agreed) {
            navigate('/my-board-app/SignUp'); // 회원가입 페이지로 이동
        } else {
            alert('약관에 동의하셔야 합니다.');
        }
    };

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto p-6 bg-gray-100 h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md lg:max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">이용 약관</h2>
                <div className="h-48 lg:h-[30rem] overflow-y-auto mb-4">
                    <p>
                        제1조 (목적)
                        <br />
                        <span className="ml-2">이 약관은 [서비스명] (이하 "서비스")의 이용 조건 및 절차, 이용자와 서비스 제공자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</span>
                        <br /><br />
                        제2조 (용어의 정의)
                        <br />
                        <span className="ml-2">1. "이용자"란 본 약관에 따라 서비스를 제공받는 자를 의미합니다.</span><br />
                        <span className="ml-2">2. "서비스"란 [서비스명]에서 제공하는 모든 서비스를 말합니다.</span><br />
                        <span className="ml-2">3. "회원"이란 서비스에 개인정보를 제공하여 회원등록을 한 자로서, 서비스를 지속적으로 이용할 수 있는 자를 말합니다.</span><br />
                        <span className="ml-2">4. "비회원"이란 회원으로 가입하지 않고 서비스를 이용하는 자를 말합니다.</span><br />
                        <br />
                        제3조 (약관의 게시 및 변경)
                        <br />
                        <span className="ml-2">1. 이 약관의 내용은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.</span><br />
                        <span className="ml-2">2. 서비스 제공자는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지함으로써 효력을 발생합니다.</span><br />
                        <span className="ml-2">3. 이용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단하고 회원탈퇴를 요청할 수 있습니다. 약관의 변경 이후에도 서비스를 계속 이용할 경우 변경된 약관에 동의한 것으로 간주됩니다.</span><br /><br />
                        제4조 (서비스의 제공 및 변경)
                        <br />
                        <span className="ml-2">1. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</span><br />
                        <span className="ml-2">2. 서비스 제공자는 운영상의 기술적 이유나 기타 사정으로 서비스 제공이 일시 중단될 수 있으며, 이 경우 이용자에게 사전 통지합니다.</span><br />
                        <span className="ml-2">3. 서비스 제공자는 서비스의 내용, 운영상 기술적 사양 등을 변경할 수 있으며, 이 경우 변경 내용을 이용자에게 공지합니다.</span><br /><br />
                        제5조 (회원가입 및 계정 관리)
                        <br />
                        <span className="ml-2">1. 이용자는 본 약관에 동의한 후 회원가입을 신청할 수 있으며, 서비스 제공자는 이를 승인함으로써 회원가입이 완료됩니다.</span><br />
                        <span className="ml-2">2. 회원은 가입 시 제공한 정보에 변경이 있을 경우, 즉시 해당 정보를 수정하여야 합니다.</span><br />
                        <span className="ml-2">3. 회원은 자신의 계정 정보를 관리할 책임이 있으며, 제3자가 회원의 계정을 무단으로 사용하게 해서는 안 됩니다.</span><br />
                        <span className="ml-2">4. 회원이 약관을 위반하거나 서비스 제공자의 정책에 반하는 행위를 할 경우, 서비스 제공자는 회원의 계정을 일시 중지하거나 해지할 수 있습니다.</span><br /><br />
                        제6조 (개인정보의 보호)
                        <br />
                        <span className="ml-2">1. 서비스 제공자는 이용자의 개인정보를 보호하기 위해 노력하며, 개인정보 보호와 관련된 법령을 준수합니다.</span><br />
                        <span className="ml-2">2. 서비스 제공자는 이용자의 개인정보를 본인의 동의 없이 제3자에게 제공하지 않으며, 개인정보 보호정책에 따라 관리합니다.</span><br /><br />
                        제7조 (이용자의 의무)
                        <br />
                        <span className="ml-2">1. 이용자는 서비스 이용 시 관계 법령, 본 약관의 규정, 서비스 이용 안내 및 주의 사항을 준수하여야 합니다.</span><br />
                        <span className="ml-2">2. 이용자는 다음 행위를 하여서는 안 됩니다:</span><br />
                        <span className="ml-4">● 타인의 개인정보를 도용하는 행위</span><br />
                        <span className="ml-4">● 서비스의 운영을 방해하는 행위</span><br />
                        <span className="ml-4">● 음란물이나 불법 자료를 게시하는 행위</span><br />
                        <span className="ml-4">● 타인의 명예를 훼손하거나 불이익을 주는 행위</span><br />
                        <span className="ml-4">● 기타 불법적이거나 부당한 행위</span><br /><br />
                        제8조 (면책 조항)
                        <br />
                        <span className="ml-2">1. 서비스 제공자는 천재지변, 불가항력, 기타 서비스 제공자의 통제 불가능한 사유로 인해 서비스를 제공할 수 없는 경우, 그 책임을 면합니다.</span><br />
                        <span className="ml-2">2. 서비스 제공자는 이용자의 귀책 사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.</span><br />
                        <span className="ml-2">3. 서비스 제공자는 이용자가 서비스와 관련하여 기대하는 수익을 얻지 못하거나 서비스 이용으로 발생하는 손해에 대해 책임을 지지 않습니다.</span><br /><br />
                        제9조 (분쟁의 해결)
                        <br />
                        <span className="ml-2">1. 본 약관과 관련하여 발생한 분쟁에 대해 서비스 제공자와 이용자는 성실히 협의하여 해결합니다.</span><br />
                        <span className="ml-2">2. 협의가 이루어지지 않을 경우, 양 당사자는 민사소송법 상의 관할 법원에 소를 제기할 수 있습니다.</span><br /><br />
                        부칙<br />
                        <span className="ml-2">이 약관은 2024년 1월 1일부터 시행됩니다.</span></p>
                </div>
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="agree"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="agree" className="text-gray-700">이용 약관에 동의합니다</label>
                </div>
                <button
                    onClick={handleAgree}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                >
                    동의하고 회원가입
                </button>
            </div>
        </div>
    );
}

export default TermsOfUse;
