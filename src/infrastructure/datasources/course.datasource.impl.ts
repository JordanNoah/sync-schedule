import {CourseDatasource} from "../../domain/datasources/course.datasource";
import {CourseEntity} from "../../domain/entities/course.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {CourseSequelize, InstitutionSequelize} from "../database/models";
import {RegisterCourseDto} from "../../domain/dtos/course/register-course.dto";
import {InstitutionEntity} from "../../domain/entities/institution.entity";
import {InstitutionDatasourceImpl} from "./institution.datasource.impl";
import {DeleteCourseMdlDto} from "../../domain/dtos/course/delete-course-mdl.dto";

export class CourseDatasourceImpl extends CourseDatasource {
    async register(registerCourseDto:RegisterCourseDto): Promise<CourseEntity> {
        try {
            const {institution,course} = registerCourseDto

            const institutionEntity = await new InstitutionDatasourceImpl().getByAbbreviationAndModality(institution.institutionAbbreviation,institution.modality)

            if(!institutionEntity){ throw CustomError.notFound('Institution not found')}

            const [courseDb, created] = await CourseSequelize.findOrCreate({
                where:{
                    external_id: course.id,
                    institution_id: institutionEntity.id
                },
                defaults:{
                    external_id: course.id,
                    institution_id: institutionEntity.id,
                    name: course.fullname,
                    short_name: course.shortname,
                    id_number: course.idnumber,
                    start_date: course.startdate,
                    end_date: course.enddate
                }
            })

            return new CourseEntity(
                courseDb.id,
                courseDb.external_id,
                courseDb.institution_id,
                courseDb.name,
                courseDb.short_name,
                courseDb.id_number,
                courseDb.start_date,
                courseDb.end_date,
                courseDb.created_at,
                courseDb.updated_at,
                courseDb.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }

    async getById(id: number): Promise<CourseEntity | null> {
        try {
            const courseEntityDb = await CourseSequelize.findOne({
                where:{
                    id:id
                },
                include:[
                    {
                        model:InstitutionSequelize,
                        as:"institution"
                    }
                ]
            })

            if (!courseEntityDb) { return null }

            return new CourseEntity(
                courseEntityDb.id,
                courseEntityDb.external_id,
                courseEntityDb.institution_id,
                courseEntityDb.name,
                courseEntityDb.short_name,
                courseEntityDb.id_number,
                courseEntityDb.start_date,
                courseEntityDb.end_date,
                courseEntityDb.created_at,
                courseEntityDb.updated_at,
                courseEntityDb.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }

    async getAll(): Promise<CourseEntity[]> {
        try {
            return await CourseSequelize.findAll()
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }

    async deleteById(id: number): Promise<CourseEntity> {
        try {
            const courseEntityDb = await this.getById(id)
            if (!courseEntityDb) { throw CustomError.notFound('Course not found') }

            await CourseSequelize.destroy({
                where:{
                    id: id
                }
            })

            return courseEntityDb
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }

    async update(registerCourseDto: RegisterCourseDto): Promise<CourseEntity | null> {
        try {
            const {institution, course} = registerCourseDto

            const institutionDb = await new InstitutionDatasourceImpl().getByAbbreviationAndModality(institution.institutionAbbreviation,institution.modality)

            if (!institutionDb) { throw CustomError.notFound('Institution not found')}

            const courseDb = await this.getByExternalIdAndInstitutionId(course.id,institutionDb.id)
            if (!courseDb) { throw CustomError.notFound('Course not found')}

            await CourseSequelize.update({
                external_id: course.id,
                institution_id: institutionDb.id,
                name: course.fullname,
                short_name: course.shortname,
                id_number: course.idnumber,
                start_date: course.startdate,
                end_date: course.enddate
            },{
                where:{
                    external_id: course.id,
                    institution_id: institutionDb.id
                }
            })

            return await this.getByExternalIdAndInstitutionId(course.id,institutionDb.id)
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }

    async getByExternalIdAndInstitutionId(externalId: number, institutionId: number): Promise<CourseEntity | null> {
        try {
            const courseDb = await CourseSequelize.findOne({
                where:{
                    external_id: externalId,
                    institution_id: institutionId
                }
            })

            if (!courseDb) return null

            return new CourseEntity(
                courseDb.id,
                courseDb.external_id,
                courseDb.institution_id,
                courseDb.name,
                courseDb.short_name,
                courseDb.id_number,
                courseDb.start_date,
                courseDb.end_date,
                courseDb.created_at,
                courseDb.updated_at,
                courseDb.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error
            }
            throw CustomError.internalSever();
        }
    }

    async deleteByExternalId(deleteByExternalId: DeleteCourseMdlDto): Promise<CourseEntity> {
        try {
            const {institution,courseid} = deleteByExternalId

            const institutionDb = await new InstitutionDatasourceImpl().getByAbbreviationAndModality(institution.institutionAbbreviation,institution.modality)
            if (!institutionDb) { throw CustomError.notFound('Institution not found')}

            const courseDb = await this.getByExternalIdAndInstitutionId(courseid,institutionDb.id)
            if (!courseDb) { throw CustomError.notFound('Course not found')}

            return courseDb
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}