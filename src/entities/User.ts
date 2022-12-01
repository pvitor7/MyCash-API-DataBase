import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Account } from "./Account"
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

    @OneToOne(() => Account, (account: Account) => Account, {
        eager: true
    })
    @JoinColumn()
    account: Account;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}