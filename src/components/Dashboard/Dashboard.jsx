import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

import ProfileHeader from '../ProfileHeader/ProfileHeader';

import eyesIcon from '/src/assets/images/eyes.png';
import checkmarkIcon from '/src/assets/images/checkmark.png';
import cancelIcon from '/src/assets/images/cancel.png';

const dummyTasks = [
  { id: 1, title: 'Task 1', description: 'Do homework', deadline: '2025-04-01' },
  { id: 2, title: 'Task 2', description: 'Clean your room', deadline: '2025-04-02' },
  { id: 3, title: 'Task 3', description: 'Feed the cat', deadline: '2025-04-03' },
  { id: 4, title: 'Task 4', description: 'Walk the dog', deadline: '2025-04-04' }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className={styles.dashboardContainer}>
      
      {/* 👤 Компонент профиля */}
      <ProfileHeader />

      <button className={styles.addTaskButton} onClick={() => navigate('/add-task')}>
        Add new task
      </button>

      <div className={styles.taskList}>
        {dummyTasks.map(task => (
          <div key={task.id} className={styles.taskRow}>
            <button className={styles.taskButton} onClick={() => setSelectedTask(task)}>
              {task.title}
            </button>
            <div className={styles.taskIcons}>
              <img src={eyesIcon} alt="view" className={styles.icon} />
              <img src={checkmarkIcon} alt="done" className={styles.icon} />
              <img src={cancelIcon} alt="cancel" className={styles.icon} />
            </div>
          </div>
        ))}
      </div>

      <button className={styles.completedButton} onClick={() => navigate('/completed')}>
        Completed tasks
      </button>

      <div className={styles.footerText}>family planner</div>

      {selectedTask && (
        <div className={styles.modalOverlay} onClick={() => setSelectedTask(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{selectedTask.title}</h3>
            <p className={styles.modalText}>📝 {selectedTask.description}</p>
            <p className={styles.modalText}>📅 Deadline: {selectedTask.deadline}</p>
            <button className={styles.okButton} onClick={() => setSelectedTask(null)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
