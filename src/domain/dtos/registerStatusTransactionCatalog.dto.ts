export class RegisterStatusTransactionCatalogDto {
    private constructor(
        public name: string,
        public abbreviation: string,
        public description: string
    ) {}

    static create(object: {[key:string]: any}): [string?, RegisterStatusTransactionCatalogDto?] {
        const {
            name,
            abbreviation,
            description
        } = object
        return [undefined, new RegisterStatusTransactionCatalogDto(
            name,
            abbreviation,
            description
        )]
    }
}