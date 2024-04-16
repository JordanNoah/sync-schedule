import {IncomeExternalInstitutionDto} from "../institution/incomeExternal-institution.dto";
import {GroupMdlDto} from "./group-mdl.dto";

export class RegisterGroupDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public group: GroupMdlDto
    ) {}

    static create(object:{[key:string]: any}):[string?,RegisterGroupDto?]{
        const {
            institution,
            group
        } = object

        return [undefined,
        new RegisterGroupDto(
            institution,
            group
        )]
    }
}