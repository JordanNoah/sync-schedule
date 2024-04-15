import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";
import {EventReceivingQueueLogSequelize} from "./EventReceivingQueueLog";
import {MoodleWsFunctionSequelize} from "./MoodleWsFunction";
import {InstitutionSequelize} from "./Institution";

interface RequestToMoodleLogRow {
    id: number,
    payload: string,
    processed: boolean,
    response_detail: string,
    moodle_ws_function_id: number,
    institution_id:number,
    event_receiving_queue_log_id:number,
    createdAt?:Date,
    updatedAt?:Date
}

export class RequestToMoodleLogSequelize extends Model<RequestToMoodleLogRow, Omit<RequestToMoodleLogRow, 'id'>> {
    declare id: number
    declare payload: string
    declare processed: boolean
    declare response_detail: string
    declare moodle_ws_function_id: number
    declare institution_id: number
    declare event_receiving_queue_log_id: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

RequestToMoodleLogSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    payload:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    processed:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    response_detail:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    moodle_ws_function_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:MoodleWsFunctionSequelize,
            key:'id'
        }
    },
    event_receiving_queue_log_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:EventReceivingQueueLogSequelize,
            key:'id'
        }
    },
    institution_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:InstitutionSequelize,
            key:'id'
        }
    }
},{
    sequelize,
    timestamps:true,
    paranoid: true,
    tableName: 'request_to_moodle_log'
})

RequestToMoodleLogSequelize.belongsTo(EventReceivingQueueLogSequelize,{foreignKey:'event_receiving_queue_log_id', as:'receivingQueueLog'})
EventReceivingQueueLogSequelize.hasMany(RequestToMoodleLogSequelize,{foreignKey:'event_receiving_queue_log_id',as:'receivingQueueLog'})

RequestToMoodleLogSequelize.belongsTo(MoodleWsFunctionSequelize,{foreignKey:'moodle_ws_function_id', as:'moodleWsFunction'})
MoodleWsFunctionSequelize.hasMany(RequestToMoodleLogSequelize,{foreignKey:'moodle_ws_function_id', as:'moodleWsFunction'})

RequestToMoodleLogSequelize.belongsTo(InstitutionSequelize,{foreignKey:'institution_id', as:'institution'})
InstitutionSequelize.hasMany(RequestToMoodleLogSequelize,{foreignKey:'institution_id', as:'institution'})