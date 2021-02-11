import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  private linkTheme = document.querySelector("link#theme");

  constructor() {
    const url =
      localStorage.getItem("theme") || "./assets/css/colors/default-dark.css";
    this.linkTheme?.setAttribute("href", url);
    localStorage.setItem("theme", url);
  }

  changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute("href", url);
    localStorage.setItem("theme", url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    const links: NodeListOf<Element> = document.querySelectorAll(
      "#themecolors .selector"
    );

    const currentThemeUrl =
      localStorage.getItem("theme") || "./assets/css/colors/default-dark.css";

    const currentTheme = currentThemeUrl.substring(
      20,
      currentThemeUrl.length - 4
    );

    links.forEach((elem: Element) => {
      elem.classList.remove("working");
      if (elem.getAttribute("data-theme") === currentTheme) {
        elem.classList.add("working");
      }
    });
  }
}
