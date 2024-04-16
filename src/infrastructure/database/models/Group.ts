import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";
import {CourseSequelize} from "./Course";

interface GroupRow {
    id: number,
    external_id: number,
    id_number: string | null | undefined,
    name: string,
    description: string,
    course_id:number,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
}

export class GroupSequelize extends Model<GroupRow, Omit<GroupRow, 'id'>> {
    declare id: number
    declare external_id: number
    declare id_number: string
    declare name: string
    declare description: string
    declare course_id: number
    declare readonly created_at: Date
    declare readonly updated_at: Date
    declare readonly deleted_at: Date
}

GroupSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    external_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_number:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true
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
    timestamps: true,
    tableName: "group",
    underscored: true,
    paranoid: true
})