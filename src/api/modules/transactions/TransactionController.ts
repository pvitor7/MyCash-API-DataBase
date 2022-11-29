import { NextFunction, Request, Response } from 'express';
class TransactionController {

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    
        const userId = req.user.id;
        const { usernameAddressee, value } = req.body;
        // const newTransaction = await createTransactionService({userId, usernameAddressee, value});
    
        res.status(200).json({} /* newTransaction */ );
        return next();
    }

    public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    
        const userId = req.user.id;
        // const listTransactions = await listTransactionsService(userId);
    
        res.status(200).json(/*instanceToPlain(listTransactions)*/{});
        return next();
    }

    public async listBy(req: Request, res: Response, next: NextFunction): Promise<void> {
    
        const userId = req.user.id;
        const { type } = req.params;
        const { day, month, age } = req.body;
    
        // const listTransactions = await listTransactionsFilterService({userId, day, month, age, type});
    
        res.status(200).json({}); // instanceToPlain(listTransactions));
        return next();
    }
}

export default TransactionController;