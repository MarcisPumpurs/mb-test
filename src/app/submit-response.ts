
export class SubmitResponse{
    public email: string;
    public responseCode: number;
    public checkboxStatus: boolean;
    constructor(
        email: string,
        responseCode: number,
        checkboxStatus: boolean
    ){ }
}