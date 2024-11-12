import { Teacher } from "./Teacher";

export class RegisteredTeachers {
    private teacherId: string;
    private instituteId: string;
    private date: Date;

    constructor(teacherId: string, instituteId: string, date: Date) {
        this.teacherId = teacherId;
        this.instituteId = instituteId;
        this.date = date;
    }

    // Getter and setter for teacherId
    public getTeacherId(): string {
        return this.teacherId;
    }

    public setTeacherId(teacherId: string): void {
        this.teacherId = teacherId;
    }

    // Getter and setter for instituteId
    public getInstituteId(): string {
        return this.instituteId;
    }

    public setInstituteId(instituteId: string): void {
        this.instituteId = instituteId;
    }

    // Getter and setter for date
    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }
}
