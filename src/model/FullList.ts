import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  private constructor(private _list: ListItem[] = []) {}

  // singleton obj, as there will only be one FullList object
  static obj: FullList;
  public static getInstance() {
    if (!FullList.obj) FullList.obj = new FullList();
    return FullList.obj;
  }

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if (!storedList) return;

    const parsedList : {_id: string, _item:string, _checked: boolean}[] = JSON.parse(storedList);

    parsedList.forEach(itemObj=>{
        const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
        this.addItem(newListItem);
    })
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
