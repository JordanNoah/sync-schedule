import {InstitutionRepository} from "../../domain/repositories/institution.repository";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {InstitutionDataSource} from "../../domain/datasources/institution.datasource";

export class InstitutionRepositoryImpl implements InstitutionRepository{
    constructor(
        private readonly institutionDataSource:InstitutionDataSource
    ) {}

    register(): Promise<void> {
        return this.institutionDataSource.register()
    }

    getByAbbreviationAndModality(abbreviation: string, modality: string): Promise<InstitutionEntity|null> {
        return this.institutionDataSource.getByAbbreviationAndModality(abbreviation,modality)
    }

    getAll(): Promise<InstitutionEntity[]> {
        return this.institutionDataSource.getAll()
    }
}