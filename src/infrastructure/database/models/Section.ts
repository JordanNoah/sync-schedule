import {DataTypes, Model, Sequelize} from "sequelize"
import {sequelize} from "../sequelize";
import {CourseSequelize} from "./Course";

interface SectionRow {
    id: number,
    name: string,
    description: string,
    course_id: number,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
}

export class SectionSequelize extends Model<SectionRow, Omit<SectionRow, 'id'>> {
    declare id: number
    declare name: number
    declare description: string
    declare course_id: number
    declare readonly created_at: Date
    declare readonly updated_at: Date
    declare readonly deleted_at: Date
}

SectionSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    course_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CourseSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    timestamps:true,
    tableName:'section',
    underscored:true,
    paranoid:true
})