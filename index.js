const TelegramApi = require('node-telegram-bot-api')

const token = '886991589:AAH_93U-yefOqAcfXHcQdRSmvdLh2KyewxQ'

const bot = new TelegramApi(token, { polling: true })

const chats = {}

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: '1', callback_data: '1' },
        { text: '2', callback_data: '2' },
        { text: '3', callback_data: '3' },
      ],
      [
        { text: '4', callback_data: '4' },
        { text: '5', callback_data: '5' },
        { text: '6', callback_data: '6' },
      ],
      [
        { text: '7', callback_data: '7' },
        { text: '8', callback_data: '8' },
        { text: '9', callback_data: '9' },
      ],
    ],
  }),
}

const startOptions = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: 'Начало' }],
      [{ text: 'Игра' }],
      [{ text: 'Инфо' }],
      [
        {
          text: 'Авторизоваться',
          request_contact: true,
        },
      ],
    ],
    // one_time_keyboard: true,
    // resize_keyboard: true,
  }),
}

const hideKeyboard = {
  reply_markup: JSON.stringify({
    hide_keyboard: true,
  }),
}

const noOptions = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: '12', callbacks_data: '1' }],
      [{ text: '23', callbacks_data: '2' }],
      [{ text: '34', callbacks_data: '3' }],
      // [{ text: '4', callbacks_data: '4' }],
      // [{ text: '5', callbacks_data: '5' }],
      // [{ text: '6', callbacks_data: '6' }],
      // [{ text: '7', callbacks_data: '7' }],
      // [{ text: '8', callbacks_data: '8' }],
      // [{ text: '9', callbacks_data: '9' }],
    ],
  }),
}

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начально приветствие' },
    { command: '/info', description: 'Получить информацию' },
    { command: '/game', description: 'Сыграть в игру' },
  ])

  bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    console.log(`message`, msg)

    if (text === '/start') {
      await bot.sendSticker(
        chatId,
        'CAACAgIAAxkBAANRYJVz3YnMDx9QA86tgBjYYC9B9xwAAgUAA1EakA9_rqZIEu6XYR8E'
      )
      return await bot.sendMessage(
        chatId,
        'Здравствуйте! Меня зовут Айк, я ассистент Академии Юных Волшебников. Чем могу помочь?',
        startOptions
      )
    }
    if (text === '/info') {
      return await bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
      )
    }
    if (text === '/game') {
      await bot.sendMessage(chatId, `Я загадаю цифру от 0 до 9`)
      const rndNum = Math.floor(Math.random() * 10)
      chats[chatId] = rndNum
      return await bot.sendMessage(chatId, `Отгадай её`, gameOptions)
    }
    return await bot.sendMessage(chatId, `Я Вас не понимаю`)
  })

  bot.on('callback_query', async (msg) => {
    const data = msg.data
    const chatId = msg.message.chat.id

    if (data === '' + chats[chatId]) {
      return await bot.sendMessage(
        chatId,
        `Поздравляю! ТЫ угадал - это была цифра ${data}`
      )
    } else {
      return await bot.sendMessage(
        chatId,
        `Не угадал - это была не цифра ${data}. Попробуй еще раз`,
        gameOptions
      )
    }
    // console.log(`callback_query`, msg)
  })
}

start()
