import createAccountService from '../../service/accounts/crateAccount.service';
import { Request, Response } from 'express';

const createAccountController = async (req: Request, res: Response) => {

    // const { userId } = req.user.id;

    const newAccount = await createAccountService();

    return res.status(201).json(newAccount);

};

export default createAccountController;