import {GroupingGroupDatasource} from "../../domain/datasources/groupingGroup.datasource";
import {RegisterGroupGroupingDto} from "../../domain/dtos/groupGrouping/register-groupGrouping.dto";
import {GroupingGroupEntity} from "../../domain/entities/groupingGroup.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {GroupDatasourceImpl} from "./group.datasource.impl";
import {GroupingDatasourceImpl} from "./grouping.datasource.impl";
import {GroupingGroupSequelize} from "../database/models";

export class GroupingGroupDatasourceImpl implements GroupingGroupDatasource {
    async register(registerGroupGroupingDto: RegisterGroupGroupingDto): Promise<GroupingGroupEntity> {
        try {
            const {groupingGroupMdl,institution} = registerGroupGroupingDto
            const groupDb = await new GroupDatasourceImpl().getByExternalIdCourseIdAndNumberId(groupingGroupMdl.group.id,groupingGroupMdl.group.courseid,groupingGroupMdl.group.idnumber)
            if (!groupDb) throw CustomError.notFound('Group not found');

            const groupingDb = await new GroupingDatasourceImpl().getByExternalIdCourseIdAndNumberId(groupingGroupMdl.grouping.id,groupingGroupMdl.group.courseid,groupingGroupMdl.group.idnumber)
            if (!groupingDb) throw CustomError.notFound('Grouping not found');

            const [groupingGroupDb, created] = await GroupingGroupSequelize.findOrCreate({
                where:{
                    group_id: groupDb.id,
                    grouping_id: groupingDb.id
                },
                defaults:{
                    grouping_id: groupingDb.id,
                    group_id: groupDb.id
                }
            })

            return new GroupingGroupEntity(
                groupingGroupDb.id,
                groupingGroupDb.grouping_id,
                groupingGroupDb.group_id,
                groupingGroupDb.created_at,
                groupingGroupDb.updated_at,
                groupingGroupDb.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}