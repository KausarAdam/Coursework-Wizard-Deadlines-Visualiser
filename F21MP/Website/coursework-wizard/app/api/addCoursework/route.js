    import { NextResponse } from 'next/server';
    import pool from "@/lib/db";

    export async function POST(req) {
    const { courseworkData, subtaskData } = await req.json();

    // Function to increment a date by one day
    function incrementDate(dateString) {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1); // Increment by one day
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
    
    try {
        // Validate dates to ensure they are formatted correctly
        const formattedStartDate = courseworkData.startDate ? new Date(courseworkData.startDate).toISOString().split('T')[0] : null;
        const formattedEndDate = courseworkData.endDate ? new Date(courseworkData.endDate).toISOString().split('T')[0] : null;


        // Insert new coursework into the `coursework` table
        await pool.query(
        'INSERT INTO coursework (coursework_id, course_code, title, description, start_date, end_date, coursework_sequence) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
            subtaskData.courseworkId,
            courseworkData.courseCode,
            courseworkData.title,
            courseworkData.description,
            formattedStartDate,
            formattedEndDate,
            courseworkData.courseworkSequence,
        ]
        );

        // Insert dependent subtasks only if they exist
        if (subtaskData.dependentSubtasks && subtaskData.dependentSubtasks.length > 0) {
            for (const subtask of subtaskData.dependentSubtasks) {
                await pool.query(
                'INSERT INTO subtask (subtask, course_code, coursework_id, title, description, start_date, end_date, task_type, file_attachment, weight, is_locked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    subtask.subtask,
                    subtaskData.courseCode,
                    subtaskData.courseworkId,
                    subtask.title,
                    subtask.description,
                    incrementDate(subtask.startDate),
                    incrementDate(subtask.endDate),
                    subtask.taskType,
                    subtask.fileAttachment,
                    subtask.weight,
                    subtask.isLocked,
                ]
                );
            }
        }

        // // Insert independent subtask if it exists
        if (subtaskData.independentSubtask) {
            const indSubtask = subtaskData.independentSubtask;
            await pool.query(
                'INSERT INTO subtask (subtask, course_code, coursework_id, title, description, start_date, end_date, task_type, file_attachment, weight, is_locked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                indSubtask.subtask,
                subtaskData.courseCode,
                subtaskData.courseworkId,
                indSubtask.title,
                indSubtask.description,
                incrementDate(indSubtask.startDate),
                incrementDate(indSubtask.endDate),
                indSubtask.taskType,
                indSubtask.fileAttachment,
                indSubtask.weight,
                indSubtask.isLocked,
                ]
            );
        }

        return NextResponse.json({ message: 'Coursework and subtasks added successfully' }, { status: 200 });
    } catch (error) {
            console.error('Database insertion error:', error.message); // Log only the message
            console.error('Full error object:', error); // Log the entire error object
            return NextResponse.json({ error: 'Failed to add coursework and subtasks' }, { status: 500 });
        }
    }
