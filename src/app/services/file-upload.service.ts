import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  constructor() {}

  async actualizarFoto(
    archivo: File,
    tipo: "usuarios" | "medicos" | "hospitales",
    id: string | undefined
  ): Promise<any> {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append("imagen", archivo);

      const resp = await fetch(url, {
        method: "PUT",
        headers: { "x-token": localStorage.getItem("token") || "" },
        body: formData,
      });

      console.log(await resp.json());
      return "Nombre de la imagen...";
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
