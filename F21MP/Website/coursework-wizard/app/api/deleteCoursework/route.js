import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(request) {
    const url = new URL(request.url);
    const coursework_id = url.searchParams.get("coursework_id");

    console.log("Attempting to delete coursework_id:", coursework_id); // Log the ID for debugging

    if (!coursework_id) {
        return NextResponse.json({ error: 'Coursework ID is required.' }, { status: 400 });
    }

    try {
        const [result] = await pool.query('DELETE FROM coursework WHERE coursework_id = ?', [coursework_id]);
        console.log("Delete result:", result); // Log the result for debugging
    
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'No coursework found with the provided ID.' }, { status: 404 });
        }
    
        return NextResponse.json({ message: 'Coursework deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting coursework:", error);
        return NextResponse.json({ error: error.message || 'Failed to delete coursework' }, { status: 500 });
    }
    
}
