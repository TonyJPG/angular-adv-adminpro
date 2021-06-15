import { Hospital } from "./hospital.model";

interface MedicoUser {
  _id: string;
  nombre: string;
  img: string;
}

export class Medico {
  constructor(
    public nombre: string,
    public mid?: string,
    public img?: string,
    public usuario?: MedicoUser,
    public hospital?: Hospital
  ) {}
}
