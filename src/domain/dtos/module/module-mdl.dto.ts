export class ModuleMdlDto {
    constructor(
        public id: number,
        courseId: number,
        public name: string,
        public typeModule: string,
        public startDate: Date,
        public endDate: Date
    ) {}
}