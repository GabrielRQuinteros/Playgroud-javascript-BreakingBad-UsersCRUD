import modalHTML from "./render-modal.html?raw";
import "./render-modal.css";
import usersStore, { UserBD } from "../../store/users-store";
import { User } from "../../models/User";
import { saveUser } from "../../use-cases/save-user";
import { renderTable } from "../render-table/render-table";
import { getUserById } from "../../use-cases/get-user-by-id";

let modal: HTMLDivElement|undefined;
let form: HTMLFormElement;
let loadedModal: number | string;

export const renderModal = ( element: HTMLDivElement) => {

    if( modal ) return ;

    modal = document.createElement("div");
    modal.innerHTML = modalHTML;
    modal.className = "modal-container hide-modal";
    element.append(modal);

    modal.addEventListener( "click", (event)=> {
        if( (event.target as HTMLElement).className == "modal-container"  )
            hideModal();
    } );

    form = modal.querySelector("form")!;

    form.addEventListener("submit", async( event ) => {
        event.preventDefault(); // evita que se envie el formulario -> Por tanto -> Que se recargue la pagina completa.

        const formData = new FormData(form);
        
        let userData: any = {};

        for (const [key, value] of formData) {
            
            switch( key ) {
                case "balance":
                    userData[key] = Number(value);
                    break;
                case "isActive":
                    userData[key] = value === "on";
                    break;
                case "firstName":
                    userData["first_name"] = value;
                    break;
                case "lastName":
                    userData["last_name"] = value;
                    break;
                default:
                    throw new Error("Form parsed incorrectly");
            }

        }

        const savedUser: User = await saveUser( new User( userData as UserBD ) );
        usersStore.onUserChange(savedUser);
        renderTable(element);
        hideModal();
    });

}

export const showModal = async (id: number | string | undefined) => {
    
    if( id ) {
        const user: User = await getUserById( id );
        setFormValues( user );
    }
    
    modal?.classList.remove("hide-modal");
    
}

export const hideModal = () => {
    modal?.classList.add("hide-modal");
    form?.reset();
}


const setFormValues  = ( user: User ) => {

    (form.querySelector('[name="firstName"]') as HTMLInputElement).value = user.firstName!;
    (form.querySelector('[name="lastName"]') as HTMLInputElement).value = user.lastName!;
    (form.querySelector('[name="balance"]') as HTMLInputElement).value = user.balance!.toString();
    (form.querySelector('[name="isActive"]') as HTMLInputElement).checked = user.isActive!;

} 