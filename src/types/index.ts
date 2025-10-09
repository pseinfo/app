import { IConfig, ILogger, IRouter, IServer } from '@pseinfo/app/types/interfaces';
import { CompressionOptions } from 'compression';
import { Request } from 'express';
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

// Log levels for application logging
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Cookie context for storing client preferences
export type CookieContext = Record< string, string >;

// Asset management interface
export interface AssetConfig {
    js: string[];
    css: string[];
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

// Page metadata for SEO and display
export interface PageData {
    title?: string;
    description?: string;
    keywords?: string[];
    author?: string;
    viewport?: string;
    canonical?: string;
    robots?: string;
}

// Template rendering context
export interface GlobalContext {
    i18n: any;
    server: ServerConfig[ 'server' ];
    site: {
        originalUrl: string;
        path: string;
        query: Request[ 'query' ];
        params: Request[ 'params' ];
    };
    meta: {
        canonical: string;
        robots: string;
    };
}

// Controller configuration (legacy support)
export interface ControllerOptions {
    route: string;
    template: string;
    meta?: PageData;
    assets?: Partial< AssetConfig >;
    classes?: string[];
    data?: Record< string, any >;
    dict?: $Dictionary;
}

// Health check status
export interface HealthStatus {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    uptime: number;
    memory: {
        used: number;
        total: number;
        external: number;
    };
    pid: number;
    version: string;
    environment: string;
}

// Error response structure
export interface ErrorResponse {
    error: {
        message: string;
        status: number;
        path: string;
        method: string;
        stack?: string;
        details?: Record< string, any >;
    };
}
