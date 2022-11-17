import listTransactionsService from '../../service/transactions/listTransactions.service';
import { Request, Response } from 'express';


const listTransactionsController = async (req: Request, res: Response) => {
    
    const userId = req.user.id;

    const listTransactions = await listTransactionsService(userId);

    return res.status(200).json(listTransactions);
};

export default listTransactionsController;