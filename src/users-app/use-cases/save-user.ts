import { User } from '../models/User';
import { UserBD } from '../store/users-store';



export const saveUser = async( user: User  ): Promise<User> => {
    
    
    if( !user.firstName || !user.lastName || user.firstName.trim().length == 0 || user.lastName.trim().length == 0 )
        throw new Error("First name and last name are required");


    if( user.id )
        throw new Error("TODO: Create");

    const updatedUser: UserBD = await createUser( user );
    return new User( updatedUser );
}

const createUser = async (user: User): Promise<UserBD> => {
    const url = `${import.meta.env.VITE_BASE_URL}/users` 
    const userBD: UserBD = user.toUserBD();
    const response: Response = await fetch( url, {
                                                    method: "POST",
                                                    body: JSON.stringify(userBD),
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                } 
                                            );
    return await response.json();
}
