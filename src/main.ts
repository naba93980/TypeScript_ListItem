import './css/style.css'
import FullList from './model/FullList';
import ListTemplate from './templates/ListTemplate';
import ListItem from './model/ListItem';


const fullList = FullList.getInstance();
const template = ListTemplate.getInstance();


// form to take item input
const itemEntryForm : HTMLFormElement = document.getElementById('itemEntryForm') as HTMLFormElement;
itemEntryForm.addEventListener('submit',(e) : void =>{
    e.preventDefault();

    const input : HTMLInputElement = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    const itemId: number = fullList.list.length
    ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
    :1 
    const newItem = new ListItem(itemId.toString(), newEntryText)
    fullList.addItem(newItem)

    template.render(fullList);
})

// button to clear items
const clearItems : HTMLButtonElement = document.getElementById('clearItemsButton') as HTMLButtonElement;
clearItems.addEventListener('click',(): void =>{
    fullList.clearList();
    template.clear();
})


// LOADING THE ENTIRE DATA ON DOM
fullList.load();
template.render(fullList)