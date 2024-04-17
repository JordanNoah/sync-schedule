import {RegisterModuleDto} from "../dtos/module/register-module.dto";
import {SectionEntity} from "../entities/section.entity";

export abstract class ModuleDatasource {
    abstract register(registerModuleDto:RegisterModuleDto): Promise<SectionEntity>
}