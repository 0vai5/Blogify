export class ApiResponse {
    constructor(status = 500, message = "something went wrong", data = [], token = null) {

        this.status = status;
        this.message = message

        if(data) {
            this.data = data;
        };

        if(token) {
            this.token = token
        }
    }
}