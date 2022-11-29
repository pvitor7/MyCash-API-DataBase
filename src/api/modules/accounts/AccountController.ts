import { NextFunction, Request, Response } from 'express';

class AccountController {
    
    public async retrieve(req: Request, res: Response, next: NextFunction): Promise<void> {

        // const { id } = req.user;
    
        const newAccount = { name: 'nova conta' }// await retriveAccountService(id);
    
        res.status(200).json(newAccount);

        return next();
    
    };
    
}

export default AccountController;