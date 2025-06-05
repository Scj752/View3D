import { 
    Form,
    Outlet,
    Link,
    useNavigate 
} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCube,
    faSpinner 
} from '@fortawesome/free-solid-svg-icons';
import { UploadButton } from './components/uploadbutton';
import { useState } from 'react';
import UploadModel from './components/uploadmodel';

export default function Topbar() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userAvatar = localStorage.getItem('userAvatar');

    const [isUploadModelOpen, setIsUploadModelOpen] = useState(false);

      const handleUploadClick = () => {
        setIsUploadModelOpen(true);
      };

      const handleCloseModel = () => {
        setIsUploadModelOpen(false);
      };

    return (
        <> 
            <div className="relative">
                <div className="z-100 fixed w-full top-0 bg-gradient-to-r from-purple-600 to-pink-600 shadow-md">
                    <div className="flex justify-between items-center h-20 px-10">
                        {/* 网站logo和名称 */}
                        <h1 className="font-sans text-3xl font-bold text-white">
                            <FontAwesomeIcon icon={faCube} className="mr-2" />
                            <Link to="/">View 3D</Link>
                        </h1>
                        {/* 搜索框、上传按钮和登录/个人资料 */}
                        <div className="flex items-center space-x-4">
                            <Form>
                                <div className="relative">
                                    <svg className="w-6 h-6 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" aria-hidden="true" viewBox="-2 -2 28 28">
                                        <g>
                                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                        </g>
                                    </svg>
                                    <input
                                        placeholder="Search"
                                        className="border-none w-80 h-10 pl-12 pr-4 outline-none bg-white rounded-full transition duration-300 focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </Form>
                            <UploadButton 
                                label={isUploading ? <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" />上传中...</> : "上传模型"}
                                onClick={handleUploadClick}
                                className={isUploading ? 'opacity-75 cursor-not-allowed' : ''}
                            />
                            {isLoggedIn ? (
                                <Link to="/profile">
                                    <img src={userAvatar} alt="用户头像" className="w-10 h-10 rounded-full" />
                                </Link>
                            ) : (
                                <button className="btn-primary flex items-center space-x-1" onClick={() => navigate('/login')}>
                                    <i className="fa fa-user"></i> 
                                    Login/Register
                                </button>
                            )}
                        </div>
                    </div>
                    {uploadError && <div className="text-red-500 text-center py-2">{uploadError}</div>}
                </div>
            </div>

            <div>
                <Outlet />
            </div>
            
            <UploadModel isOpen={isUploadModelOpen} onClose={handleCloseModel} />
        </>
    );
}