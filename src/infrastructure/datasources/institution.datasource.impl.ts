import {InstitutionDataSource} from "../../domain/datasources/institution.datasource";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {InstitutionSequelize} from "../database/models";

export class InstitutionDatasourceImpl extends InstitutionDataSource {
    register(): Promise<void> {
        return Promise.resolve(undefined);
    }

    async getByAbbreviationAndModality(abbreviation: string, modality: string): Promise<InstitutionEntity|null> {
        try {
            const institution = await InstitutionSequelize.findOne({
                where: {
                    abbreviation: abbreviation,
                    modality: modality
                }
            })

            return !institution ? null : new InstitutionEntity(
                institution.id,
                institution.uuid,
                institution.name,
                institution.full_name,
                institution.abbreviation,
                institution.domain,
                institution.website,
                institution.rest_path,
                institution.modality,
                institution.translation,
                institution.token,
                institution.created_at,
                institution.updated_at,
                institution.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }

    async getAll(): Promise<InstitutionEntity[]> {
        try {
            return await InstitutionSequelize.findAll()
        }catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}