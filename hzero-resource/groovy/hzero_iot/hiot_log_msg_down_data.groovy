package script.db

databaseChangeLog(logicalFilePath: 'script/db/hiot_log_msg_down_data.groovy') {
    changeSet(author: "hzero@hand-china.com", id: "2020-09-03-hiot_log_msg_down_data") {
        def weight = 1
        if (helper.isSqlServer()) {
            weight = 2
        } else if (helper.isOracle()) {
            weight = 3
        }
        if (helper.dbType().isSupportSequence()) {
            createSequence(sequenceName: 'hiot_log_msg_down_data_s', startValue: "1")
        }
        createTable(tableName: "hiot_log_msg_down_data", remarks: "数据下行日志数据表") {
            column(name: "DOWN_DATA_ID", type: "bigint", autoIncrement: true, remarks: "表ID，主键") { constraints(primaryKey: true) }
            column(name: "DOWN_LOG_ID", type: "bigint", remarks: "下行消息ID，hiot_log_message_down.down_log_id") { constraints(nullable: "false") }
            column(name: "PROCESS_DATA", type: "text", remarks: "指令下发的数据")
            column(name: "ERROR_MESSAGE", type: "text", remarks: "错误消息")
            column(name: "TENANT_ID", type: "bigint", defaultValue: "0", remarks: "租户id") { constraints(nullable: "false") }
            column(name: "OBJECT_VERSION_NUMBER", type: "bigint", defaultValue: "1", remarks: "行版本号，用来处理锁") { constraints(nullable: "false") }
            column(name: "creation_date", type: "datetime", defaultValueComputed: "CURRENT_TIMESTAMP", remarks: "") { constraints(nullable: "false") }
            column(name: "created_by", type: "bigint", defaultValue: "-1", remarks: "") { constraints(nullable: "false") }
            column(name: "last_updated_by", type: "bigint", defaultValue: "-1", remarks: "") { constraints(nullable: "false") }
            column(name: "last_update_date", type: "datetime", defaultValueComputed: "CURRENT_TIMESTAMP", remarks: "") { constraints(nullable: "false") }
        }


    }
}