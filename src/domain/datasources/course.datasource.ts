import {CourseEntity} from "../entities/course.entity";
import {RegisterCourseDto} from "../dtos/course/register-course.dto";
import {DeleteCourseMdlDto} from "../dtos/course/delete-course-mdl.dto";

export abstract class CourseDatasource {
    abstract register(registerCourseDto:RegisterCourseDto): Promise<CourseEntity>
    abstract getById(id:number): Promise<CourseEntity | null>
    abstract getAll(): Promise<CourseEntity[]>
    abstract getByExternalIdAndInstitutionId(externalId:number, institutionId: number): Promise<CourseEntity | null>
    abstract deleteById(id:number): Promise<CourseEntity>
    abstract update(registerCourseDto:RegisterCourseDto): Promise<CourseEntity | null>
    abstract deleteByExternalId(deleteByExternalId: DeleteCourseMdlDto): Promise<CourseEntity>
}