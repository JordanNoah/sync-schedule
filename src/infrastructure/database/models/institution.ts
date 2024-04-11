import {DataTypes, Model, Sequelize} from "sequelize";
import {sequelize} from "../sequelize";

interface InstitutionRow {
    id: number,
    uuid: string,
    name: string,
    full_name: string,
    abbreviation: string,
    domain:string,
    website: string,
    rest_path: string,
    modality: string,
    translation: string,
    token: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
}

export class InstitutionSequelize extends Model<InstitutionRow,Omit<InstitutionRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string
    declare full_name: string
    declare abbreviation: string
    declare domain: string
    declare website: string
    declare rest_path: string
    declare modality: string
    declare translation: string
    declare token: string
    declare readonly created_at: Date
    declare readonly updated_at: Date
    declare readonly deleted_at: Date
}

InstitutionSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    uuid:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    full_name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    abbreviation:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    domain:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    website:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    rest_path:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    modality:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    translation:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    token:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'institution',
    underscored:true,
    paranoid:true
})