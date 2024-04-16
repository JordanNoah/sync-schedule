import {IncomeExternalInstitutionDto} from "../institution/incomeExternal-institution.dto";
import {CourseMdlDto} from "../course/course-mdl.dto";
import {GroupingMdlDto} from "./grouping-mdl.dto";

export class RegisterGroupingDto {
    constructor(
        public institution: IncomeExternalInstitutionDto,
        public course: CourseMdlDto,
        public grouping: GroupingMdlDto
    ) {}
}