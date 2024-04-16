import {GroupingEntity} from "../entities/grouping.entity";
import {RegisterGroupingDto} from "../dtos/grouping/register-grouping.dto";

export abstract class GroupingDatasource {
    abstract register(registerGroupingDto:RegisterGroupingDto): Promise<GroupingEntity>
    abstract getById(id: number): Promise<GroupingEntity | null>
    abstract getAll(): Promise<GroupingEntity[]>
    abstract getByExternalIdCourseIdAndNumberId(externalId: number,courseId: number, numberId:string): Promise<GroupingEntity | null>
}