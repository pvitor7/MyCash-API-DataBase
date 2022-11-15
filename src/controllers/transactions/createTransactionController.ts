import createTransactionService from '../../service/transactions/createTransaction.service';
import { Request, Response } from 'express';


const createTransactionController = async (req: Request, res: Response) => {

    // const { userId } = req.user;

    const {debiteAccountId, creditAccountId, value} = req.body;

    const newTransaction = createTransactionService({
        // userId, 
        debiteAccountId, creditAccountId, value});

    return res.status(200).json(newTransaction);
};

export default createTransactionController;