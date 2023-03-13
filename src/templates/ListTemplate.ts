import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {

  ul: HTMLUListElement;

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

   // singleton obj, as there will only be one ListTemplate object
  static obj: ListTemplate;
  public static getInstance(){
    if(!ListTemplate.obj) ListTemplate.obj=new ListTemplate();
    return ListTemplate.obj;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((item) => {
      // individual list name
      const li: HTMLElement = document.createElement("li");
      li.className = "item";

      // individual input checkbox
      const check: HTMLInputElement = document.createElement("input");
      check.type = "checkbox";
      check.id = item.id;
      check.checked = item.checked;
      li.append(check);
      check.addEventListener("change", () => {
        item.checked != item.checked;
        fullList.save();
      });

      // label
      const label: HTMLLabelElement = document.createElement("label");
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      // button
      const button: HTMLButtonElement = document.createElement("button");
      button.className = "button";
      button.textContent = "X";
      li.append(button);

      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  }
}
