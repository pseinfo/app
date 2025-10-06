import { CompressionOptions } from 'compression';
import { Options as RateLimitOptions } from 'express-rate-limit';

export interface ServerConfig {
    server: {
        host: string;
        port: number;
        secure: boolean;
        debug: boolean;
    };
    compressionOptions: CompressionOptions;
    rateLimit: Partial< RateLimitOptions >;
    i18n: {
        languages: string[];
        fallbackLng: string;
        namespaces: string[];
        fallbackNS: string;
        pattern: string;
        missing: string;
        preload?: string[];
    };
}
