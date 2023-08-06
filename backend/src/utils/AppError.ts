class AppError extends Error {
    public code: number;
    public success: string;

    constructor(message: string, code: number) {
        super(message);

        this.code = code;
        this.success = `${code}`.startsWith('4') ? 'fail' : 'error';

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
