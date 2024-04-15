export class FieldDto {
    constructor(
        public consumerTag:string,
        public deliveryTag:number,
        public redelivered:boolean,
        public exchange:string,
        public routingKey:string
    ) {}

    static create(object: {[key:string]:any}): [string?, FieldDto?] {
        const {
            consumerTag,
            deliveryTag,
            redelivered,
            exchange,
            routingKey
        } = object

        return [
            undefined,
            new FieldDto(
                consumerTag,
                deliveryTag,
                redelivered,
                exchange,
                routingKey
            )
        ]
    }
}