import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTaskStatus } from '../../store/slices/taskSlice';
import { formatDateForApi } from '../../utils/dataMappers';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import leftArrow from '../../assets/images/left.png';
import './CompletedTasks.css';

const CompletedTasks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchTasksForDate = useCallback(async (date) => {
    try {
      await dispatch(fetchTasks({
        fromDate: date,
        toDate: date,
        includeCompleted: true
      })).unwrap();
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    const storedDate = localStorage.getItem('selectedDate');
    const today = new Date();
    const formattedToday = formatDateForApi(today);
    
    const dateToUse = storedDate || formattedToday;
    setSelectedDate(dateToUse);

    fetchTasksForDate(dateToUse);
  }, [fetchTasksForDate]);

  const formatDate = (dateString) => {
    try {
      const [year, month, day] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      const newStatus = completed ? 'IN_PROGRESS' : 'COMPLETED';
      
      await dispatch(updateTaskStatus({ 
        id: taskId, 
        status: newStatus 
      })).unwrap();
      
      // Refresh tasks after status update
      await fetchTasksForDate(selectedDate);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Filter tasks based on the selected date
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // For completed tasks, check if completionDate matches selected date
      // For active tasks, check if deadline matches selected date
      const checkDate = task.status === 'COMPLETED' 
        ? task.completionDate 
        : task.deadline;
      
      return checkDate && checkDate.split('T')[0] === selectedDate;
    });
  }, [tasks, selectedDate]);
  
  const completedTasks = useMemo(() =>
    filteredTasks.filter(task => task.completed || task.status === 'COMPLETED'), 
    [filteredTasks]
  );
  
  const activeTasks = useMemo(() =>
    filteredTasks.filter(task => !task.completed && task.status !== 'COMPLETED'), 
    [filteredTasks]
  );

  return (
    <div className="completed-page">
      <div className="top-header">
        <ProfileHeader />
      </div>
  
      <div className="date-label-display">
        {formatDate(selectedDate)}
      </div>
  
      {error && <div className="error-message">{error}</div>}
  
      {loading ? (
        <div className="loading-indicator">Loading tasks...</div>
      ) : (
        <>
          {/* Show completed tasks */}
          {completedTasks.length > 0 && (
            <>
              <h4 className="section-title">Completed Tasks</h4>
              <div className="task-list">
                {completedTasks.map((task) => (
                  <div 
                    className="task-card completed" 
                    key={task.id}
                    onClick={() => toggleTaskCompletion(task.id, true)}
                  >
                    {task.name || task.title || 'Untitled Task'}
                    {task.description && (
                      <div className="task-description">{task.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
    
          {/* Show active tasks */}
          {activeTasks.length > 0 && (
            <>
              <h4 className="section-title">Active Tasks</h4>
              <div className="task-list">
                {activeTasks.map((task) => (
                  <div 
                    className="task-card" 
                    key={task.id}
                    onClick={() => toggleTaskCompletion(task.id, false)}
                  >
                    {task.name || task.title || 'Untitled Task'}
                    {task.description && (
                      <div className="task-description">{task.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
    
          {completedTasks.length === 0 && activeTasks.length === 0 && (
            <div className="no-tasks">No tasks for this date</div>
          )}
        </>
      )}
  
      <div className="back-section">
        <img
          src={leftArrow}
          alt="back"
          className="back-arrow-img"
          onClick={() => navigate('/calendar')}
        />
        <p className="footer-title">family planner</p>
      </div>
    </div>
  );
};

export default CompletedTasks;