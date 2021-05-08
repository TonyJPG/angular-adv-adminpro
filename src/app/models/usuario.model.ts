import { environment } from "../../environments/environment";

const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}

  public get imagenUrl(): string {
    // retorna imagen de google (si usamos google sign-in para logear)
    if (this.img?.includes("https")) {
      return this.img;
    }

    // retorna imagen del servidor si hicimos login normal
    if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }
}
