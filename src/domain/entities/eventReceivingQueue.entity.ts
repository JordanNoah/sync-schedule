export class EventReceivingQueueEntity {
    constructor(
        id: number,
        uuid: string,
        receivedData: string,
        processedAt: Date | null,
        attempts: number,
        event_name: string,
        message_id: string,
        createdAt:Date,
        updatedAt:Date,
        deletedAt:Date
    ) {}
}