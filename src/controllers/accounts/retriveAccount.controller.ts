import retriveAccountService from '../../service/accounts/retriveAccount.service';
import { Request, Response } from 'express';

const retriveAccountController = async (req: Request, res: Response) => {

    const { id } = req.user;

    const newAccount = await retriveAccountService(id);

    return res.status(200).json(newAccount);

};

export default retriveAccountController;