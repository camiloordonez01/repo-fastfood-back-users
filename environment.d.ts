declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'dev' | 'qa' | 'prod'
            HOST_DB: string
            PORT_DB?: string
            USER_DB: string
            PASSWORD_DB: string
            SCHEMA_DB: string | '3306'
            TIMEZONE: string
            PORT?: number
            SERVICE_LOG: string
        }
    }
}

export {}
