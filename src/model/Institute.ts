import { RegisteredStudents } from "./RegisteredStudents";
import { RegisteredTeachers } from "./RegisteredTeachers";
import { Course } from "./Course";

export class Institute {
    private id: string;
    private name: string;
    private email: string;
    private contact: string;
    private address: string;
    private password: string;
    private registeredStudents: RegisteredStudents[];  // Array of RegisteredStudents
    private registeredTeachers: RegisteredTeachers[];  // Array of RegisteredTeachers
    private courseList: Course[];  // Array of Course

    constructor(
        id: string,
        name: string,
        email: string,
        contact: string,
        address: string,
        password: string,
        registeredStudents: RegisteredStudents[],
        registeredTeachers: RegisteredTeachers[],
        courseList: Course[]
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.address = address;
        this.password = password;
        this.registeredStudents = registeredStudents;
        this.registeredTeachers = registeredTeachers;
        this.courseList = courseList;
    }

    // Getter and setter for id
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    // Getter and setter for name
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    // Getter and setter for email
    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    // Getter and setter for contact
    public getContact(): string {
        return this.contact;
    }

    public setContact(contact: string): void {
        this.contact = contact;
    }

    // Getter and setter for address
    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    // Getter and setter for password
    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    // Getter and setter for registeredStudents
    public getRegisteredStudents(): RegisteredStudents[] {
        return this.registeredStudents;
    }

    public setRegisteredStudents(registeredStudents: RegisteredStudents[]): void {
        this.registeredStudents = registeredStudents;
    }

    // Getter and setter for registeredTeachers
    public getRegisteredTeachers(): RegisteredTeachers[] {
        return this.registeredTeachers;
    }

    public setRegisteredTeachers(registeredTeachers: RegisteredTeachers[]): void {
        this.registeredTeachers = registeredTeachers;
    }

    // Getter and setter for courseList
    public getCourseList(): Course[] {
        return this.courseList;
    }

    public setCourseList(courseList: Course[]): void {
        this.courseList = courseList;
    }
}
