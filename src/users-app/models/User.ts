import { Gender, UserBD } from '../store/users-store';
export class User {

    public id?: string;
    public isActive?:   boolean;
    public balance?:    number;
    public avatar?:     string;
    public firstName?: string;
    public lastName?:  string;
    public Gender?:     Gender;
    
    constructor( userData: UserBD ) {
        this.id= userData.id;
        this.isActive = userData.isActive;
        this.balance = userData.balance;
        this.avatar = userData.avatar;
        this.firstName = userData.first_name;
        this.lastName = userData.last_name;
        this.Gender = userData.gender;
    }


    public toUserBD(): UserBD {
        const userBD: UserBD = {
            id:         this.id,
            isActive:   this.isActive,
            balance:    this.balance,
            avatar:     this.avatar,
            first_name: this.firstName,
            last_name:  this.lastName,
            gender:     this.Gender
        } 
        return userBD;
    }

}