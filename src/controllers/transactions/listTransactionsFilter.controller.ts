import listTransactionsFilterService from '../../service/transactions/listTransactionsFilter.service';
import { Request, Response } from 'express';
import { instanceToPlain } from "class-transformer";


const listTransactionsFilterController = async (req: Request, res: Response) => {
    
    const userId = req.user.id;
    const { type } = req.params;
    const { day, month, year } = req.body;

    const listTransactions = await listTransactionsFilterService({userId, day, month, year, type});

    return res.status(200).json(instanceToPlain(listTransactions));
};

export default listTransactionsFilterController;