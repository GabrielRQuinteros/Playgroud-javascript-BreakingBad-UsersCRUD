import { User } from "../models/User";
import { UserBD } from "../store/users-store";


export const getUserById = async( id: string | number ) => {

    const url: string = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    
    const response: Response = await fetch( url );
    const userResponse: UserBD = ( await response.json() as UserBD );
    
    return new User( userResponse );
}