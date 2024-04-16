export class GroupingGroupEntity {
    constructor(
        public id: number,
        public groupingId: number,
        public groupId: number,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ) {}
}