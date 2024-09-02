const addressTariffs = [
    {
        id: 1,
        provider: 'Telia Eesti AS',
        speed: 100,
        chanels: 120,
        mobileCommunication: {
            data: 40,
            time: 2000,
            sms: 500
        },
        price: 100
    },
    {
        id: 2,
        provider: 'Telia Eesti AS',
        speed: 200,
        chanels: 100,
        mobileCommunication: {
            data: 10,
            time: 3000,
            sms: 100
        },
        price: 150
    },
    {
        id: 3,
        provider: 'Tele2 Eesti AS',
        speed: 100,
        chanels: 200,
        mobileCommunication: {
            data: 15,
            time: 1000,
            sms: 100
        },
        price: 115
    },
    {
        id: 4,
        provider: 'STV AS',
        speed: 150,
        chanels: 200,
        mobileCommunication: {
            data: 15,
            time: 1000,
            sms: 100
        },
        price: 140
    },
    {
        id: 5,
        provider: 'STV AS',
        speed: 150,
        mobileCommunication: {
            data: 25,
            time: 6000,
            sms: 800
        },
        price: 80
    },
    {
        id: 6,
        provider: 'Telset AS',
        speed: 150,
        chanels: 300,
        mobileCommunication: {
            data: 50,
            time: 9000,
            sms: 900
        },
        price: 183
    },
    {
        id: 7,
        provider: 'Telset AS',
        speed: 200,
        chanels: 700,
        price: 213
    },
    {
        id: 8,
        provider: 'Majanet OÜ',
        speed: 100,
        chanels: 50,
        mobileCommunication: {
            data: 5,
            time: 500,
            sms: 50
        },
        price: 91
    },
    {
        id: 9,
        provider: 'Tele2 Eesti AS',
        speed: 100,
        mobileCommunication: {
            data: 15,
        },
        price: 30
    },

]

export default addressTariffs;