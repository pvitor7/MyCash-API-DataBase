import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Account } from "./Account"

@Entity("Transactions")
export class Transaction{
    @PrimaryGeneratedColumn()
    readonly id: string;
    
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    value: number;

    @ManyToOne(() => Account, (account: Account) => account.transactions, {
        eager: true
    })
    @JoinColumn()
    debitedAccountId: Account;

    @ManyToOne(() => Account, (account: Account) => account.transactions, {
        eager: true
    })
    @JoinColumn()
    creditedAccountId: Account;

    @CreateDateColumn()
    createdAt: Date;
}