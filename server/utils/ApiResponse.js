export class ApiResponse {
    constructor(status = 500, message, data = [], token = null) {

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