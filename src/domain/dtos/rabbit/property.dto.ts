export class PropertyDto {
    constructor(
        public contentType: string,
        public contentEncoding: string | undefined,
        public headers: string | undefined,
        public deliveryMode: number,
        public priority: number | undefined,
        public correlationId: number | undefined,
        public replyTo: string | undefined,
        public expiration: string | undefined,
        public messageId: string,
        public timestamp: Date,
        public type: string,
        public userId: number | undefined,
        public appId: string | undefined,
        public clusterId: number | undefined
    ) {}

    static create(object: {[key:string]:any}): [string?, PropertyDto?] {
        const {
            contentType,
            contentEncoding,
            headers,
            deliveryMode,
            priority,
            correlationId,
            replyTo,
            expiration,
            messageId,
            timestamp,
            type,
            userId,
            appId,
            clusterId
        } = object
        return [
            undefined,
            new PropertyDto(
                contentType,
                contentEncoding,
                headers,
                deliveryMode,
                priority,
                correlationId,
                replyTo,
                expiration,
                messageId,
                timestamp,
                type,
                userId,
                appId,
                clusterId
            )
        ]
    }
}