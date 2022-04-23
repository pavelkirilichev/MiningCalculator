import VueI18n from 'vue-i18n';
import Vue from 'vue';

Vue.use(VueI18n)

const messages = {
  ru: {
    mainTitle: 'Выбор калькулятора',
    heroTitle: '<strong>Kriptek</strong> - самый точный майнинг калькулятор',
    heroList: [
      '— Учитывайте <strong>рост</strong> сложности сети',
      '— Изменяйте <strong>цену продажи</strong> валюты',
      '— Настраивайте <strong>дополнительные</strong> платежи'
    ],
    base: 'Базовый',
    advanced: 'Расширенный',
    gpuAsic: 'Видеокарта/ASIC',
    addDevice: 'Добавить устройство',
    chooseDevice: 'Выбор устройства',
    yourDevice: 'Тут будет ваше оборудование',
    printGpuAsic: 'Введите ASIC или видеокарту',
    addAlgorithm: 'Добавить алгоритм',
    chooseAlgorithm: 'Выберите алгоритм',
    electricity: 'Электроэнергия',
    commissions: 'Комисии',
    generalCommission: 'Общая комиссия',
    farmCost: 'Стоимость фермы',
    frameCost: 'Стоимость каркаса',
    fullFarmCost: 'Полная стоимость фермы',
    networkComplexity: 'Сложность сети',
    chooseCrypto: 'Выбор криптовалюты',
    price: 'цена',
    for: 'за',
    priceForKw: 'Цена за kW',
    workHours: 'Часы работы',
    hours: 'часов',
    sum: 'Сумма',
    pullCommission: 'Комиссия пула',
    transactionCommission: 'Комиссия транзакции',
    transferCommission: 'Комиссия перевода',
    osSubscription: 'Подписка для ОС (месяц)',
    cryptoActualPrice: 'Действительная цена на криптовалюту',
    valueGrowthPercentage: 'Процент роста стоимости',
    initialDifficultyLevel: 'Первоначальный размер сложности',
    difficultyGrowth: 'Рост сложности',
    networkGrowthTime: 'Время роста сети',
    currentTax: 'Действующий налог',
    exchangeRate: 'Курс обмена валют',
    result: 'Результат',
    taxes: 'Налоги',
    day: 'день',
    week: 'неделя',
    month: 'месяц',
    year: 'год',
    dayU: 'День',
    weekU: 'Неделя',
    monthU: 'Месяц',
    yearU: 'Год',
    days: 'дней',
    earnings: 'Прибыль',
    farmPaybackPeriod: 'Срок укупаемости фермы',
    chosenCrypto: 'Выбранная криптовалюта',
    gain: 'Выручка',
    _24h: '24ч',
    crypto: 'крипта',
    fiat: 'фиат',
    contactUs: 'Связаться с нами',
    rights: '©Copyright 2022 ООО «Криптек», 2022. All Rights Reserved<br>Общество с ограниченной ответственностью «Криптек»',
    powerConsumption: 'Энегргопотребление',
    summaryEnergyComsumption: 'Суммарная потребляемая энергия',
    on: 'вкл',
    off: 'выкл'
  },
  en: {
    mainTitle: 'Calculator selection',
    heroTitle: '<strong>Kriptek</strong> - most accurate mining calculator',
    heroList: [
      '— Consider the <strong>growth</strong> of network complexity',
      '— Change the <strong>selling price</strong> of a currency',
      '—  Set up <strong>additional</strong> payments'
    ],
    base: 'Base',
    advanced: 'Advanced',
    gpuAsic: 'GPU/ASIC',
    addDevice: 'Add device',
    yourDevice: 'This is where your equipment will be',
    printGpuAsic: 'Print GPU or ASIC',
    addAlgorithm: 'Add algorithm',
    chooseAlgorithm: 'Choose an algorithm',
    chooseDevice: 'Choose device',
    electricity: 'Electricity',
    commissions: 'Commissions',
    generalCommission: 'General commission',
    chooseCrypto: 'Choice of cryptocurrency',
    farmCost: 'Farm cost',
    frameCost: 'Frame cost',
    fullFarmCost: 'Full cost of the farm',
    price: 'Price',
    for: 'for',
    priceForKw: 'Price for kW',
    workHours: 'Work hours',
    hours: 'hours',
    sum: 'Sum',
    pullCommission: 'Pull commission',
    transactionCommission: 'Transaction commission',
    transferCommission: 'Transfer commission',
    osSubscription: '__',
    cryptoActualPrice: 'The actual price of the cryptocurrency',
    valueGrowthPercentage: 'Value Growth Percentage',
    initialDifficultyLevel: 'Initial difficulty level',
    difficultyGrowth: 'Growth in complexity',
    networkGrowthTime: 'Network Growth Time',
    currentTax: 'Current tax',
    exchangeRate: 'Exchange rate',
    networkComplexity: 'Network complexity',
    result: 'Result',
    taxes: 'Taxes',
    day: 'day',
    week: 'week',
    month: 'month',
    year: 'year',
    dayU: 'Day',
    weekU: 'Week',
    monthU: 'Month',
    yearU: 'Year',
    days: 'days',
    earnings: 'Earnings',
    farmPaybackPeriod: 'Farm payback period',
    chosenCrypto: 'Selected cryptocurrency',
    gain: 'Proceeds',
    _24h: '24h',
    crypto: 'crypt',
    fiat: 'fiat',
    contactUs: 'Contact us',
    rights: '©Copyright 2022 Cryptotech LLC, 2022. All Rights Reserved<br>Kriptek Limited Liability Company',
    powerConsumption: 'Power Consumption',
    summaryEnergyComsumption: 'Summary Energy Comsumption',
    on: 'on',
    off: 'off'
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: document.documentElement.lang, // set locale
  messages, // set locale messages
})

export { 
  i18n
 }