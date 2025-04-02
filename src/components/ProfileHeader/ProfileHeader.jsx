import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHeader.module.css';

import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';

const avatarMap = {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
};

const ProfileHeader = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user) || {};
  const { username, age, avatarId } = user;

  const selectedAvatar = avatarMap[avatarId] || avatar1;

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    navigate('/'); 
  };

  return (
    <div className={styles.profileHeader}>
      {username && (
        <>
          <button className={styles.logoutButton} onClick={handleLogoutClick}>
            Log out
          </button>
          <img 
            src={selectedAvatar} 
            alt="Avatar" 
            className={styles.avatar} 
            style={{ border: 'none', boxShadow: 'none' }} 
          />
          
          <div className={styles.userInfo}>
            <div className={styles.inputDisabled}>{username}</div>
            <div className={styles.inputDisabled}>{age}</div>
          </div>
          {showLogoutConfirm && (
            <div className={styles.modalOverlay} onClick={() => setShowLogoutConfirm(false)}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles.modalTitle}>Confirm logout</h3>
                <p className={styles.modalText}>Are you sure you want to log out?</p>
                <div className={styles.confirmationButtons}>
                  <button 
                    className={`${styles.okButton} ${styles.yesButton}`}
                    onClick={confirmLogout}
                  >
                    Yes
                  </button>
                  <button 
                    className={`${styles.okButton} ${styles.noButton}`}
                    onClick={() => setShowLogoutConfirm(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileHeader;