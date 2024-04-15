export class CourseEntity {
    constructor(
        public id: number,
        public external_id: number,
        public institution_id: number,
        public name: string,
        public short_name: string,
        public id_number: string,
        public start_date: Date,
        public end_date: Date,
        public created_at: Date,
        public updated_at: Date,
        public deleted_at: Date
    ) {}
}