export interface ServerConfig {
    server: {
        host: string;
        port: number;
        secure: boolean;
        debug: boolean;
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
}
