const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared');

module.exports = async function (context, req) {

    let client;

    try {
        client = await MongoClient.connect(
            process.env.CosmosDBURL,
            { auth: auth });

        console.log('Connected succesfuly');

        let hero = ({ id, name, saying } = req.body);
        const db = client.db(process.env.CosmosDB);


        const result = await db.collection('Heroes').insertOne({
            id: hero.id,
            name:hero.name,
            saying: hero.saying
        });

        context.res = {
            status: 200,
            body: hero
        };
    } catch (err) {
        console.log(err.stack);

        context.res = {
            status: 500,
            body: {}
        };
    }

    if (client) {
        client.close();
    }
};