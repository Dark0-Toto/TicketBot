const mysql = require("mysql");

class Database {

    constructor() {
        this.db = new mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "DATABASE NAME"
        })
    }

    connect() {

        this.db.connect(async function(err) {
            if(err) throw err;
            console.log("Connected!");
        })

        return this.db;
    }

    /**
     * @param {string} table
     * @param {string[]} keyvalues
     * @param {string[]} values 
    */

    insert(table, keyvalues, values) {
        let sql = `INSERT INTO ${table} (${keyvalues.join(", ")}) VALUES (${values.map(value => `'${value}'`).join(", ")})`;
        this.db.query(sql, function(err) {
            if(err) throw err;
        })
    }

    //db.insert("server", ["guildID", "logs"], [message.guildId, "fr"])

    /**
     * @param {string} table
     * @param {string[]} key
     * @param {string[]} keyID
    */

    delete(table, key, keyID) {
        if(Array.isArray(key)) this.db.query(`DELETE FROM ${table} WHERE ${key[0]} = '${keyID[0]}' AND ${key[1]} = '${keyID[1]}'`);
        else this.db.query(`DELETE FROM ${table} WHERE ${key} = '${keyID}'`);
    }

    //db.delete("server", "guildID", message.guildId)

    /**
     * @param {string} table
     * @param {string} keyvalue
     * @param {string} keyvalue
     * @param {string[]} key
     * @param {string[]} keyID
    */

    update(table, keyvalue, newvalue, key, keyID) {
        if (Array.isArray(key)) {
            const query = `UPDATE ${table} SET ${keyvalue} = '${newvalue}' WHERE ${key[0]} = '${keyID[0]}' AND ${key[1]} = '${keyID[1]}'`;
            this.db.query(query, function(err) {
                if (err) throw err;
            });
        } else {
            const query = `UPDATE ${table} SET ${keyvalue} = '${newvalue}' WHERE ${key} = '${keyID}'`;
            this.db.query(query, function(err) {
                if (err) throw err;
            });
        }
    }

    /**
     * @param {string} table 
     * @param {string[]} key 
     * @param {string[]} keyID
     * @returns {{}[]}
    */

    select(table, key, keyID) {
        return new Promise(async req => {
            if(Array.isArray(key)) {
                this.db.query(`SELECT * FROM ${table} WHERE ${key[0]} = '${keyID[0]}' AND ${key[1]} = '${keyID[1]}'`, async (err, res) => {
                    req(res);
                })
            }
        })
    }

    selectone(table, key, keyID) {
        return new Promise(async req => {
            this.db.query(`SELECT * FROM ${table} WHERE ${key} = '${keyID}'`, async (err, res) => {
                req(res)
            })
        })
    }

    /**
     * @param {string} table 
     * @param {string} key 
     * @param {string} keyID
     * @typedef {{guildId: string, etatanticreaterole: "true" | "false", etatantideleterole: "true" | "false", etatantilink: "true" | "false", antideletechannel: "true" | "false", anticreatechannel: "true" | "false"}} GuildData
     * @returns {GuildData[]}
    */

    selectGuild(guildId) {
        return new Promise(async req => {
            this.db.query(`SELECT * FROM guilds WHERE guildId = '${guildId}'`, async (err, res) => {
                req(res)
            })
        })
    }

    selectall(table) {
        return new Promise(async req => {
            this.db.query(`SELECT * FROM ${table}`, async (err, res) => {
                req(res)
            })
        })
    }
}

module.exports = Database;