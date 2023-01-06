import listTransactionsFilterService from '../../service/transactions/listTransactionsFilter.service';
import { Request, Response } from 'express';
import { instanceToPlain } from "class-transformer";


const listTransactionsFilterController = async (req: Request, res: Response) => {
    
    const userId = req.user.id;
    const { day, month, year, type } = req.params;

    const listTransactions = await listTransactionsFilterService({userId, day, month, year, type});

    return res.status(200).json(instanceToPlain(listTransactions));
};

export default listTransactionsFilterController;