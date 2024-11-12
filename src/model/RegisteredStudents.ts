export class RegisteredStudents {
    private studentId: string;
    private instituteId: string;
    private instituteName: string;
    private date: Date;
    private courses: StudentRegisteredCourses[];

    constructor(
        studentId: string,
        instituteId: string,
        instituteName: string,
        date: Date,
        courses: StudentRegisteredCourses[]
    ) {
        this.studentId = studentId;
        this.instituteId = instituteId;
        this.instituteName = instituteName;
        this.date = date;
        this.courses = courses;
    }

    // Getter and setter for studentId
    public getStudentId(): string {
        return this.studentId;
    }

    public setStudentId(studentId: string): void {
        this.studentId = studentId;
    }

    // Getter and setter for instituteId
    public getInstituteId(): string {
        return this.instituteId;
    }

    public setInstituteId(instituteId: string): void {
        this.instituteId = instituteId;
    }

    // Getter and setter for instituteName
    public getInstituteName(): string {
        return this.instituteName;
    }

    public setInstituteName(instituteName: string): void {
        this.instituteName = instituteName;
    }

    // Getter and setter for date
    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    // Getter and setter for courses
    public getCourses(): StudentRegisteredCourses[] {
        return this.courses;
    }

    public setCourses(courses: StudentRegisteredCourses[]): void {
        this.courses = courses;
    }
}

// Example StudentRegisteredCourses class definition
class StudentRegisteredCourses {
    private courseId: string;
    private studentId: string;
    private date: Date;

    constructor(courseId: string, studentId: string, date: Date) {
        this.courseId = courseId;
        this.studentId = studentId;
        this.date = date;
    }

    // Getter and setter for courseId
    public getCourseId(): string {
        return this.courseId;
    }

    public setCourseId(courseId: string): void {
        this.courseId = courseId;
    }

    // Getter and setter for studentId
    public getStudentId(): string {
        return this.studentId;
    }

    public setStudentId(studentId: string): void {
        this.studentId = studentId;
    }

    // Getter and setter for date
    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }
}
