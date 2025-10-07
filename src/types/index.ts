import { CompressionOptions } from 'compression';
import { Request } from 'express';
import { Options as RateLimitOptions } from 'express-rate-limit';
import { ServeStaticOptions } from 'serve-static';

export interface ServerConfig {
    server: {
        host: string;
        port: number;
        secure: boolean;
        debug: boolean;
    };
    static: {
        options: ServeStaticOptions;
        paths: Record< string, string >;
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
    compression?: CompressionOptions;
    rateLimit?: Partial< RateLimitOptions >;
}

export interface PageData {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
}

export interface ControllerOptions {
    route: string;
    template: string;
    meta?: PageData;
    assets?: {
        js?: string[];
        css?: string[];
    };
    data?: Record< string, any >;
}

export interface GlobalContext {
    i18n: any;
    server: ServerConfig[ 'server' ];
    site: {
        originalUrl: string;
        path: string;
        query: Request[ 'query' ];
        params: Request[ 'params' ];
    };
}
