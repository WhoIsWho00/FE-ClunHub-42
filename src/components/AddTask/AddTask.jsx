import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddTask.module.css';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import leftIcon from '../../assets/images/left.png';
import checkmarkIcon from '../../assets/images/checkmark1.png';
import cancelIcon from '../../assets/images/cancel1.png';

const AddTask = () => {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');

    const handleBack = () => navigate('/dashboard');
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className={styles.addTaskContainer}>
            <ProfileHeader />
            
            <div className={styles.contentWrapper}>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Task 1"
                    className={styles.taskTitleInput}
                    required
                />

                <form onSubmit={handleSubmit} className={styles.taskForm}>
                    <div className={styles.deadlineContainer}>
                        <span className={styles.deadlineLabel}>Deadline:</span>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className={styles.dateInput}
                            min={today}
                            required
                        />
                    </div>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description..."
                        className={styles.descriptionInput}
                        rows={6}
                    />

                    <div className={styles.actionButtonsContainer}>
                        <div className={styles.actionButtons}>
                            <img 
                                src={leftIcon} 
                                alt="back" 
                                onClick={handleBack} 
                                className={styles.leftIcon}
                            />
                            <img 
                                src={checkmarkIcon} 
                                alt="save" 
                                onClick={handleSubmit} 
                                className={styles.checkmarkIcon}
                            />
                            <img 
                                src={cancelIcon} 
                                alt="cancel" 
                                onClick={handleBack} 
                                className={styles.cancelIcon}
                            />
                        </div>
                    </div>
                </form>
            </div>

            <div className={styles.footer}>family planner</div>
        </div>
    );
};

export default AddTask;