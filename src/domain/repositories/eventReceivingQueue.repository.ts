import {EventReceivingQueueDto} from "../dtos/eventReceivingQueue.dto";
import {EventReceivingQueueEntity} from "../entities/eventReceivingQueue.entity";

export abstract class EventReceivingQueueRepository {
    abstract register(eventReceivingQueueDto:EventReceivingQueueDto): Promise<EventReceivingQueueEntity>
}