import { Student } from "./Student";
import { Assignment } from "./Assignment";

export class StudentAssignmentSubmission {
    private student: Student;
    private assignment: Assignment;
    private date: Date;

    constructor(student: Student, assignment: Assignment, date: Date) {
        this.student = student;
        this.assignment = assignment;
        this.date = date;
    }

    // Getter and setter for student
    public getStudent(): Student {
        return this.student;
    }

    public setStudent(student: Student): void {
        this.student = student;
    }

    // Getter and setter for assignment
    public getAssignment(): Assignment {
        return this.assignment;
    }

    public setAssignment(assignment: Assignment): void {
        this.assignment = assignment;
    }

    // Getter and setter for date
    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }
}
