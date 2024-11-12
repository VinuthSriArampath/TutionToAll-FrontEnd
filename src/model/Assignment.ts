import { Teacher } from "./Teacher";
import { Course } from "./Course";
import { StudentAssignmentSubmission } from "./StudentAssignmentSubmission";

export class Assignment {
    private id: string;
    private assignmentName: string;
    private dueDate: Date;
    private teacher: Teacher;
    private course: Course;
    private submittedList: StudentAssignmentSubmission[];

    constructor(id: string, assignmentName: string, dueDate: Date, teacher: Teacher, course: Course, submittedList: StudentAssignmentSubmission[]) {
        this.id = id;
        this.assignmentName = assignmentName;
        this.dueDate = dueDate;
        this.teacher = teacher;
        this.course = course;
        this.submittedList = submittedList;
    }

    // Getter and setter for id
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    // Getter and setter for assignmentName
    public getAssignmentName(): string {
        return this.assignmentName;
    }

    public setAssignmentName(assignmentName: string): void {
        this.assignmentName = assignmentName;
    }

    // Getter and setter for dueDate
    public getDueDate(): Date {
        return this.dueDate;
    }

    public setDueDate(dueDate: Date): void {
        this.dueDate = dueDate;
    }

    // Getter and setter for teacher
    public getTeacher(): Teacher {
        return this.teacher;
    }

    public setTeacher(teacher: Teacher): void {
        this.teacher = teacher;
    }

    // Getter and setter for course
    public getCourse(): Course {
        return this.course;
    }

    public setCourse(course: Course): void {
        this.course = course;
    }

    // Getter and setter for submittedList
    public getSubmittedList(): StudentAssignmentSubmission[] {
        return this.submittedList;
    }

    public setSubmittedList(submittedList: StudentAssignmentSubmission[]): void {
        this.submittedList = submittedList;
    }
}
