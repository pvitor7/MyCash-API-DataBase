import { NextFunction, Request, Response } from 'express';
import AccountService from './AccountService';

class AccountController {

    private service: AccountService;
    
    public async retrieve(req: Request, res: Response, next: NextFunction): Promise<void> {
        const account = await this.service.retrieve(req.user.id)
        res.status(200).json(account);
        return next();
    }
}

export default AccountController;