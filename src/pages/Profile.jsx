import React from 'react';
import './Profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      // Clear user data from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      // Redirect to login page or home page
      window.location.href = '/login';
    }
  };

  return (
    <>
      <div className="profile-container flex my-5">
        <div className="left">
          <div className="details">
            <div className="l-d-account border-b-3 border-gray-400 mb-2 m-2">
              <span className="font-bold text-4xl text-gray-400">My account</span>
            </div>

            <div className="l-d-info border-b-1 border-gray-400 m-5">
              <div className="text-lg text-gray-400 mb-3">USER INFORMATION</div>
              <div className="grid grid-cols-2 ld-info place-items-center">
                <div className="l-d-info-un ld-info-box">
                  <p className="ld-info-up">User Name</p>
                  <p className="ld-info-down">{user.UserName}</p>
                </div>
                <div className="l-d-info-em ld-info-box">
                  <p className="ld-info-up">Email</p>
                  <p className="ld-info-down">{user.Email}</p>
                </div>
                <div className="l-d-info-fn ld-info-box">
                  <p className="ld-info-up">First Name</p>
                  <p className="ld-info-down">{user.Name.split(' ')[0]}</p>
                </div>
                <div className="l-d-info-ln ld-info-box">
                  <p className="ld-info-up">Last Name</p>
                  <p className="ld-info-down">{user.Name.split(' ')[1]}</p>
                </div>
              </div>
            </div>

            <div className="l-d-add m-5">
              <div className="text-lg text-gray-400 mb-3">ADDRESS</div>
              <div className="grid grid-cols-3 ld-info place-items-center">
                <div className="l-d-info-un ld-info-box">
                  <p className="ld-info-up">City</p>
                  <p className="ld-info-down">{user.City}</p>
                </div>
                <div className="l-d-info-em ld-info-box">
                  <p className="ld-info-up">Nation</p>
                  <p className="ld-info-down">{user.Country}</p>
                </div>
                <div className="l-d-info-fn ld-info-box">
                  <p className="ld-info-up">Postal Code</p>
                  <p className="ld-info-down">{user.Postalcode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right relative">
          <div className="right-up flex-col items-center gap-5 border-b-1 border-gray-400 mx-4">
            <div className="profile-picture h-[9vw] w-[9vw] bg-gray-400 rounded-full mt-[2vw] flex justify-center items-center font-bold text-white text-[4vw]">
              {user.Name[0]}
            </div>
            <p className="font-bold text-3xl mb-4">{user.Name}</p>
          </div>

          <div className="info m-5">
            <div className="mb-5">
              <span className="mini-infos">Date of birth :</span>{' '}
              <span className="text-red-500">{user.DateOfBirth}</span>
            </div>
            <div className="mb-5">
              <span className="mini-infos">Blood group :</span>{' '}
              <span className="text-red-500">{user.Bloodgroup}</span>
            </div>
            <div className="mb-5">
              <span className="mini-infos">Height :</span>{' '}
              <span className="text-red-500">{user.Height} cm</span>
            </div>
            <div className="mb-5">
              <span className="mini-infos">Weight :</span>{' '}
              <span className="text-red-500">{user.Weight} kg</span>
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="border-2 px-3 py-1 rounded-2xl bg-white text-red-500 font-bold absolute bottom-4 right-8 cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
