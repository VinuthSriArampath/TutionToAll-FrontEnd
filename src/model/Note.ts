import { Teacher } from "./Teacher";
export class Note {
    private id: string;
    private title: string;
    private teacher: Teacher;

    constructor(id: string, title: string, teacher: Teacher) {
        this.id = id;
        this.title = title;
        this.teacher = teacher;
    }

    // Getter and setter for id
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    // Getter and setter for title
    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    // Getter and setter for teacher
    public getTeacher(): Teacher {
        return this.teacher;
    }

    public setTeacher(teacher: Teacher): void {
        this.teacher = teacher;
    }
}