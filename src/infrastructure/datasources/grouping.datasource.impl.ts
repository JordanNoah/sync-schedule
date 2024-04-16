import {GroupingDatasource} from "../../domain/datasources/grouping.datasource";
import {GroupingEntity} from "../../domain/entities/grouping.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {RegisterGroupingDto} from "../../domain/dtos/grouping/register-grouping.dto";
import {InstitutionDatasourceImpl} from "./institution.datasource.impl";
import {CourseDatasourceImpl} from "./course.datasource.impl";
import {GroupingSequelize} from "../database/models";

export class GroupingDatasourceImpl implements GroupingDatasource {
    async register(registerGroupingDto: RegisterGroupingDto): Promise<GroupingEntity> {
        try {
            const {grouping, institution, course} = registerGroupingDto
            const institutionDb = await new InstitutionDatasourceImpl().getByAbbreviationAndModality(institution.institutionAbbreviation,institution.modality)
            if (!institutionDb) {throw CustomError.notFound('Institution not found')}
            const courseDb = await new CourseDatasourceImpl().getByExternalIdAndInstitutionId(course.id,institutionDb.id)
            if (!courseDb) {throw CustomError.notFound('Course not found')}

            const [groupingDb, created] = await GroupingSequelize.findOrCreate({
                where:{
                    external_id: grouping.id,
                    course_id:courseDb.id,
                    id_number:grouping.idnumber
                },
                defaults:{
                    external_id:grouping.id,
                    id_number:grouping.idnumber,
                    name:grouping.name,
                    description:grouping.description,
                    course_id:courseDb.id
                }
            })

            return new GroupingEntity(
                groupingDb.id,
                groupingDb.external_id,
                groupingDb.name,
                groupingDb.description,
                groupingDb.id_number,
                groupingDb.course_id,
                groupingDb.created_at,
                groupingDb.updated_at,
                groupingDb.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getById(id: number): Promise<GroupingEntity | null> {
        try {
            const groupingDb = await GroupingSequelize.findOne({
                where:{id:id}
            })

            if (!groupingDb) { return null }

            return new GroupingEntity(
                groupingDb.id,
                groupingDb.external_id,
                groupingDb.name,
                groupingDb.description,
                groupingDb.id_number,
                groupingDb.course_id,
                groupingDb.created_at,
                groupingDb.updated_at,
                groupingDb.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getAll(): Promise<GroupingEntity[]> {
        try {
            const groupingsDb = await GroupingSequelize.findAll()

            let groupingEntities: GroupingEntity[] = []

            for (const grouping of groupingsDb) {
                const groupEntity = new GroupingEntity(
                    grouping.id,
                    grouping.external_id,
                    grouping.name,
                    grouping.description,
                    grouping.id_number,
                    grouping.course_id,
                    grouping.created_at,
                    grouping.updated_at,
                    grouping.deleted_at
                )

                groupingEntities.push(groupEntity)
            }

            return groupingEntities
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getByExternalIdCourseIdAndNumberId(externalId: number,courseId: number, numberId:string): Promise<GroupingEntity | null> {
        try {
            const groupingDb = await GroupingSequelize.findOne({
                where:{
                    external_id: externalId,
                    course_id: courseId,
                    id_number: numberId,
                }
            })

            if (!groupingDb) return null

            return new GroupingEntity(
                groupingDb.id,
                groupingDb.external_id,
                groupingDb.name,
                groupingDb.description,
                groupingDb.id_number,
                groupingDb.course_id,
                groupingDb.created_at,
                groupingDb.updated_at,
                groupingDb.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}