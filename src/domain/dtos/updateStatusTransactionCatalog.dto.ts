export class UpdateStatusTransactionCatalogDto {
    private constructor(
        public id: number,
        public name: string,
        public abbreviation: string,
        public description: string
    ) {}

    static create(object: {[key:string]: any}): [string?, UpdateStatusTransactionCatalogDto?] {
        const {
            id,
            name,
            abbreviation,
            description
        } = object

        return [undefined, new UpdateStatusTransactionCatalogDto(
            id,
            name,
            abbreviation,
            description
        )]
    }
}