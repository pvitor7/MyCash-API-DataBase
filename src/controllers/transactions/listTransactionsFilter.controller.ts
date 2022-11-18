import listTransactionsFilterService from '../../service/transactions/listTransactionsFilter.service';
import { Request, Response } from 'express';


const listTransactionsFilterController = async (req: Request, res: Response) => {
    
    const userId = req.user.id;
    const { day, month, age, type } = req.body;

    const listTransactions = await listTransactionsFilterService({userId, day, month, age, type});

    return res.status(200).json(listTransactions);
};

export default listTransactionsFilterController;