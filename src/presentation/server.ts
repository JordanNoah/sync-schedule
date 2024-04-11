import express, {Router} from "express";
import * as http from "node:http";
import {DbSequelize} from "../infrastructure/database/init";

interface Options {
    port: number,
    routes: Router
}

export class Server {
    public readonly app = express()
    private readonly port: number
    private readonly routes: Router

    constructor(options: Options) {
        const {port,routes} = options
        this.port = port
        this.routes = routes
    }

    public async start() {
        try {
            await DbSequelize()
            this.app.use(express.json())
            this.app.use(this.routes)
            const server = http.createServer(this.app)
            server.listen(this.port, () => {
                console.log(`Server running on port: ${this.port}`)
            })
        } catch (error) {
            console.log(error)
        }
    }
}