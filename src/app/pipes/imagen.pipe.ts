import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environments/environment";

const base_url = environment.base_url;

@Pipe({
  name: "imagen",
})
export class ImagenPipe implements PipeTransform {
  transform(
    img: string | undefined,
    tipo: "usuarios" | "hospitales" | "medicos"
  ): string {
    // retorna imagen de google (si usamos google sign-in para logear)
    if (img?.includes("https")) {
      return img;
    }
    // retorna imagen del servidor si hicimos login normal
    if (img) {
      return `${base_url}/upload/${tipo}/${img}`;
    } else {
      return `${base_url}/upload/${tipo}/no-image`;
    }
  }
}
