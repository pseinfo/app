import { CompressionOptions } from 'compression';
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
