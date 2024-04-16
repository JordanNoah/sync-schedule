export class GroupingEntity {
    constructor(
        public id: number,
        public external_id: number,
        public name: string,
        public description: string,
        public id_number: string,
        public courseId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ) {}
}