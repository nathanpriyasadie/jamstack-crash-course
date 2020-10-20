require('dotenv').config();

const { DELETE_LINK } = require('./utils/linkQueries');
const sendQuery = require('./utils/sendQuery');
const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {

    if (event.httpMethod !== 'DELETE') {
        return formattedResponse(405, { err: 'Method not supported' })
    }

    const { _id: id } = JSON.parse(event.body)
    console.log(event.body)
    const variables = { id }
    try {
        const { deleteLink: deletedLink } = await sendQuery(DELETE_LINK, variables);
        return formattedResponse(200, deletedLink)
    } catch (error) {
        console.error(error)
        return formattedResponse(500, { err: 'something went wrong' })
    }
}