import { getAllAssignments, createAssignment } from '../services/assignmentService.js';
import { sendResponse, sendError } from '../utils/responseHelper.js';

export const listAssignments = async (req, res) => {
    try {
        const { classId } = req.query;
        const assignments = await getAllAssignments(classId);
        return sendResponse(res, 200, assignments);
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

export const addAssignment = async (req, res) => {
    try {
        const { title, question, subject, dueDate, classId, teacherId, questionFile, questionFileName, notesFile, notesFileName } = req.body;
        const assignment = await createAssignment({
            title,
            question,
            subject,
            dueDate: new Date(dueDate),
            classId,
            teacherId,
            questionFile,
            questionFileName,
            notesFile,
            notesFileName
        });
        return sendResponse(res, 201, assignment);
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};
