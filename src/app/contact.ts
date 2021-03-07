export class Contact{
    email: string = '';
    constructor(
        email: string,
        status?: number,
        id?: number,
        date?: string,
        validation?: number

        // model: string,
        // price: number,
        // id?:   number
    ){
        this.setEmail(email);
    }

    public setEmail(email: string){
        this.email = email;
    }

    public getEmail(): string{
        return this.email;
    }

}