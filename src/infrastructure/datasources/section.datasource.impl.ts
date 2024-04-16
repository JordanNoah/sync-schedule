import {SectionDatasource} from "../../domain/datasources/section.datasource";
import {RegisterSectionDto} from "../../domain/dtos/section/register-section.dto";
import {SectionEntity} from "../../domain/entities/section.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {CourseDatasourceImpl} from "./course.datasource.impl";
import {InstitutionDatasourceImpl} from "./institution.datasource.impl";

export class SectionDatasourceImpl implements SectionDatasource {
    async register(registerSectionDto: RegisterSectionDto): Promise<SectionEntity> {
        try {
            const {section,institution} = registerSectionDto

            const institutionDb = await new InstitutionDatasourceImpl().getByAbbreviationAndModality(institution.institutionAbbreviation,institution.modality)

            if (!institutionDb) {throw CustomError.notFound('Institution not found')}

            const courseDb = await new CourseDatasourceImpl().getByExternalIdAndInstitutionId(section.course,institutionDb.id)
            if (!courseDb) {throw CustomError.notFound('Course not found')}


        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}