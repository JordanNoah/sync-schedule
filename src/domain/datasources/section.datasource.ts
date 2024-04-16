import {RegisterSectionDto} from "../dtos/section/register-section.dto";
import {SectionEntity} from "../entities/section.entity";

export abstract class SectionDatasource {
    abstract register(registerSectionDto:RegisterSectionDto): Promise<SectionEntity>
}