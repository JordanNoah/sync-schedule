import {GroupingMdlDto} from "../grouping/grouping-mdl.dto";
import {GroupMdlDto} from "../group/group-mdl.dto";
import {CourseMdlDto} from "../course/course-mdl.dto";

export class GroupingGroupMdlDto {
    constructor(
        public grouping: GroupingMdlDto,
        public group: GroupMdlDto,
        public course: CourseMdlDto,
        public timeadded: number
    ) {}
}