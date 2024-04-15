import {MoodleWsFunctionEntity} from "../entities/moodleWsFunction.entity";
import {MoodleWsFunctionDto} from "../dtos/moodleWsFunction.dto";
import {UpdateMoodleWsFunctionDto} from "../dtos/updateMoodleWsFunction.dto";

export abstract class MoodleWsFunctionDatasource {
    abstract register(moodleWsFunctionDto:MoodleWsFunctionDto): Promise<MoodleWsFunctionEntity>
    abstract update(updateMoodleWsFunctionDto: UpdateMoodleWsFunctionDto): Promise<MoodleWsFunctionEntity>
    abstract getById(id: number): Promise<MoodleWsFunctionEntity | null>
    abstract getByAbbreviation(abbreviation: string): Promise<MoodleWsFunctionEntity | null>
    abstract getAll(): Promise<MoodleWsFunctionEntity[]>
    abstract deleteById(id: number): Promise<MoodleWsFunctionEntity>
    abstract deleteByAbbreviation(abbreviation: string): Promise<MoodleWsFunctionEntity>
}