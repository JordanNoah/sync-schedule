import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

interface EventReceivingQueueRow {
    id: number,
    uuid: string,
    received_data: string,
    processed_at: Date | null,
    attempts: number,
    event_name: string,
    message_id: string,
    created_at?:Date,
    updated_at?:Date,
    deleted_at?:Date
}

export class EventReceivingQueueSequelize extends Model<EventReceivingQueueRow,Omit<EventReceivingQueueRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare received_data: string
    declare processed_at: Date | null
    declare attempts: number
    declare event_name: string
    declare message_id: string
    declare readonly created_at:Date
    declare readonly updated_at:Date
    declare readonly deleted_at:Date
}

EventReceivingQueueSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    uuid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    received_data:{
        type: DataTypes.TEXT('long'),
        allowNull:false
    },
    processed_at:{
        type: DataTypes.DATE,
        allowNull:true
    },
    attempts:{
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    event_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    message_id:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'event_receiving_queue',
    underscored:true
})