import { Medico } from "../models/medico.model";

export interface CargarMedico {
  ok: boolean;
  medicos: Medico[];
}
