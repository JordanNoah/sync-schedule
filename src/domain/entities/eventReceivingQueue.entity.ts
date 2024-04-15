export class EventReceivingQueueEntity {
    constructor(
        public id: number,
        public uuid: string,
        public receivedData: string,
        public processedAt: Date | null,
        public attempts: number,
        public event_name: string,
        public message_id: string,
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date
    ) {}
}