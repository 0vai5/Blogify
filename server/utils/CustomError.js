export class CustomError extends Error {
  constructor(status = 500, message = "An Error Occured") {
    super(message);
    this.status = status;
    this.data = data;
  }
}
