import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  fetchTasks,
  updateTaskStatus,
} from "../../store/slices/taskSlice";
import styles from "./Dashboard.module.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import eyesIcon from "/src/assets/images/eyes.png";
import checkmarkIcon from "/src/assets/images/checkmark.png";
import cancelIcon from "/src/assets/images/cancel.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmationTask, setConfirmationTask] = useState(null);
  const [deleteConfirmationTask, setDeleteConfirmationTask] = useState(null);

  
  useEffect(() => {
    dispatch(
      fetchTasks({
        includeCompleted: false, 
      })
    );
  }, [dispatch, location.state?.shouldRefresh]);

  
  const activeTasks = tasks.filter((task) => {
    return !task.completed;
  });

  const handleCompleteTask = async (taskId) => {
    try {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      await dispatch(
        updateTaskStatus({
          id: taskId,
          status: "COMPLETED",
          completionDate: today 
        })
      ).unwrap();

      await dispatch(
        fetchTasks({
          includeCompleted: false,
        })
      );

      setConfirmationTask(null);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId)).unwrap();
      setDeleteConfirmationTask(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    navigate("/addtask", {
      state: {
        taskToEdit: task,
        isEditing: true,
      },
    });
  };

  const goToCompletedTasks = () => {
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    localStorage.setItem("selectedDate", formattedToday);
    navigate("/calendar");
  };

  return (
    <div className={styles.dashboardContainer}>
      <ProfileHeader />

      <button
        className={styles.addTaskButton}
        onClick={() => navigate("/addtask")}
      >
        Add new task
      </button>

      <div className={styles.scrollableTaskList}>
        {activeTasks.map((task) => (
          <div key={task.id} className={styles.taskRow}>
            <div
              className={`${styles.taskButton} ${styles.taskText}`}
              onClick={() => handleEditTask(task)}
            >
              {task.name}
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

      <button className={styles.completedButton} onClick={goToCompletedTasks}>
        Completed tasks
      </button>

      <div className={styles.footerText}>family planner</div>

      {selectedTask && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedTask(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{selectedTask.name}</h3>
            <p className={styles.modalText}>
              <span style={{ fontWeight: "bold" }}>Description:</span>
              <br />
              {selectedTask.description || "No description provided"}
            </p>
            <p className={styles.modalText}>
              <span style={{ fontWeight: "bold" }}>Deadline:</span>{" "}
              {selectedTask.deadline}
            </p>
            <button
              className={styles.okButton}
              onClick={() => setSelectedTask(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {confirmationTask && (
        <div
          className={styles.modalOverlay}
          onClick={() => setConfirmationTask(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Confirm completion</h3>
            <p className={styles.modalText}>
              Did you really complete "{confirmationTask.name}"?
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
        <div
          className={styles.modalOverlay}
          onClick={() => setDeleteConfirmationTask(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Confirm deletion</h3>
            <p className={styles.modalText}>
              Are you sure you want to delete "{deleteConfirmationTask.name}"?
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