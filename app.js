const express = require('express');
const bodyParser = require('body-parser');
const grapqlHttp = require('express-graphql');
const {buildSchema} = require('graphql');


const app = express();

app.use('/graphql', grapqlHttp({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]
        }
    
        type RootMutation {
            createEvent(name: String): String
        }
    
        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () =>{
            return ['Horror','Action','Fantastic'];
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
})
);

app.get('/', (req, res, next) => {
    res.send("Merhaba Dünya! ");
});

//Port
app.listen(3000);