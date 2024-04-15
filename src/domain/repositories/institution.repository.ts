import {InstitutionEntity} from "../entities/institution.entity";

export abstract class InstitutionRepository {
    abstract register(): Promise<void>
    abstract getByAbbreviationAndModality(abbreviation: string, modality: string): Promise<InstitutionEntity|null>
    abstract getAll(): Promise<InstitutionEntity[]>
}