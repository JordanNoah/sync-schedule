import {MoodleWsFunctionDatasource} from "../../domain/datasources/moodleWsFunction.datasource";
import {MoodleWsFunctionDto} from "../../domain/dtos/moodleWsFunction.dto";
import {MoodleWsFunctionEntity} from "../../domain/entities/moodleWsFunction.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {MoodleWsFunctionSequelize} from "../database/models";
import {UpdateMoodleWsFunctionDto} from "../../domain/dtos/updateMoodleWsFunction.dto";

export class MoodleWsFunctionDatasourceImpl implements MoodleWsFunctionDatasource {
    async register(moodleWsFunctionDto: MoodleWsFunctionDto): Promise<MoodleWsFunctionEntity> {
        try {
            const {
                moodleFunction,
                abbreviation
            } = moodleWsFunctionDto

            const [moodleWsFunction, created] = await MoodleWsFunctionSequelize.findOrCreate({
                where:{
                    abbreviation: abbreviation
                },
                defaults:{
                    ws_function: moodleFunction,
                    abbreviation: abbreviation
                }
            })

            return new MoodleWsFunctionEntity(
                moodleWsFunction.id,
                moodleWsFunction.ws_function,
                moodleWsFunction.abbreviation,
                moodleWsFunction.created_at,
                moodleWsFunction.updated_at,
                moodleWsFunction.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async update(updateMoodleWsFunctionDto: UpdateMoodleWsFunctionDto): Promise<MoodleWsFunctionEntity> {
        try {
            let wsFunction = await this.getById(updateMoodleWsFunctionDto.id)

            if (!wsFunction) { throw CustomError.notFound('Ws not found'); }

            await MoodleWsFunctionSequelize.update({
                ws_function: updateMoodleWsFunctionDto.moodleFunction,
                abbreviation: updateMoodleWsFunctionDto.abbreviation,
            },{
                where:{
                    id: updateMoodleWsFunctionDto.id
                }
            })

            wsFunction.wsFunction = updateMoodleWsFunctionDto.moodleFunction
            wsFunction.abbreviation = updateMoodleWsFunctionDto.abbreviation

            return new MoodleWsFunctionEntity(
                wsFunction.id,
                wsFunction.wsFunction,
                wsFunction.abbreviation,
                wsFunction.createdAt,
                wsFunction.updatedAt,
                wsFunction.deletedAt
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getById(id: number): Promise<MoodleWsFunctionEntity | null> {
        try {
            let moodleWsFunction = await MoodleWsFunctionSequelize.findOne({
                where: {
                    id: id
                }
            })

            if (!moodleWsFunction) { return null }

            return new MoodleWsFunctionEntity(
                moodleWsFunction.id,
                moodleWsFunction.ws_function,
                moodleWsFunction.abbreviation,
                moodleWsFunction.created_at,
                moodleWsFunction.updated_at,
                moodleWsFunction.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getAll(): Promise<MoodleWsFunctionEntity[]> {
        try {
            const moodleWsFunctions = await MoodleWsFunctionSequelize.findAll();
            let moodleWsFunctionEntities: MoodleWsFunctionEntity[] = [];
            for (let moodleWsFunction of moodleWsFunctions) {
                const moodleWsFunctionEntity = new MoodleWsFunctionEntity(
                    moodleWsFunction.id,
                    moodleWsFunction.ws_function,
                    moodleWsFunction.abbreviation,
                    moodleWsFunction.created_at,
                    moodleWsFunction.updated_at,
                    moodleWsFunction.deleted_at
                )

                moodleWsFunctionEntities.push(moodleWsFunctionEntity)
            }
            return moodleWsFunctionEntities
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getByAbbreviation(abbreviation: string): Promise<MoodleWsFunctionEntity | null> {
        try {
            const moodleWsFunction = await MoodleWsFunctionSequelize.findOne({
                where: {
                    abbreviation: abbreviation
                }
            })

            if (!moodleWsFunction) { return null }

            return new MoodleWsFunctionEntity(
                moodleWsFunction.id,
                moodleWsFunction.ws_function,
                moodleWsFunction.abbreviation,
                moodleWsFunction.created_at,
                moodleWsFunction.updated_at,
                moodleWsFunction.deleted_at
            )
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async deleteById(id: number): Promise<MoodleWsFunctionEntity> {
        try {
            let wsFunction = await this.getById(id)
            if (!wsFunction) { throw CustomError.notFound('Ws not found') }

            await MoodleWsFunctionSequelize.destroy({
                where:{
                    id: wsFunction.id
                }
            })

            return wsFunction
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async deleteByAbbreviation(abbreviation: string): Promise<MoodleWsFunctionEntity> {
        try {
            let wsFunction = await this.getByAbbreviation(abbreviation)
            if (!wsFunction) { throw CustomError.notFound('Ws not found') }

            await MoodleWsFunctionSequelize.destroy({
                where:{
                    id: wsFunction.id
                }
            })
            return wsFunction
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}