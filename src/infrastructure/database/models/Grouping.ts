import {sequelize} from "../sequelize";
import {DataTypes, Model, Sequelize} from "sequelize";
import {CourseSequelize} from "./Course";

interface GroupingRow {
    id: number;
    external_id: number;
    name: string;
    description: string;
    id_number: string;
    course_id: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export class GroupingSequelize extends Model<GroupingRow,Omit<GroupingRow, 'id'>> {
    declare id: number
    declare external_id: number
    declare name: string
    declare description: string
    declare id_number: string
    declare course_id: number
    declare readonly created_at: Date
    declare readonly updated_at: Date
    declare readonly deleted_at: Date
}

GroupingSequelize.init({
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
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    id_number:{
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
    timestamps: true,
    tableName: 'grouping',
    underscored: true,
    paranoid: true
})