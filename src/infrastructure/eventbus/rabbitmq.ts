import {Channel, connect, Connection} from 'amqplib'
import {assertExchange, assertQueue, config, eventList} from './config'
import AppConfig from "../../shared/appConfig";
import {EventReceivingQueueDto} from "../../domain/dtos/eventReceivingQueue.dto";
import {EventReceivingQueueDatasourceImpl} from "../datasources/eventReceivingQueue.datasource.impl";
import {EventReceivingQueueRepository} from "../../domain/repositories/eventReceivingQueue.repository";
import {EventReceivingQueueRepositoryImpl} from "../repositories/eventReceivingQueue.repository.impl";


export class Rabbitmq {
    private static _connection: Connection
    private static _channel: Channel

    public static async connection() {
        try {
            this._connection = await connect(config)
            this._channel = await this._connection.createConfirmChannel()
        }catch (e) {
            console.log(e)
        }
    }

    public static async setQueue() {
        if (this._channel){
            await this._channel.assertQueue(
                AppConfig.RABBIT_QUEUE,
                assertQueue
            )

            await this._channel.assertExchange(
                AppConfig.RABBIT_EXCHANGE,
                AppConfig.RABBIT_TYPE_EXCHANGE,
                assertExchange
            )

            await this._channel.bindQueue(
                AppConfig.RABBIT_QUEUE,
                AppConfig.RABBIT_EXCHANGE,
                AppConfig.RABBIT_ROUTING_KEY
            )

            await this._channel.prefetch(Number(AppConfig.RABBIT_PREFETCH))
        } else {
            console.log("Channel not found")
        }
    }

    public static async consume() {
        if (this._channel){
            await this._channel.consume(
                AppConfig.RABBIT_QUEUE,
                async (msg) => {
                    try {
                        const [error,eventReceivingDto] = EventReceivingQueueDto.create(msg!)
                        const datasource = new EventReceivingQueueDatasourceImpl()
                        const eventRepository = new EventReceivingQueueRepositoryImpl(datasource)

                        await eventRepository.register(eventReceivingDto!).catch((err) => {
                            console.log(err)
                        })

                        this._channel.ack(msg!)
                    } catch (error) {
                        console.log(error)
                    }
                }
            )
        }else{
            console.log("Channel not found")
        }
    }

    public static async init() {
        await this.connection()
        await this.setQueue()
        await this.consume()
        //await this.fakeConsume()
    }
}