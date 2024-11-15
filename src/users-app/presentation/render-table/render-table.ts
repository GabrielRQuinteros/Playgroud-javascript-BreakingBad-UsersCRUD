import { User } from '../../models/User';
import usersStore from '../../store/users-store'
import { showModal } from '../render-modal/render-modal';
import './render-table.css'

let table: HTMLElement;

const createTable= ()=> {
    table = document.createElement("table");
    const headers: HTMLElement = document.createElement( "thead" );
    headers.innerHTML = 
    `<tr>
        <th> Id </th>
        <th> First Name </th>
        <th> Last Name </th>
        <th> Balance </th>
        <th> Active </th>
        <th> Actions </th>
    </tr>`

    const body = document.createElement("tbody");
    table.append(headers, body);
    return table;
}


export const renderTable = ( element: HTMLDivElement ) => {

    const users: User[] = usersStore.getCurrentUsers();

    if( !table ) {
        table = createTable();
        element.append( table );
        

        table.addEventListener("click", (event) => {
            
            const element: HTMLElement= (event.target as HTMLElement).closest(".select-user")!;
            if( !element) return;
            const id = element.getAttribute("data-id")!;    
            showModal( id );
            
        } );

        table.addEventListener("click", (event) => {
            
            const element: HTMLElement | null = (event.target as HTMLElement).closest(".delete-user");
            if( !element) return;
            
            const id = element.getAttribute("data-id")!;
        
        } );
    }

    let tbodyData: string = "";
    users.forEach( user => {
        let row =
        `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.balance}</td>
            <td>${user.isActive}</td>
            <td>
                <a href="#" class="select-user"  data-id= "${user.id}"> Edit </a>
                <a href="#" class="delete-user"  data-id= "${user.id}"> Delete </a>
            </td>
        </tr>`
        tbodyData+=row; 
    });
    document.querySelector("tbody")!.innerHTML= tbodyData;

}