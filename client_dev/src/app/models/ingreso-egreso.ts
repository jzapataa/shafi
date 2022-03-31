export class IngresoEgreso {
  constructor(
    public _id: string,
    public description: string,
    public amount: number,
    public type: string,
    public category: string,
    public date: Date,
    public user: string
  ) {}
}
