import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";
import {SectionSequelize} from "./section";

interface ModuleRow {
    id: number,
    external_id: number,
    section_id: number,
    name: string,
    type: string,
    url: string,
    start_date: Date,
    end_date: Date,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
}

export class ModuleSequelize extends Model<ModuleRow,Omit<ModuleRow, 'id'>> {
    declare id: number
    declare external_id: number
    declare section_id: number
    declare name: string
    declare type: string
    declare url: string
    declare start_date: Date
    declare end_date: Date
    declare readonly created_at: Date
    declare readonly updated_at: Date
    declare readonly deleted_at: Date
}

ModuleSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    external_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    section_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SectionSequelize,
            key: 'id'
        }
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    type:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    url:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    start_date:{
        type: DataTypes.DATE,
        allowNull: true
    },
    end_date:{
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    sequelize,
    timestamps:true,
    tableName:'module',
    underscored:true,
    paranoid:true
})