import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("Users")
@Unique(['username'])
export class User{
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}