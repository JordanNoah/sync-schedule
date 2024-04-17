import {ModuleDatasource} from "../../domain/datasources/module.datasource";
import {RegisterModuleDto} from "../../domain/dtos/module/register-module.dto";
import {SectionEntity} from "../../domain/entities/section.entity";
import {CustomError} from "../../domain/errors/custom.error";

export class ModuleDatasourceImpl implements ModuleDatasource {
    async register(registerModuleDto: RegisterModuleDto): Promise<SectionEntity> {
        try {
            const {module,institution} = registerModuleDto


        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}