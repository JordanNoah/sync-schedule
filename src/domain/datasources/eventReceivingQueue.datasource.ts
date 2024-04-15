import {EventReceivingQueueDto} from "../dtos/eventReceivingQueue.dto";
import {EventReceivingQueueEntity} from "../entities/eventReceivingQueue.entity";

export abstract class EventReceivingQueueDataSource {
    abstract register(eventReceivingQueueDto:EventReceivingQueueDto): Promise<EventReceivingQueueEntity>
}