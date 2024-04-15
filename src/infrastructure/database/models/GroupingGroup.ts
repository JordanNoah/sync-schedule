import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";
import {GroupingSequelize} from "./Grouping";
import {GroupSequelize} from "./Group";

interface GroupingGroupRow {
    id: number,
    grouping_id: number,
    group_id: number,
    created_at?: number,
    updated_at?: number,
    deleted_at?: number
}

export class GroupingGroupSequelize extends Model<GroupingGroupRow, Omit<GroupingGroupRow, 'id'>> {
    declare id: number
    declare grouping_id: number
    declare group_id: number
    declare readonly created_at: Date
    declare readonly updated_at: Date
    declare readonly deleted_at: Date
}

GroupingGroupSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    grouping_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GroupingSequelize,
            key: 'id'
        }
    },
    group_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GroupSequelize,
            key: 'id'
        }
    }
},{
    sequelize,
    timestamps: true,
    tableName: 'groupingGroup',
    underscored: true,
    paranoid: true
})