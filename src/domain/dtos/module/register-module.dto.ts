import {IncomeExternalInstitutionDto} from "../institution/incomeExternal-institution.dto";
import {ModuleMdlDto} from "./module-mdl.dto";

export class RegisterModuleDto {
    constructor(
        public institution: IncomeExternalInstitutionDto,
        public module: ModuleMdlDto
    ) {}
}