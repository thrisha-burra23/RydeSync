import AppwriteTablesDB from "../appwrite/TablesServices";
import { APPWRITE_RIDES_TABLE_ID } from "../utils/appwrite/constants";

export async function getAllAvailableRides() {
    const tablesDB = new AppwriteTablesDB();

    const result = await tablesDB.getAllData(APPWRITE_RIDES_TABLE_ID)
    return result ;

}