import createTransactionService from '../../service/transactions/createTransaction.service';
import { Request, Response } from 'express';


const createTransactionController = async (req: Request, res: Response) => {
    
    const userId = req.user.id;

    const {usernameAddressee, value} = req.body;

    const newTransaction = await createTransactionService({userId, usernameAddressee, value});

    return res.status(200).json(newTransaction);
};

export default createTransactionController;