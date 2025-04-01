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
  const [confirmationTask, setConfirmationTask] = useState(null);
  const [deleteConfirmationTask, setDeleteConfirmationTask] = useState(null);
  const [tasks, setTasks] = useState(dummyTasks);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleCompleteTask = (taskId) => {
    const taskToComplete = tasks.find(task => task.id === taskId);
    setCompletedTasks([...completedTasks, taskToComplete]);
    setTasks(tasks.filter(task => task.id !== taskId));
    setConfirmationTask(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setDeleteConfirmationTask(null);
  };

  return (
    <div className={styles.dashboardContainer}>
      <ProfileHeader />

      <button className={styles.addTaskButton} onClick={() => navigate('/addtask')}>
  Add new task
</button>

      <div className={styles.taskList}>
        {tasks.map(task => (
          <div key={task.id} className={styles.taskRow}>
            <div className={`${styles.taskButton} ${styles.taskText}`}>
              {task.title}
            </div>
            <div className={styles.taskIcons}>
              <img 
                src={eyesIcon} 
                alt="view" 
                className={styles.icon} 
                onClick={() => setSelectedTask(task)} 
              />
              <img 
                src={checkmarkIcon} 
                alt="complete" 
                className={styles.icon} 
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmationTask(task);
                }} 
              />
              <img 
                src={cancelIcon} 
                alt="delete" 
                className={styles.icon} 
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteConfirmationTask(task);
                }} 
              />
            </div>
          </div>
        ))}
      </div>

      <button className={styles.completedButton} onClick={() => navigate('/completed', { state: { completedTasks } })}>
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

      {confirmationTask && (
        <div className={styles.modalOverlay} onClick={() => setConfirmationTask(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Confirm completion</h3>
            <p className={styles.modalText}>
              Did you really complete "{confirmationTask.title}"?
            </p>
            <div className={styles.confirmationButtons}>
              <button 
                className={`${styles.okButton} ${styles.yesButton}`}
                onClick={() => handleCompleteTask(confirmationTask.id)}
              >
                Yes
              </button>
              <button 
                className={`${styles.okButton} ${styles.noButton}`}
                onClick={() => setConfirmationTask(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmationTask && (
        <div className={styles.modalOverlay} onClick={() => setDeleteConfirmationTask(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Confirm deletion</h3>
            <p className={styles.modalText}>
              Are you sure you want to delete "{deleteConfirmationTask.title}"?
            </p>
            <div className={styles.confirmationButtons}>
              <button 
                className={`${styles.okButton} ${styles.yesButton}`}
                onClick={() => handleDeleteTask(deleteConfirmationTask.id)}
              >
                Yes
              </button>
              <button 
                className={`${styles.okButton} ${styles.noButton}`}
                onClick={() => setDeleteConfirmationTask(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;