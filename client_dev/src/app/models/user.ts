export class User {
  gettoken: boolean | undefined;
  constructor(
    public _id: string,
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public avatar: string,
    public created_at: string
  ) {}
}
