import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import {jobsService} from '../services';

const newjob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    // @ts-ignore
    if (req.user.role !== 'hr')
        return res.status(401).json({
            'success': false,
            'msg': 'You are not authorized to create a new job'
        });

    const body = req.body;

    // @ts-ignore
    body.hrId = req.user.id;

    const newjob = await jobsService.createNewjob(body);

    res.status(201).json({
        'success': true,
        'msg': 'New job created',
        'data': newjob
    });

});


const getjob = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const jobId = req.params.job_id;

    const job = await jobsService.getjob(jobId);

    res.status(200).json({
        'success': true,
        'msg': 'job found',
        'data': job
    });

});

const getAlljobs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const alljobs = await jobsService.getAlljobs();

    res.status(200).json({
        'success': true,
        'msg': 'All jobs',
        'data': alljobs
    });
});


export default {
    newjob,
    getAlljobs,
    getjob,
}