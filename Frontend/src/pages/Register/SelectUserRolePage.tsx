import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccount } from '@/services/userService';
import { useDispatch } from 'react-redux';
import { UserLogin } from '@/redux/actions/action';
import _ from 'lodash';
import { FaUser, FaUserTie } from 'react-icons/fa6';

const SelectUserRolePage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchAccountInfo = async () => {
        let result: any = await fetchAccount();
        if (result && !_.isEmpty(result.DT)) {
            let userData = result.DT;
            let data = {
                isAuthenticated: userData.isAuthenticated,
                account: {
                    id: userData.id,
                    username: userData.username,
                    role: userData.role
                }
            }
            dispatch(UserLogin(data));
            if (userData.isAuthenticated === true) {
                navigate('/');
            }
        }
    }

    const activeStyle = "transition-all duration-300 bg-white shadow-md w-60 h-60 flex flex-col items-center justify-center rounded-lg cursor-pointer border-2 border-gray-200 text-gray-400 hover:border-[#FCB800] hover:text-[#FCB800] hover:border-2"

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    return (
        <div className='signin-container bg-[#EEEEEE]'>
            <div className='px-[30px] w-[80rem] mx-auto py-16 flex items-center justify-center'>
                <div className='rounded-l-[4px] w-[31.25rem] px-5 py-10 items-stretch'>
                    <div className="login-form__title text-black font-medium text-2xl text-center mb-8">Chọn người dùng</div>
                    <div className='w-full h-full flex items-start justify-center gap-10'>
                        <div className={activeStyle} onClick={() => navigate("/register/customer")}>
                            <div><FaUser className="w-12 h-12" /></div>
                            <div className='text-xl font-medium mt-2'>Khách hàng</div>
                        </div>
                        <div className={activeStyle} onClick={() => navigate("/register/seller")}>
                            <div><FaUserTie className="w-12 h-12" /></div>
                            <div className='text-xl font-medium mt-2'>Người bán</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectUserRolePage;
