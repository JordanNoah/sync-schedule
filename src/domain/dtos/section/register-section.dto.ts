import {IncomeExternalInstitutionDto} from "../institution/incomeExternal-institution.dto";
import {SectionMdlDto} from "./section-mdl.dto";

export class RegisterSectionDto {
    constructor(
        public institution: IncomeExternalInstitutionDto,
        public section: SectionMdlDto
    ) {}
}