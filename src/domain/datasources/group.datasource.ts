import {GroupEntity} from "../entities/Group.entity";
import {RegisterGroupDto} from "../dtos/group/register-group.dto";

export abstract class GroupDatasource {
    abstract register(registerGroupDto:RegisterGroupDto): Promise<GroupEntity>
    abstract getById(id:number): Promise<GroupEntity | null>
    abstract getAll(): Promise<GroupEntity[]>

}