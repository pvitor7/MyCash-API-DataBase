import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Accounts } from "./accounts"
import { v4 as uuid } from "uuid";


@Entity("Transactions")
export class Transactions{
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
    
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    value: number;

    @ManyToOne(() => Accounts, (account: Accounts) => account.transactions, {
        eager: true
    })
    @JoinColumn()
    debitedAccountId: Accounts;

    @ManyToOne(() => Accounts, (account: Accounts) => account.transactions, {
        eager: true
    })
    @JoinColumn()
    creditedAccountId: Accounts;

    @CreateDateColumn()
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}