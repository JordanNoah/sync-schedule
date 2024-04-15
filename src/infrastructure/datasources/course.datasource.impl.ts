import {CourseDatasource} from "../../domain/datasources/course.datasource";
import {CourseDto} from "../../domain/dtos/course.dto";
import {CourseEntity} from "../../domain/entities/course.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {CourseSequelize} from "../database/models";

export class CourseDatasourceImpl extends CourseDatasource {
    async register(courseDto: CourseDto): Promise<CourseEntity> {
        try {

            const [course, created] = await CourseSequelize.findOrCreate({
                defaults:{
                    external_id: courseDto.external_id,
                    institution_id: courseDto.institution_id,
                    name: courseDto.name,
                    short_name: courseDto.short_name,
                    id_number: courseDto.id_number,
                    start_date: courseDto.start_date,
                    end_date: courseDto.end_date
                },
                where:{
                    external_id: courseDto.external_id,
                    institution_id: courseDto.institution_id
                }
            })

            return new CourseEntity(
                course.id,
                course.external_id,
                course.institution_id,
                course.name,
                course.short_name,
                course.id_number,
                course.start_date,
                course.end_date,
                course.created_at,
                course.updated_at,
                course.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever();
        }
    }
}