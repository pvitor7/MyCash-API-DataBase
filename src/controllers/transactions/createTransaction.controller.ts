import createTransactionService from '../../service/transactions/createTransaction.service';
import { Request, Response } from 'express';


const createTransactionController = async (req: Request, res: Response) => {
    
    const userId = req.user.id;

    const {debitedAccountId, creditedAccountId, value} = req.body;

    const newTransaction = await createTransactionService({userId, debitedAccountId, creditedAccountId, value});

    return res.status(200).json(newTransaction);
};

export default createTransactionController;