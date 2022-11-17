import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Accounts } from "./accounts"

@Entity("Transactions")
export class Transactions{
    @PrimaryGeneratedColumn()
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
}