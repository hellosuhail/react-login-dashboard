import React, {useEffect, useState } from "react";
import {Link} from 'react-router-dom'

const UserProfile = () => {
  const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&s";

  const [avatar, setAvatar] = useState(defaultAvatar);
  const [fileInput, setFileInput] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setAvatar(defaultAvatar);
    if (fileInput) fileInput.value = null;
  };

  useEffect(()=>{
    const storeName= JSON.parse(localStorage.getItem('user'))
    setName(storeName.name[0].toUpperCase() + storeName.name.slice(1));
    setEmail(storeName.email);
  },[])

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className=" shadow-md shadow-gray-500 rounded-2xl p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full shadow-md mb-4 object-cover"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={(ref) => setFileInput(ref)}
            onChange={handleImageUpload}
          />
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => fileInput?.click()}
              className="px-4 py-1 cursor-pointer bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700"
            >
              Upload Photo
            </button>
            <button
              onClick={handleRemovePhoto}
              className="px-4 py-1 cursor-pointer bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
            >
              Remove Photo
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-400">Hello, {name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
          <p className="text-center text-gray-500 mt-3">
            Love photography travel and good coffee
          </p>
          <p className="text-sm text-gray-400 mt-2">GZB, Indai</p>
          <p className="text-sm text-gray-400">Joined March 2022</p>
        </div>
        <Link to='/dashboard' className="btn text-lg rounded-lg btn-primary w-full">back</Link>
      </div>
    </div>
  );
};

export default UserProfile;
