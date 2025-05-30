import { 
    Form,
    Outlet,
    Link,
} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCube,
} from '@fortawesome/free-solid-svg-icons';
import { UploadButton } from './components/uploadbutton';

export default function Topbar({
    isLoggedIn = false,
}) {
	isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userAvatar = localStorage.getItem('userAvatar');
    const handleModelUpload = (files: FileList) => {
        // 处理模型上传逻辑
        if (files.length > 0) {
          console.log("选择的文件:", files[0].name);
          // 这里可以触发上传API调用
          uploadModelToServer(files[0]);
        }
      };

      const uploadModelToServer = async (file: File) => {
        // 实际项目中，这里应该调用API上传文件
        const formData = new FormData();
        formData.append('modelFile', file);
        
        try {
          // 示例API调用
          const response = await fetch('/api/upload-model', {
            method: 'POST',
            body: formData
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log("上传成功:", result);
            // 显示成功提示
          } else {
            console.error("上传失败");
            // 显示错误提示
          }
        } catch (error) {
          console.error("上传错误:", error);
        }
      };

    return (
        <> 
            <div className="relative">
                <div className="z-100 fixed w-full top-0 bg-gradient-to-r from-purple-600 to-pink-600 shadow-md">
                    <div className="flex justify-between items-center h-20 px-10">
                        <h1 className="font-sans text-3xl font-bold text-white">
                            <FontAwesomeIcon icon={faCube} className="mr-2" />
                            <a href="/">View 3D</a>
                        </h1>
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
                            <UploadButton label={"上传模型"}/>
                            {isLoggedIn ? (
	                            <Link to="/profile">
	                                <img src={userAvatar} alt="用户头像" className="w-10 h-10 rounded-full" />
	                            </Link>
	                        ) : (
	                            
	                            <button className="btn-primary flex items-center space-x-1">
	                                <i className="fa fa-user"></i> 
	                                <Link to="/login">Login/Register</Link>
	                            </button>
	                        )}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    );
}