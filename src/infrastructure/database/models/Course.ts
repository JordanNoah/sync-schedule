import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";
import {InstitutionSequelize} from "./Institution";

interface CourseRow{
    id: number,
    external_id: number,
    institution_id: number,
    name: string,
    short_name: string,
    id_number: string,
    start_date: Date,
    end_date: Date,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
}

export class CourseSequelize extends Model<CourseRow,Omit<CourseRow, 'id'>> {
    declare id: number
    declare external_id: number
    declare institution_id: number
    declare name: string
    declare short_name: string
    declare id_number: string
    declare start_date: Date
    declare end_date: Date
    declare readonly created_at: Date
    declare readonly updated_at: Date
    declare readonly deleted_at: Date
}

CourseSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    external_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    institution_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: InstitutionSequelize,
            key: 'id'
        }
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    short_name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_number:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'course',
    underscored:true,
    paranoid:true
})