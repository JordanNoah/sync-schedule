export class InstitutionEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public full_name: string,
        public abbreviation: string,
        public domain:string,
        public website: string,
        public rest_path: string,
        public modality: string,
        public translation: string,
        public token: string,
        public created_at: Date,
        public updated_at: Date,
        public deleted_at: Date
    ) {}
}