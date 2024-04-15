import {StatusTransactionCatalogDatasource} from "../../domain/datasources/statusTransactionCatalog.datasource";
import {RegisterStatusTransactionCatalogDto} from "../../domain/dtos/registerStatusTransactionCatalog.dto";
import {StatusTransactionCatalogEntity} from "../../domain/entities/statusTransactionCatalog.entity";
import {UpdateStatusTransactionCatalogDto} from "../../domain/dtos/updateStatusTransactionCatalog.dto";
import { CustomError } from "../../domain/errors/custom.error";
import {StatusTransactionCatalogSequelize} from "../database/models";

export class StatusTransactionCatalogDatasourceImpl implements StatusTransactionCatalogDatasource{
    async register(registerStatusTransactionCatalogDto: RegisterStatusTransactionCatalogDto): Promise<StatusTransactionCatalogEntity> {
        try{
            const {
                name,
                abbreviation,
                description
            } = registerStatusTransactionCatalogDto;

            const [statusTransactionCatalog, created] = await StatusTransactionCatalogSequelize.findOrCreate({
                where:{
                    abbreviation:abbreviation
                },
                defaults:{
                    name:name,
                    abbreviation:abbreviation,
                    description:description
                }
            })

            return new StatusTransactionCatalogEntity(
                statusTransactionCatalog.id,
                statusTransactionCatalog.name,
                statusTransactionCatalog.abbreviation,
                statusTransactionCatalog.description,
                statusTransactionCatalog.created_at,
                statusTransactionCatalog.updated_at,
                statusTransactionCatalog.deleted_at
            )
        } catch(error) {
            if(error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async update(updateStatusTransactionCatalogDto: UpdateStatusTransactionCatalogDto): Promise<StatusTransactionCatalogEntity> {
        try{

            let statusTransactionCatalog = await this.getById(updateStatusTransactionCatalogDto.id)
            if (!statusTransactionCatalog) { throw CustomError.notFound('Status transaction catalog not found'); }

            await StatusTransactionCatalogSequelize.update({
                name:updateStatusTransactionCatalogDto.name,
                abbreviation:updateStatusTransactionCatalogDto.abbreviation,
                description:updateStatusTransactionCatalogDto.description
            },{
                where:{
                    abbreviation:updateStatusTransactionCatalogDto.abbreviation
                }
            })

            statusTransactionCatalog.name = updateStatusTransactionCatalogDto.name
            statusTransactionCatalog.abbreviation = updateStatusTransactionCatalogDto.abbreviation
            statusTransactionCatalog.description = updateStatusTransactionCatalogDto.description

            return new StatusTransactionCatalogEntity(
                statusTransactionCatalog.id,
                statusTransactionCatalog.name,
                statusTransactionCatalog.abbreviation,
                statusTransactionCatalog.description,
                statusTransactionCatalog.createdAt,
                statusTransactionCatalog.updatedAt,
                statusTransactionCatalog.deletedAt
            )
        }catch(error){
            if(error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getById(id: number): Promise<StatusTransactionCatalogEntity | null> {
        try {
            const statusTransactionCatalog = await StatusTransactionCatalogSequelize.findOne({
                where:{
                    id: id
                }
            })

            if (!statusTransactionCatalog) { return null }
            return new StatusTransactionCatalogEntity(
                statusTransactionCatalog.id,
                statusTransactionCatalog.name,
                statusTransactionCatalog.abbreviation,
                statusTransactionCatalog.description,
                statusTransactionCatalog.created_at,
                statusTransactionCatalog.updated_at,
                statusTransactionCatalog.deleted_at
            )
        } catch(error) {
            if(error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getByAbbreviation(abbreviation: string): Promise<StatusTransactionCatalogEntity | null> {
        try{
            const statusTransactionCatalog = await StatusTransactionCatalogSequelize.findOne({
                where:{
                    abbreviation:abbreviation
                }
            })

            if (!statusTransactionCatalog) { return null }

            return new StatusTransactionCatalogEntity(
                statusTransactionCatalog.id,
                statusTransactionCatalog.name,
                statusTransactionCatalog.abbreviation,
                statusTransactionCatalog.description,
                statusTransactionCatalog.created_at,
                statusTransactionCatalog.updated_at,
                statusTransactionCatalog.deleted_at
            )
        }catch(error){
            if(error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getAll(): Promise<StatusTransactionCatalogEntity[]> {
        try{
            const statusTransactionCatalogs = await StatusTransactionCatalogSequelize.findAll()

            let statusTransactionCatalogEntities: StatusTransactionCatalogEntity[] = []

            for (let statusTransactionCatalog of statusTransactionCatalogs) {
                const statusTransactionCatalogEntity = new StatusTransactionCatalogEntity(
                    statusTransactionCatalog.id,
                    statusTransactionCatalog.name,
                    statusTransactionCatalog.abbreviation,
                    statusTransactionCatalog.description,
                    statusTransactionCatalog.created_at,
                    statusTransactionCatalog.updated_at,
                    statusTransactionCatalog.deleted_at
                )

                statusTransactionCatalogEntities.push(statusTransactionCatalogEntity)
            }

            return statusTransactionCatalogEntities;
        }catch(error){
            if(error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async deleteById(id: number): Promise<StatusTransactionCatalogEntity> {
        try{
            let statusTransactionCatalog = await this.getById(id)
            if (!statusTransactionCatalog) { throw CustomError.notFound('Status transaction catalog not found') }

            await StatusTransactionCatalogSequelize.destroy({
                where:{
                    id: statusTransactionCatalog.id
                }
            })

            return statusTransactionCatalog
        }catch(error){
            if(error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async deleteByAbbreviation(abbreviation: string): Promise<StatusTransactionCatalogEntity> {
        try{
            let statusTransactionCatalog = await this.getByAbbreviation(abbreviation)
            if (!statusTransactionCatalog) { throw CustomError.notFound('Status transaction catalog not found') }

            await StatusTransactionCatalogSequelize.destroy({
                where:{
                    id: statusTransactionCatalog.id
                }
            })

            return statusTransactionCatalog
        }catch(error){
            if(error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}