import {RegisterStatusTransactionCatalogDto} from "../dtos/registerStatusTransactionCatalog.dto";
import {StatusTransactionCatalogEntity} from "../entities/statusTransactionCatalog.entity";
import {UpdateStatusTransactionCatalogDto} from "../dtos/updateStatusTransactionCatalog.dto";

export abstract class StatusTransactionCatalogRepository {
    abstract register(registerStatusTransactionCatalogDto:RegisterStatusTransactionCatalogDto): Promise<StatusTransactionCatalogEntity>
    abstract update(updateStatusTransactionCatalogDto:UpdateStatusTransactionCatalogDto): Promise<StatusTransactionCatalogEntity>
    abstract getById(id: number): Promise<StatusTransactionCatalogEntity | null>
    abstract getByAbbreviation(abbreviation: string): Promise<StatusTransactionCatalogEntity | null>
    abstract getAll(): Promise<StatusTransactionCatalogEntity[]>
    abstract deleteById(id: number): Promise<StatusTransactionCatalogEntity>
    abstract deleteByAbbreviation(abbreviation: string): Promise<StatusTransactionCatalogEntity>
}