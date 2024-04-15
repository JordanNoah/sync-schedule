export class CourseDto {
    constructor(
        public external_id: number,
        public institution_id: number,
        public name: string,
        public short_name: string,
        public id_number: string,
        public start_date: Date,
        public end_date: Date,
    ) {}

    static create(object: {[key:string]:any}):[string?, CourseDto?] {
        const {

        } = object
        return []
    }
}