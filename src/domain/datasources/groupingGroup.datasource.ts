import {RegisterGroupGroupingDto} from "../dtos/groupGrouping/register-groupGrouping.dto";
import {GroupingGroupEntity} from "../entities/groupingGroup.entity";

export abstract class GroupingGroupDatasource {
    abstract register(registerGroupGroupingDto: RegisterGroupGroupingDto): Promise<GroupingGroupEntity>
}