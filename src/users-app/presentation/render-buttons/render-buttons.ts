import usersStore from "../../store/users-store";
import '../render-buttons/render-buttons.css'
import { renderTable } from "../render-table/render-table";


export const renderButtons: Function = ( element: HTMLDivElement ):void => {

    const nextButton = document.createElement( "button" );
    nextButton.innerText = "Next >";

    const currentPageSpan = document.createElement("span");
    currentPageSpan.id = "current-page-span";
    currentPageSpan.innerText = usersStore.getCurrentPage(); 

    const prevButton = document.createElement( "button" );    
    prevButton.innerText = "< Prev";

    element.append( prevButton, currentPageSpan, nextButton );


    nextButton.addEventListener( "click", async() => {
        await usersStore.loadNextPage();
        renderTable(element);
        currentPageSpan.innerText= usersStore.getCurrentPage();
    })

    prevButton.addEventListener("click", async()=> {
        await usersStore.loadPreviousPage();
        renderTable(element);
        currentPageSpan.innerText= usersStore.getCurrentPage();
    })

} 