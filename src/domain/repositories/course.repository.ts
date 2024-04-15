import {CourseDto} from "../dtos/course.dto";
import {CourseEntity} from "../entities/course.entity"

export abstract class CourseRepository {
    abstract register(courseDto:CourseDto): Promise<CourseEntity>
}