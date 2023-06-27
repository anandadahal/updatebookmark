import {Client, Account, Databases} from 'appwrite'

const client = new Client();

client.setEndpoint("https://nepalinfo.itsoch.com/v1").setProject("64996787ed20b8e8075d")

export const account = new Account(client)

// for database addition
export const databases = new Databases(client, "64996799eb3a0c0a2089") 