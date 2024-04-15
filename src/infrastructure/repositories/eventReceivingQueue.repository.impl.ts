import {EventReceivingQueueRepository} from "../../domain/repositories/eventReceivingQueue.repository";
import {EventReceivingQueueDto} from "../../domain/dtos/eventReceivingQueue.dto";
import {EventReceivingQueueEntity} from "../../domain/entities/eventReceivingQueue.entity";
import {EventReceivingQueueDataSource} from "../../domain/datasources/eventReceivingQueue.datasource";

export class EventReceivingQueueRepositoryImpl implements EventReceivingQueueRepository {
    constructor(
        private readonly eventReceivingQueueDataSource:EventReceivingQueueDataSource
    ) {}

    register(eventReceivingQueueDto: EventReceivingQueueDto): Promise<EventReceivingQueueEntity> {
        return this.eventReceivingQueueDataSource.register(eventReceivingQueueDto)
    }
}