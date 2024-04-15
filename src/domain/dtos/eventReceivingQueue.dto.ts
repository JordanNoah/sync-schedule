import {FieldDto} from "./rabbit/field.dto";
import {PropertyDto} from "./rabbit/property.dto";

export class EventReceivingQueueDto {
    constructor(
        public field: FieldDto,
        public property: PropertyDto,
        public content: string
    ) {}

    static create(object: {[key:string]:any}): [string?, EventReceivingQueueDto?] {
        const {
            fields,
            properties,
            content
        } = object

        if (!fields) return ['Missing fields structure',undefined]
        if (!properties) return ['Missing property structure',undefined]
        if (!content) return ['Missing content structure',undefined]

        return [
            undefined,
            new EventReceivingQueueDto(
                fields,
                properties,
                content
            )
        ]
    }
}