import 'reflect-metadata'
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV ?? 'local'}` })

import messages from '../../shared/messages'

import RouterMain from './routes/index.routes'
import { handleResponse, handleError, ErrorHandler } from '../../shared/infrastructure/handler'

const { PORT } = process.env

class Server {
    public app: Application
    private port: number

    constructor() {
        this.app = express()
        this.port = Number(PORT) ?? 3000
        this.middleware()
        this.routes()
        this.noFound()
        this.handle()
    }

    private middleware() {
        this.app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))

        this.app.disable('x-powered-by')
    }

    private routes() {
        this.app.use(RouterMain)
    }

    private handle() {
        this.app.use((data: unknown, req: Request, res: Response) => handleResponse(data, res))
        this.app.use((err: Error, req: Request, res: Response) => handleError(err, res))
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Listening on: http://localhost:${this.port}`))
    }

    private noFound() {
        // No Found
        this.app.use((req, res, next) => {
            try {
                throw new ErrorHandler(404, messages.ERROR_NOT_FOUNT)
            } catch (error) {
                next(error)
            }
        })
    }
}

export default Server
