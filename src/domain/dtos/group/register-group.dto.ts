import {IncomeExternalInstitutionDto} from "../institution/incomeExternal-institution.dto";
import {GroupMdlDto} from "./group-mdl.dto";
import {CourseMdlDto} from "../course/course-mdl.dto";

export class RegisterGroupDto {
    private constructor(
        public institution: IncomeExternalInstitutionDto,
        public course: CourseMdlDto,
        public group: GroupMdlDto
    ) {}

    static create(object:{[key:string]: any}):[string?,RegisterGroupDto?]{
        const {
            institution,
            course,
            group
        } = object

        return [undefined,
        new RegisterGroupDto(
            institution,
            course,
            group
        )]
    }
}