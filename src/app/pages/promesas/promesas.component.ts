import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {
    //   console.log("inició la promesa");
    //   if (false) {
    //     resolve("esto es el resolve");
    //   } else {
    //     reject("esto es reject");
    //   }
    // });
    // promesa
    //   .then((mensaje) => {
    //     console.log("entró en el then", mensaje);
    //   })
    //   .catch((error) => {
    //     console.log("entró en el catch:", error);
    //   });
    // console.log("fin del init");

    this.getUsuarios().then((usuarios: any[]) => {
      console.log(usuarios);
    });
  }

  getUsuarios(): Promise<any> {
    return new Promise((resolve) => {
      fetch("https://reqres.in/api/users")
        .then((resp) => resp.json())
        .then((body) => console.log(body.data));
    });
  }
}
