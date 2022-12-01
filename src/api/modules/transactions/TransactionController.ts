import { instanceToPlain } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import TransactionService from './TransactionService';
class TransactionController {

    private service: TransactionService;

    constructor() {
        this.service = new TransactionService();
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    
        const userId = req.user.id;
        const { usernameAddressee, value } = req.body;
        const newTransaction = await this.service.create({userId, usernameAddressee, value});
    
        res.status(200).json(newTransaction);
        return next();
    }

    public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    
        const userId = req.user.id;
        const listTransactions = await this.service.list(userId);
    
        res.status(200).json(instanceToPlain(listTransactions));
        return next();
    }

    public async listBy(req: Request, res: Response, next: NextFunction): Promise<void> {
    
        const userId = req.user.id;
        const { type } = req.params;
        const { day, month, age } = req.body;
    
        const listTransactions = await this.service.listBy({userId, day, month, age, type});
    
        res.status(200).json(instanceToPlain(listTransactions));
        return next();
    }
}

export default TransactionController;