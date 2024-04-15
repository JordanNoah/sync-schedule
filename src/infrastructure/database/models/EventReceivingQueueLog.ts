import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";
import {EventReceivingQueueSequelize} from "./EventReceivingQueue";
import {StatusTransactionCatalogSequelize} from "./StatusTransactionCatalog";

interface EventReceivingQueueLogRow {
    id: number,
    event_receiving_queue_id: number,
    status_transaction_catalog_id: number,
    createdAt?:Date,
    updatedAt?:Date
}

export class EventReceivingQueueLogSequelize extends Model<EventReceivingQueueLogRow, Omit<EventReceivingQueueLogRow, 'id'>> {
    declare id: number
    declare event_receiving_queue_id: number
    declare status_transaction_catalog_id: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

EventReceivingQueueLogSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    event_receiving_queue_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: EventReceivingQueueSequelize,
            key:'id'
        }
    },
    status_transaction_catalog_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: StatusTransactionCatalogSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    timestamps: true,
    paranoid: true,
    tableName: 'event_receiving_queue_log',
    underscored:true
})

EventReceivingQueueSequelize.hasMany(EventReceivingQueueLogSequelize,{foreignKey:'event_receiving_queue_id', as:'eventReceivingQueue'})
EventReceivingQueueLogSequelize.belongsTo(EventReceivingQueueSequelize,{foreignKey:'event_receiving_queue_id', as:'eventReceivingQueue'})

StatusTransactionCatalogSequelize.hasMany(EventReceivingQueueLogSequelize,{foreignKey:'status_transaction_catalog_id', as:'statusTransactionCatalog'})
EventReceivingQueueLogSequelize.belongsTo(StatusTransactionCatalogSequelize,{foreignKey:'status_transaction_catalog_id', as: 'statusTransactionCatalog'})