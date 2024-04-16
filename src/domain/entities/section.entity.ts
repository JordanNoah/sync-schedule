export class SectionEntity {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public courseId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ) {}
}