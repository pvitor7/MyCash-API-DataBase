import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Accounts } from "./accounts"
import { Exclude } from "class-transformer"

@Entity("Users")
@Unique(['username'])
export class User{
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @OneToOne(() => Accounts, (account: Accounts) => Accounts, {
        eager: true
    })
    @JoinColumn()
    account: Accounts;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}