import { UsersPage } from "../store/users-store";
import { User } from "../models/User";

export const loadUsersByPage: Function = async ( pageNumber: number ): Promise<User[]|undefined> => {

    let url: string = `${import.meta.env.VITE_BASE_URL}/users?_page=${pageNumber}`;
    const response: Response = await fetch(url);

    if( response.status === 200 ) {
        const page: UsersPage = await response.json();
        const { data, last } = page;
        if( pageNumber > last ) return [];
        const users =  data.map( userBD => new User( userBD ) );
        return users;
    } else {
        return undefined;
    }

}