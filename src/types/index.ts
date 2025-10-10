import { IConfig, ILogger, IRouter, IServer } from '@pseinfo/app/types/interfaces';
import { CompressionOptions } from 'compression';
import { NextFunction, Request, Response } from 'express';
import { Options as RateLimitOptions } from 'express-rate-limit';
import { $Dictionary } from 'i18next/typescript/helpers';
import { ServeStaticOptions } from 'serve-static';

// Centralized service container interface
export interface ServiceContainer {
    logger: ILogger;
    config: IConfig;
    router: IRouter;
    server: IServer;
}

// Request handler and error handler types
export type RequestHandler = ( req: Request, res: Response, next: NextFunction ) => Promise< void > | void;
export type ErrorHandler = ( err: Error, req: Request, res: Response, next: NextFunction ) => void;

// Log levels for application logging
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Cookie context for storing client preferences
export type CookieContext = Record< string, string >;

// Asset management interface
export interface AssetConfig {
    js: Array< {
        path: string;
        module?: boolean;
        async?: boolean;
        defer?: boolean;
    } >;
    css: Array< {
        href: string;
        media?: string;
    } >;
}

// Server configuration with validation
export interface ServerConfig {
    server: {
        host: string;
        port: number;
        secure: boolean;
        debug: boolean;
        logLevel: LogLevel;
    };
    static: {
        options: ServeStaticOptions;
        paths: Record< string, string >;
        assets?: Partial< AssetConfig >;
    };
    i18n: {
        languages: string[];
        fallbackLng: string;
        namespaces: string[];
        fallbackNS: string;
        pattern: string;
        missing: string;
        preload?: string[];
    };
    cookies?: CookieContext;
    compression?: CompressionOptions;
    rateLimit?: Partial< RateLimitOptions >;
}

// Page metadata for SEO
export interface MetaData {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    robots?: string;
    ogImage?: string | null;
}

// Template rendering context
export interface GlobalContext {
    i18n: any;
    server: ServerConfig[ 'server' ];
    site: {
        originalUrl: string;
        secure: boolean;
        method: string;
        path: string;
        query: Request[ 'query' ];
        params: Request[ 'params' ];
    };
}

// Supported HTTP request methods
export type RequestMethods = ( 'get' | 'post' )[];

// Controller configuration
export interface ControllerOptions {
    template: string;
    route: string;
    methods: RequestMethods;
    assets?: Partial< AssetConfig >;
    classes?: string[];
    meta?: MetaData;
    data?: Record< string, any >;
    dict?: $Dictionary;
}

// Rendering options passed to templates
export interface RenderOptions extends GlobalContext {
    cookies: CookieContext;
    assets: AssetConfig;
    classes: string;
    meta: Required< MetaData >;
    data?: Record< string, any >;
    dict?: $Dictionary;
}

// Health check status
export interface HealthStatus {
    status: 'running' | 'stopped';
    timestamp: string;
    env: string;
    uptime: number;
    memory: {
        used: number;
        total: number;
        external: number;
    };
    pid: number;
    version: string;
}
