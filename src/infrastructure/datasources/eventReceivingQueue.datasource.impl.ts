import {EventReceivingQueueDataSource} from "../../domain/datasources/eventReceivingQueue.datasource";
import {EventReceivingQueueDto} from "../../domain/dtos/eventReceivingQueue.dto";
import {EventReceivingQueueEntity} from "../../domain/entities/eventReceivingQueue.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {EventReceivingQueueSequelize} from "../database/models";
import { v4 as uuidV4 } from 'uuid'

export class EventReceivingQueueDatasourceImpl extends EventReceivingQueueDataSource {
    async register(eventReceivingQueueDto: EventReceivingQueueDto): Promise<EventReceivingQueueEntity> {
        try {
            const [event,created] = await EventReceivingQueueSequelize.findOrCreate({
                defaults:{
                    uuid: uuidV4(),
                    received_data:eventReceivingQueueDto.content.toString(),
                    event_name:eventReceivingQueueDto.property.type,
                    attempts:0,
                    processed_at: null,
                    message_id:eventReceivingQueueDto.property.messageId
                },
                where:{
                    message_id: eventReceivingQueueDto.property.messageId
                }
            })

            return new EventReceivingQueueEntity(
                event.id,
                event.uuid,
                event.received_data,
                event.processed_at,
                event.attempts,
                event.event_name,
                event.message_id,
                event.created_at,
                event.updated_at,
                event.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getById(id: number): Promise<EventReceivingQueueEntity | null> {
        try {
            let eventReceivingQueue = await EventReceivingQueueSequelize.findOne({
                where:{
                    id:id
                }
            })

            if (!eventReceivingQueue) { return null }

            return new EventReceivingQueueEntity(
                eventReceivingQueue.id,
                eventReceivingQueue.uuid,
                eventReceivingQueue.received_data,
                eventReceivingQueue.processed_at,
                eventReceivingQueue.attempts,
                eventReceivingQueue.event_name,
                eventReceivingQueue.message_id,
                eventReceivingQueue.created_at,
                eventReceivingQueue.updated_at,
                eventReceivingQueue.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}