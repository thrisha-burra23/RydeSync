import { ID, TablesDB } from "appwrite";
import appwriteClient from ".";
import { APPWRITE_DB_ID } from "../utils/appwrite/constants";

class AppwriteTablesDB {
    constructor() {
        this.tablesDB = new TablesDB(appwriteClient);
    }

    async createRow(tableId, data) {
        try {
            const result = await this.tablesDB.createRow({
                databaseId: APPWRITE_DB_ID,
                tableId: tableId,
                rowId: ID.unique(),
                data: data
            });
            return result;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAllData(tableId) {
        try {
            const result = await this.tablesDB.listRows(tableId)({
                databaseId: APPWRITE_DB_ID,
                tableId: tableId
            })
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default AppwriteTablesDB