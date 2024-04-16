export class GroupEntity {
    constructor(
        public id: number,
        public externalId: number,
        public idNumber: number,
        public name: string,
        public description: string | null,
        public courseId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ) {}
}