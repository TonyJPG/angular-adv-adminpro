interface HospitalUser {
  _id: string;
  nombre: string;
  img: string;
}

export class Hospital {
  constructor(
    public nombre: string,
    public hid?: string,
    public img?: string,
    public usuario?: HospitalUser
  ) {}
}
