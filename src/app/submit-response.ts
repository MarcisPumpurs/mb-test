// import { Contact } from "./contact";

export class SubmitResponse{
    public email: string;
    public responseCode: number;
    public checkboxStatus: boolean;
    // private responseCode: number = 0;
    // private contact;
    constructor(
        email: string,
        responseCode: number,
        checkboxStatus: boolean
    ){
        
    }

    // getResponseCode(): number{
    //     return this.responseCode;
    // }

    // getEmail(): string{
    //     return this.contact.getEmail();
    // }

    // public toString(){
    //     return "Object email: " + this.getEmail() + ";\n Object responseCode: " + this.getResponseCode();
    // }
}