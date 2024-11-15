import { User } from "../models/User";
import { loadUsersByPage } from "../use-cases/load-users-by-page";

export interface UsersPage {
    first: number;
    prev:  null|number;
    next:  null|number;
    last:  number;
    pages: number;
    items: number;
    data:  UserBD[];
}

export interface UserBD {
    id:         string|undefined;
    isActive:   boolean|undefined;
    balance:    number|undefined;
    avatar:     string|undefined;
    first_name: string|undefined;
    last_name:  string|undefined;
    gender:     Gender|undefined;
}

export enum Gender {
    Female = "female",
    Male = "male",
}


interface AppState {
    currentPage: number;
    users: User[];
}

const state: AppState = {
    currentPage: 0,
    users: []
}

const loadNextPage: Function = async (): Promise<void> => {
    const loadedUsers:User[]|undefined= await loadUsersByPage( state.currentPage + 1 );
    if( !loadedUsers || loadedUsers.length == 0 ) return;
    state.currentPage+= 1;
    state.users= loadedUsers;
}

const loadPreviousPage: Function = async (): Promise<void> => {

    if( state.currentPage == 1 ) return;
    const loadedUsers:User[]= await loadUsersByPage( state.currentPage - 1 );
    state.currentPage-= 1;
    state.users= loadedUsers;
}

const onUserChange: Function = async (): Promise<void> => {
    throw new Error("Not Implemented");
}

const reloadPage: Function = async (): Promise<void> => {
    throw new Error("Not Implemented");
}

const getCurrentUsers: Function = (): User[] => {
    return state.users;
}

const getCurrentPage: Function = (): number => {
    return state.currentPage;
} 


export default {
    getCurrentPage,
    getCurrentUsers,
    loadNextPage,
    loadPreviousPage,
    onUserChange,
    reloadPage,
}