import sqlite from "sqlite";

const InitDB = async () => {
    const db = await sqlite.open('./db.sqlite');

    const getContacts = async () => {
        const rows = await db.all("Select contact_id as id, name, email from contacts")
        return rows;
    }
    const controller = {
        getContacts
    }
    return controller;
}

export default InitDB;