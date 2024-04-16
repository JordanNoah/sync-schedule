import {IncomeExternalInstitutionDto} from "../institution/incomeExternal-institution.dto";
import {GroupingGroupMdlDto} from "./groupingGroup-mdl.dto";

export class RegisterGroupGroupingDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public groupingGroupMdl: GroupingGroupMdlDto
    ) {}
}