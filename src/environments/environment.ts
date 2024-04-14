export const environment = {
    production: false,
    api: {
        coin:{
            //url:"https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
            url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
            header:{
                //"X-CMC_PRO_API_KEY":"8489424a-7282-49ec-85ad-3da2a52851a5",
                "X-CMC_PRO_API_KEY":"b6cdf374-461b-41fe-82fb-64caa7eef266"
            },
            imageBaseUrl: 'https://s2.coinmarketcap.com',
            charImageBaseUrl: 'https://s3.coinmarketcap.com'
        }
    },


};