const { json } = require('express');
const fetch = require('node-fetch');
const querrystring = require ('querystring');

const host = 'http://randommer.io/api/';
const headers = {
        'x-api-key': "2d4cefc346864a33b176f69b25805890"
};

async function requestSurname() {
    const param = {
        nameType: 'surname',
        quantity: '1'
    }
    const path = 'Name';

    const url =host + path + '?' + querrystring.stringify(param);

    let result = await fetch(url, { method: 'GET', headers: headers})
    .then((res) => {
        console.log(res.status);
        if (res.status === 200) return res.json();
        return null;
    })
    .then((json) => {
        if (json) return json[0];
        return null;
    });

    return result;
}

module.exports.requestSurname = requestSurname;