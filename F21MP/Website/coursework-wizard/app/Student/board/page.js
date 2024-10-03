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

  const courseworkWeeks = [
    { week: 1, subtasks: [{ id: 1, text: "F21SF - Subtask 1.1", details: "Subtask details", dueDate: new Date("2024-09-20") }] },
    { week: 2, subtasks: [{ id: 2, text: "F21SF - Subtask 2.1", details: "Subtask details", dueDate: new Date("2024-09-27") }] },
  ];

  // On mount, load coursework subtasks if no tasks are in "todo"
  useEffect(() => {
    if (tasks.todo.length === 0) {
      const allSubtasks = courseworkWeeks.flatMap(coursework => coursework.subtasks);
      setTasks((prev) => ({
        ...prev,
        todo: allSubtasks.map(subtask => ({ 
          id: subtask.id, 
          text: subtask.text, 
          details: subtask.details, 
          dueDate: subtask.dueDate, 
        })),
      }));
    }
  }, []); // Empty dependency array ensures it runs only on mount

  const moveTask = (taskId, fromColumn, toColumn) => {
    // Find the task to move from the current column
    const taskToMove = tasks[fromColumn].find((task) => task.id === taskId);
  
    if (!taskToMove || fromColumn === toColumn) {
      return;
    }
  
    // Create a new task without mutating the state directly
    setTasks((prev) => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter((task) => task.id !== taskId),
      [toColumn]: [...prev[toColumn], taskToMove],
    }));
  };

  const Task = ({ task, fromColumn }) => {
    const [, drag] = useDrag(() => ({
      type: ItemTypes.TASK,
      item: { id: task.id, fromColumn },
    }));

    return (
      <div ref={drag} className={styles.task}>
        <div className={styles.taskTitle}>{task.text}</div>
        <div className={styles.taskDetails}>
          {task.details}
          <br />
          Due on {task.dueDate.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
          })}
        </div>
      </div>
    );
  };

  const Column = ({ title, tasks, columnName }) => {
    const [, drop] = useDrop({
      accept: ItemTypes.TASK,
      drop: (item) => {
        // Move the task from one column to another
        moveTask(item.id, item.fromColumn, columnName);
      },
    });
  
    return (
      <div className={styles.column} ref={drop}>
        <h3>{title}</h3>
        <hr style={{ width: "100.5%", marginLeft: "0", marginBottom: "15px"}} />
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
          <h1 className={styles.heading}>Board</h1>
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
