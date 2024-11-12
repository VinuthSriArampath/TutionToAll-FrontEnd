import { Course } from "./Course";
import { RegisteredTeachers } from "./RegisteredTeachers";
import { Assignment } from "./Assignment";
import { Note } from "./Note";

export class Teacher {
    private id: string;
    private firstName: string;
    private lastName: string;
    private dob: Date;
    private contact: string;
    private email: string;
    private address: string;
    private password: string;
    private registeredInstitutes: RegisteredTeachers[];
    private registeredCourses: Course[];
    private managedAssignmentList: Assignment[];
    private managedNoteList: Note[];

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        dob: Date,
        contact: string,
        email: string,
        address: string,
        password: string,
        registeredInstitutes: RegisteredTeachers[],
        registeredCourses: Course[],
        managedAssignmentList: Assignment[],
        managedNoteList: Note[]
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.contact = contact;
        this.email = email;
        this.address = address;
        this.password = password;
        this.registeredInstitutes = registeredInstitutes;
        this.registeredCourses = registeredCourses;
        this.managedAssignmentList = managedAssignmentList;
        this.managedNoteList = managedNoteList;
    }
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }
    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getDob(): Date {
        return this.dob;
    }

    public setDob(dob: Date): void {
        this.dob = dob;
    }

    public getContact(): string {
        return this.contact;
    }

    public setContact(contact: string): void {
        this.contact = contact;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getRegisteredInstitutes(): RegisteredTeachers[] {
        return this.registeredInstitutes;
    }

    public setRegisteredInstitutes(registeredInstitutes: RegisteredTeachers[]): void {
        this.registeredInstitutes = registeredInstitutes;
    }

    public getRegisteredCourses(): Course[] {
        return this.registeredCourses;
    }

    public setRegisteredCourses(registeredCourses: Course[]): void {
        this.registeredCourses = registeredCourses;
    }

    public getManagedAssignmentList(): Assignment[] {
        return this.managedAssignmentList;
    }

    public setManagedAssignmentList(managedAssignmentList: Assignment[]): void {
        this.managedAssignmentList = managedAssignmentList;
    }

    public getManagedNoteList(): Note[] {
        return this.managedNoteList;
    }

    public setManagedNoteList(managedNoteList: Note[]): void {
        this.managedNoteList = managedNoteList;
    }
}
