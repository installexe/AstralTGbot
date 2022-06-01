const TelegramApi = require('node-telegram-bot-api')

const token = '5564326629:AAENFgUQ2VMXnqtFkPn8EEPaMdlkiK-kXPQ'
const {gameOptions, againOptions} = require('./options')
const bot = new TelegramApi(token, {polling: true})

const chats = {} // 



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Цифра от 0 до 9')
        const randomNumber = Math.floor(Math.random() * 10)
        chats[chatId] = randomNumber;
        await bot.sendMessage(chatId, 'Отгадывай!', gameOptions)
}
const start = () => {
    bot.setMyCommands([
        {command: '/start', description:'Начальное приветствие'},
        {command: '/info', description: 'Получить свое имя'},
        {command: '/game', description: 'Игра'}
    ])
    bot.on('message', async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start'){
       await bot.sendSticker(chatId, `https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp`)
      return bot.sendMessage(chatId, 'Hello')
    }
    if (text === '/info'){
        return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} `)
    }
    if (text === '/game'){
       return startGame(chatId);
    }
    return bot.sendMessage(chatId, 'Не понимаю тебя, братишка')
    })
}
bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again'){
     return startGame(chatId);
    }
    if (data === chats[chatId]){
        return await bot.sendMessage(chatId, `Поздравляю ты угадал цифру ${chats[chatId]}`, againOptions)
    } else {
        return await bot.sendMessage(chatId, `Не угадал, братишка. Была цифра ${chats[chatId]}`, againOptions)
    }
    
})
start()