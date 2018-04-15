const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let client;

    try {
        client = await MongoClient.connect(
            process.env.CosmosDBURL,
            { auth: auth });

        console.log('Connected succesfuly');
        const db = client.db(process.env.CosmosDB);

        const result = await db
            .collection('Heroes')
            .find()
            .toArray();

        console.log('retrived successfuly');
        result.forEach(hero => delete hero._id);
        context.res = {
            status: 200,
            body: result
        };
    } catch (err) {
        console.log(err.stack);

        context.res = {
            status: 500,
            body: []
        };
    }

    if (client) {
        client.close();
    }
};