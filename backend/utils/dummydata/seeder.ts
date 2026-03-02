
import path from 'path';
import DBconnection from "../../config/database";
import fs from 'fs';
import productsModel from "../../model/productsModel";
import dotenv from 'dotenv';

// dotenv config (path relative to this file so it works from any cwd)
dotenv.config({ path: path.join(__dirname, '../../config.env') });

// connect to DB
DBconnection();

// Read data
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'product.json'), 'utf-8'));
// Insert data into DB
const insertData = async () => {
    try {
        await productsModel.create(products);

        console.log('Data Inserted');
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Delete data from DB
const destroyData = async () => {
    try {
        await productsModel.deleteMany();
        console.log('Data Destroyed');
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
    insertData();
} else if (process.argv[2] === '-d') {
    destroyData();
}