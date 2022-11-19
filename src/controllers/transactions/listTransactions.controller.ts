import listTransactionsService from '../../service/transactions/listTransactions.service';
import { Request, Response } from 'express';

import { instanceToPlain } from "class-transformer";


const listTransactionsController = async (req: Request, res: Response) => {
    
    const userId = req.user.id;

    const listTransactions = await listTransactionsService(userId);

    return res.status(200).json(instanceToPlain(listTransactions));
};

export default listTransactionsController;