import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

interface StatusTransactionCatalogRow {
    id: number,
    name: string,
    abbreviation: string,
    description: string,
    created_at?:Date,
    updated_at?: Date,
    deleted_at?: Date
}

export class StatusTransactionCatalogSequelize extends Model<StatusTransactionCatalogRow, Omit<StatusTransactionCatalogRow, 'id'>> {
    declare id: number
    declare name: string
    declare abbreviation: string
    declare description: string
    declare readonly created_at: Date
    declare readonly updated_at: Date
    declare readonly deleted_at: Date
}

StatusTransactionCatalogSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    abbreviation:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'status_transaction_catalog',
    underscored: true
})