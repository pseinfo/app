import { ErrorResponse } from '@pseinfo/app/types/index';
import { Request, Response } from 'express';

export class ApplicationError extends Error {

    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: Record< string, any >;

    constructor (
        message: string,
        statusCode: number = 500,
        isOperational: boolean = true,
        details?: Record< string, any >
    ) {

        super( message );

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;

        Error.captureStackTrace( this, this.constructor );

    }

}

export class ValidationError extends ApplicationError {

    constructor ( message: string, details?: Record< string, any > ) {
        super( message, 400, true, details );
    }

}

export class NotFoundError extends ApplicationError {

    constructor ( resource: string, details?: Record< string, any > ) {
        super( `${resource} not found`, 404, true, details );
    }

}

export class UnauthorizedError extends ApplicationError {

    constructor ( message: string = 'Unauthorized', details?: Record< string, any > ) {
        super( message, 401, true, details );
    }

}

export class ForbiddenError extends ApplicationError {

    constructor ( message: string = 'Forbidden', details?: Record< string, any > ) {
        super( message, 403, true, details );
    }

}

export class ConflictError extends ApplicationError {

    constructor ( message: string, details?: Record< string, any > ) {
        super( message, 409, true, details );
    }

}

export class RateLimitError extends ApplicationError {

    constructor ( message: string = 'Rate limit exceeded', details?: Record< string, any > ) {
        super( message, 429, true, details );
    }

}

export class ErrorHandler {

    public static handleError (
        error: Error | ApplicationError,
        req: Request,
        res: Response
    ) : void {

        let statusCode = 500;
        let message = 'Internal Server Error';
        let details: Record< string, any > = {};

        if ( error instanceof ApplicationError ) {

            statusCode = error.statusCode;
            message = error.message;
            details = error.details || {};

        } else if ( error instanceof Error ) {

            message = process.env.NODE_ENV === 'production' 
                ? 'Internal Server Error' 
                : error.message;

            if ( process.env.NODE_ENV !== 'production' ) {
                details.stack = error.stack;
            }

        }

        const errorResponse: ErrorResponse = {
            error: {
                message,
                status: statusCode,
                path: req.path,
                method: req.method,
                ...( Object.keys( details ).length > 0 && { details } )
            }
        };

        res.status( statusCode ).json( errorResponse );

    }

    public static asyncWrapper (
        handler: ( req: Request, res: Response ) => Promise< any >
    ) {

        return async ( req: Request, res: Response, next: Function ) : Promise< void > => {
            try { await handler( req, res ) }
            catch ( error ) { next( error ) }
        };

    }

    public static logError (
        error: Error,
        req: Request,
        context?: Record< string, any >
    ) : void {

        console.error( 'Error:', {
            message: error.message,
            stack: error.stack,
            url: req.url,
            method: req.method,
            headers: req.headers,
            ...context
        } );

    }

    public static globalErrorHandler () {

        return ( error: Error, req: Request, res: Response ) : void => {
            ErrorHandler.logError( error, req );
            ErrorHandler.handleError( error, req, res );
        };

    }

    public static notFoundHandler () {

        return ( req: Request, res: Response ) : void => {
            const error = new NotFoundError( `Route ${req.method} ${req.path}` );
            ErrorHandler.handleError( error, req, res );
        };

    }

}
