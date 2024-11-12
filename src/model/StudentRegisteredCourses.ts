export class StudentRegisteredCourses {
    private studentId: string;
    private courseId: string;
    private date: Date;

    constructor(studentId: string, courseId: string, date: Date) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.date = date;
    }

    // Getter and setter for studentId
    public getStudentId(): string {
        return this.studentId;
    }

    public setStudentId(studentId: string): void {
        this.studentId = studentId;
    }

    // Getter and setter for courseId
    public getCourseId(): string {
        return this.courseId;
    }

    public setCourseId(courseId: string): void {
        this.courseId = courseId;
    }

    // Getter and setter for date
    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }
}
