import { RegisteredStudents } from "./RegisteredStudents";
import { StudentAssignmentSubmission } from "./StudentAssignmentSubmission";

export class Student {
    private id: string;
    private firstName: string;
    private lastName: string;
    private dob: Date;
    private contact: string;
    private email: string;
    private address: string;
    private password: string;
    private registeredInstitutes: RegisteredStudents[];
    private submissionList: StudentAssignmentSubmission[];

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        dob: Date,
        contact: string,
        email: string,
        address: string,
        password: string,
        registeredInstitutes: RegisteredStudents[],
        submissionList: StudentAssignmentSubmission[]
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
        this.submissionList = submissionList;
    }

    // Getter and setter for id
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    // Getter and setter for firstName
    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    // Getter and setter for lastName
    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    // Getter and setter for dob
    public getDob(): Date {
        return this.dob;
    }

    public setDob(dob: Date): void {
        this.dob = dob;
    }

    // Getter and setter for contact
    public getContact(): string {
        return this.contact;
    }

    public setContact(contact: string): void {
        this.contact = contact;
    }

    // Getter and setter for email
    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
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

    // Getter and setter for registeredInstitutes
    public getRegisteredInstitutes(): RegisteredStudents[] {
        return this.registeredInstitutes;
    }

    public setRegisteredInstitutes(registeredInstitutes: RegisteredStudents[]): void {
        this.registeredInstitutes = registeredInstitutes;
    }

    // Getter and setter for submissionList
    public getSubmissionList(): StudentAssignmentSubmission[] {
        return this.submissionList;
    }

    public setSubmissionList(submissionList: StudentAssignmentSubmission[]): void {
        this.submissionList = submissionList;
    }
}
