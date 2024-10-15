"use client";

import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./page.module.css";
import Footer from "../Footer";
import Notification from "../student_notification";
import StudentMenu from "../student_menu";

const ItemTypes = {
  TASK: "task",
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null; // Retrieve username from local storage

  // Fetch unlocked subtasks for the logged-in user
  useEffect(() => {
    const fetchTasks = async () => {
      if (username) {
        const response = await fetch(`/api/getKanban?username=${username}`);
        const data = await response.json();
    
        if (response.ok) {
          const categorizedTasks = {
            todo: [],
            inProgress: [],
            done: [],
          };
    
          data.forEach(subtask => {
            const task = {
              id: `${subtask.subtask}-${subtask.course_code}-${subtask.coursework_id}`, // Create a unique ID
              course: subtask.course_code,
              text: subtask.title,
              dueDate: new Date(subtask.end_date),
              status_subtask: subtask.status || 'to-do', // Default to 'to-do' if status is undefined
            };
    
            switch (task.status_subtask) {
              case 'to-do':
                categorizedTasks.todo.push(task);
                break;
              case 'in progress':
                categorizedTasks.inProgress.push(task);
                break;
              case 'done':
                categorizedTasks.done.push(task);
                break;
              default:
                categorizedTasks.todo.push(task); // Default to TODO if status is unknown
                break;
            }
          });
    
          categorizedTasks.todo.sort((a, b) => a.dueDate - b.dueDate);
          setTasks(categorizedTasks);
        } else {
          console.error(data.error); // Handle error
        }
      }
    };
    
    fetchTasks();
  }, [username]);

  const moveTask = async (taskId, fromColumn, toColumn) => {
    const taskToMove = tasks[fromColumn].find((task) => task.id === taskId);

    if (!taskToMove || fromColumn === toColumn) {
      return;
    }

    // Update the task state optimistically
    setTasks((prev) => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter((task) => task.id !== taskId),
      [toColumn]: [...prev[toColumn], taskToMove],
    }));

    // Extract necessary data for updating the submission table
    const [subtask, course_code, coursework_id] = taskId.split('-');
    const statusMap = {
      todo: 'to-do',
      inProgress: 'in progress',
      done: 'done'
    };
    const newStatus = statusMap[toColumn]; // Determine the new status based on the target column

    // Update the status in the database
    const updateResponse = await fetch('/api/updateSubtaskStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subtask,
        course_code,
        coursework_id,
        username, // Include the username of the logged-in user
        newStatus // New status to update
      }),
    });

    if (!updateResponse.ok) {
      console.error('Failed to update status in submission table');
      // Optionally revert the optimistic update here if the API call fails
      setTasks((prev) => ({
        ...prev,
        [toColumn]: prev[toColumn].filter((task) => task.id !== taskId),
        [fromColumn]: [...prev[fromColumn], taskToMove],
      }));
    }
  };

  const Task = ({ task, fromColumn }) => {
    const [, drag] = useDrag(() => ({
      type: ItemTypes.TASK,
      item: { id: task.id, fromColumn },
    }));

    const formattedDueDate = `${String(task.dueDate.getDate()).padStart(2, '0')}/${String(task.dueDate.getMonth() + 1).padStart(2, '0')}/${task.dueDate.getFullYear()}`;

    return (
      <div ref={drag} className={styles.task}>
        <div className={styles.taskContent}>
          <div className={styles.taskTitle}>{task.course} - {task.text}</div>
          <span className={styles.taskDetails}>{formattedDueDate}</span>
        </div>
      </div>
    );
  };

  const Column = ({ title, tasks, columnName }) => {
    const [, drop] = useDrop({
      accept: ItemTypes.TASK,
      drop: (item) => {
        moveTask(item.id, item.fromColumn, columnName);
      },
    });

    return (
      <div className={styles.column} ref={drop}>
        <h3>
          {title} ({tasks.length})
        </h3>
        <hr style={{ width: "100.5%", marginLeft: "0", marginBottom: "15px" }} />
        {tasks.map((task) => (
          <Task key={task.id} task={task} fromColumn={columnName} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <StudentMenu />
      <div className={styles.boardPage}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Progress Board</h1>
          <Notification />
        </div>
        <div className={styles.withoutFooter}>
          <hr style={{ width: "100.5%", marginLeft: "0" }} />
          <DndProvider backend={HTML5Backend}>
            <div className={styles.kanbanContainer}>
              <div className={styles.flexColumns}>
                <Column title="TO DO" tasks={tasks.todo} columnName="todo" />
                <Column title="IN PROGRESS" tasks={tasks.inProgress} columnName="inProgress" />
                <Column title="DONE ✓" tasks={tasks.done} columnName="done" />
              </div>
            </div>
          </DndProvider>
        </div>
        <Footer />
      </div>
    </div>
  );
}
