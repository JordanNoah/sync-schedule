import {CourseDto} from "../dtos/course.dto";
import {CourseEntity} from "../entities/course.entity";

export abstract class CourseDatasource {
    abstract register(courseDto:CourseDto): Promise<CourseEntity>
}