import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import { applicationService } from '../services';

const newapplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    // @ts-ignore
    if (req.user.role !== 'user')
        return res.status(401).json({
            'success': false,
            'msg': 'You are not authorized to create a new application'
        });

    const body = req.body;

    // @ts-ignore
    req.body.userId = req.user.id;
    req.body.jobId = req.query.job_id;
    req.body.status = 'applied';

    const newapplication = await applicationService.createNewapplication(body);

    res.status(201).json({
        'success': true,
        'msg': 'New application created',
        'data': newapplication
    });

});


const getapplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const applicationId = req.params.application_id;

    const application = await applicationService.getapplication(applicationId);

    res.status(200).json({
        'success': true,
        'msg': 'application found',
        'data': application
    });

});

const getAllapplications = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    // @ts-ignore
    if (req.user.role !== 'hr')
        return res.status(401).json({
            'success': false,
            'msg': 'You are not authorized to view all applications'
        });
    
    const allapplications = await applicationService.getAllapplications();

    res.status(200).json({
        'success': true,
        'msg': 'All applications',
        'data': allapplications
    });
});


export default {
    newapplication,
    getAllapplications,
    getapplication,
}