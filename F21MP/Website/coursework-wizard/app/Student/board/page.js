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
    locked: [
      { id: 1, text: "F21SF - Subtask 1", details: "Details for Subtask 1", dueDate: new Date("2024-09-24"), isLocked: true, unlockTime: new Date("2024-10-01T00:00:00") },
      { id: 2, text: "F21SF - Subtask 2", details: "Details for Subtask 2", dueDate: new Date("2024-09-25"), isLocked: true, unlockTime: new Date("2024-10-05T00:00:00") },
      { id: 3, text: "F21SF - Subtask 3", details: "Details for Subtask 3", dueDate: new Date("2024-09-26"), isLocked: true, unlockTime: new Date("2024-10-05T00:00:00") },
      { id: 4, text: "F21SF - Subtask 4", details: "Details for Subtask 4", dueDate: new Date("2024-09-27"), isLocked: true, unlockTime: new Date("2024-10-05T00:00:00") },
    ],
  });

  const courseworkWeeks = [
    { week: 1, subtasks: [{ id: 1, text: "F21SF - Subtask 1.1", details: "Subtask details", dueDate: new Date("2024-09-20") }] },
    { week: 2, subtasks: [{ id: 2, text: "F21SF - Subtask 2.1", details: "Subtask details", dueDate: new Date("2024-09-27") }] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const unlockedTasks = tasks.locked.filter((task) => task.unlockTime <= now);
      if (unlockedTasks.length > 0) {
        setTasks((prev) => ({
          ...prev,
          todo: [...prev.todo, ...unlockedTasks],
          locked: prev.locked.filter((task) => task.unlockTime > now),
        }));
      }
    }, 1000); // Check every second
    return () => clearInterval(interval);
  }, [tasks.locked]);

  useEffect(() => {
    if (tasks.todo.length === 0) {
      const allSubtasks = courseworkWeeks.flatMap(coursework => coursework.subtasks);
      setTasks((prev) => ({
        ...prev,
        todo: allSubtasks.map(subtask => ({ id: subtask.id, text: subtask.text, details: subtask.details, dueDate: subtask.dueDate, isLocked: false })),
      }));
    }
  }, []); // Empty dependency array ensures it runs only on mount

  const moveTask = (taskId, fromColumn, toColumn) => {
    const taskToMove = tasks[fromColumn].find((task) => task.id === taskId);

    if (!taskToMove || fromColumn === toColumn) {
      return;
    }

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
      canDrag: !task.isLocked,
    }));

    return (
      <div ref={drag} className={`${styles.task} ${task.isLocked ? styles.locked : ""}`}>
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
      drop: (item) => moveTask(item.id, item.fromColumn, columnName),
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
              <div className={styles.lockedTasks}>
                <h3>Locked Subtasks</h3>
                <hr style={{ width: "100.5%", marginLeft: "0" }}/>
                <div className={styles.lockedTasksContainer}>
                  {tasks.locked.map((task) => (
                    <div key={task.id} className={styles.taskLocked}>
                      {task.text} (Unlocks on {task.unlockTime.toLocaleDateString("en-GB")})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DndProvider>
        </div>
        <Footer />
      </div>
    </div>
  );
}
