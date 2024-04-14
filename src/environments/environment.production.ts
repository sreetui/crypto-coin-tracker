export const environment = {
    production: true,
    api: {
        coin:{
            url:"https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
            header:{
                "X-CMC_PRO_API_KEY":"b6cdf374-461b-41fe-82fb-64caa7eef266"
            },
            imageBaseUrl: 'https://s2.coinmarketcap.com',
            charImageBaseUrl: 'https://s3.coinmarketcap.com'
        }
    },

};