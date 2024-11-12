import { StudentRegisteredCourses } from "./StudentRegisteredCourses";
import { Assignment } from "./Assignment";

export class Course {
    private id: string;
    private name: string;
    private type: string;
    private teacherId: string;
    private teacherName: string;
    private studentCoursesList: StudentRegisteredCourses[];
    private assignmentList: Assignment[];

    constructor(
        id: string,
        name: string,
        type: string,
        teacherId: string,
        teacherName: string,
        studentCoursesList: StudentRegisteredCourses[],
        assignmentList: Assignment[]
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.studentCoursesList = studentCoursesList;
        this.assignmentList = assignmentList;
    }

    // Getters and Setters
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public getTeacherId(): string {
        return this.teacherId;
    }

    public setTeacherId(teacherId: string): void {
        this.teacherId = teacherId;
    }

    public getTeacherName(): string {
        return this.teacherName;
    }

    public setTeacherName(teacherName: string): void {
        this.teacherName = teacherName;
    }

    public getStudentCoursesList(): StudentRegisteredCourses[] {
        return this.studentCoursesList;
    }

    public setStudentCoursesList(studentCoursesList: StudentRegisteredCourses[]): void {
        this.studentCoursesList = studentCoursesList;
    }

    public getAssignmentList(): Assignment[] {
        return this.assignmentList;
    }

    public setAssignmentList(assignmentList: Assignment[]): void {
        this.assignmentList = assignmentList;
    }
}
