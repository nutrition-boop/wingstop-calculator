const axios = require('axios');
async function test() {
    try {
        const res = await axios.get('https://api.stackexchange.com/2.3/questions', {
            params: {
                order: 'desc',
                sort: 'creation',
                site: 'superuser',
                pagesize: 1,
                filter: 'withbody' // Standard built-in filter
            }
        });
        console.log("Success with filter 'withbody'!");
        console.log("Title: " + res.data.items[0].title);
        console.log("Body Length: " + res.data.items[0].body.length);
    } catch (e) {
        console.log("Error status: " + (e.response ? e.response.status : e.message));
        console.log("Error data: " + (e.response ? JSON.stringify(e.response.data) : ""));
    }
}
test();
