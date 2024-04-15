import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

interface MoodleWsFunctionRow {
    id: number,
    ws_function: string,
    abbreviation: string,
    created_at?: Date,
    updated_at?: Date
    deleted_at?: Date
}

export class MoodleWsFunctionSequelize extends Model<MoodleWsFunctionRow,Omit<MoodleWsFunctionRow, 'id'>> {
    declare id: number
    declare ws_function: string
    declare abbreviation: string
    declare readonly created_at: Date
    declare readonly updated_at: Date
    declare readonly deleted_at: Date
}

MoodleWsFunctionSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    ws_function:{
        type: DataTypes.STRING,
        allowNull: false
    },
    abbreviation:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'moodle_ws_function',
    underscored:true
})