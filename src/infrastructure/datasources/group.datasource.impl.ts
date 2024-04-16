import {GroupDatasource} from "../../domain/datasources/group.datasource";
import {RegisterGroupDto} from "../../domain/dtos/group/register-group.dto";
import {GroupEntity} from "../../domain/entities/group.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {InstitutionDatasourceImpl} from "./institution.datasource.impl";
import {CourseDatasourceImpl} from "./course.datasource.impl";
import {CourseSequelize, GroupSequelize} from "../database/models";

export class GroupDatasourceImpl implements GroupDatasource {
    async register(registerGroupDto: RegisterGroupDto): Promise<GroupEntity> {
        try {
            const {group,institution,course} = registerGroupDto
            const institutionDb = await new InstitutionDatasourceImpl().getByAbbreviationAndModality(institution.institutionAbbreviation,institution.modality)
            if (!institutionDb) {throw CustomError.notFound('Institution not found')}
            const courseDb = await new CourseDatasourceImpl().getByExternalIdAndInstitutionId(course.id,institutionDb.id)
            if(!courseDb) {throw CustomError.notFound('Course not found')}

            const [groupDb, created] = await GroupSequelize.findOrCreate({
                where:{
                    external_id:group.id,
                    course_id:courseDb.id,
                    id_number:group.idnumber
                },
                defaults:{
                    external_id:group.id,
                    id_number:group.idnumber,
                    name:group.name,
                    description:group.description,
                    course_id:courseDb.id
                }
            })

            return new GroupEntity(
                groupDb.id,
                groupDb.external_id,
                groupDb.id_number,
                groupDb.name,
                groupDb.description,
                groupDb.course_id,
                groupDb.created_at,
                groupDb.updated_at,
                groupDb.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getById(id: number): Promise<GroupEntity | null> {
        try {
            const groupDb = await GroupSequelize.findOne({
                where:{id:id},
            })

            if (!groupDb) return null

            return new GroupEntity(
                groupDb.id,
                groupDb.external_id,
                groupDb.id_number,
                groupDb.name,
                groupDb.description,
                groupDb.course_id,
                groupDb.created_at,
                groupDb.updated_at,
                groupDb.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getAll(): Promise<GroupEntity[]> {
        try {
            const groupDbs = await GroupSequelize.findAll()

            let groupEntity: GroupEntity[] = [];
            for (const groupDb of groupDbs) {
                const group = new GroupEntity(
                    groupDb.id,
                    groupDb.external_id,
                    groupDb.id_number,
                    groupDb.name,
                    groupDb.description,
                    groupDb.course_id,
                    groupDb.created_at,
                    groupDb.updated_at,
                    groupDb.deleted_at
                )
                groupEntity.push(group)
            }

            return groupEntity
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
    async getByExternalIdCourseIdAndNumberId(externalId:number, courseId:number, numberId:string): Promise<GroupEntity | null> {
        try {
            const groupDb = await GroupSequelize.findOne({
                where: {
                    external_id:externalId,
                    course_id:courseId,
                    id_number:numberId
                }
            })

            if (!groupDb) return null

            return new GroupEntity(
                groupDb.id,
                groupDb.external_id,
                groupDb.id_number,
                groupDb.name,
                groupDb.description,
                groupDb.course_id,
                groupDb.created_at,
                groupDb.updated_at,
                groupDb.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}