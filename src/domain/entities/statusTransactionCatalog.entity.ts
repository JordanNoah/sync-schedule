export class StatusTransactionCatalogEntity {
    constructor(
        public id: number,
        public name: string,
        public abbreviation: string,
        public description: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ) {}
}