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
    week2: 'недель',
    week2U: 'Недель',
    month: 'месяц',
    month2: 'Месяцев',
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
    rights: '© ООО «Криптек», 2022. Все права защищены',
    footerTop: 'Общество с ограниченной ответственностью «Криптек»',
    powerConsumption: 'Энегргопотребление',
    summaryEnergyComsumption: 'Суммарная потребляемая энергия',
    minerstat: 'Некоторые данные получены с <a style="display: inline" href="https://minerstat.com" target="_blank" >minerstat.com</a>',
    on: 'вкл',
    off: 'выкл',
    generalCommissionTooltip: 'Укажите, сколько процентов в /$currency/ от выручки Вы собираетсь тратить на расходы помимо электроэнергии.',
    transactionCommissionTooltip: 'Плата за перевод валюты с одного кошелька на другой или вывод средств на карту банка.',
    networkComplexityTooltip: 'Нагрузка сети, от которой напрямую зависит Ваша доходность. Чем выше сложность сети, тем ниже будет ожидаемая выручка.',
    transferCommissionTooltip: 'Плата за обмен крипты на обычные деньги (фиат).',
    subscriptionCommissionTooltip: 'Некоторые операционные системы (ОС) для майнинг-ферм взимают плату за использование. Если Вы не платите за них или не пользуетесь ОС, оставьте поле без изменений.',
    networkComplexityGrowthPercentageTooltip: 'Средний процент роста сложности сети за /$unit/. Вы можете указать своё значение.',
    networkComplexityGrowthTimeTooltip: 'Количество /$unit/ в течение которых ожидается указанный рост',
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
    osSubscription: 'Subscription for OS (monthly)',
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
    week2: 'week',
    week2U: 'Week',
    month: 'month',
    month2: 'month',
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
    crypto: 'crypto',
    fiat: 'fiat',
    contactUs: 'Contact us',
    rights: '© Kriptek LLC, 2022. All Rights Reserved',
    footerTop: 'Limited Liability Company «Kriptek»',
    powerConsumption: 'Power Consumption',
    summaryEnergyComsumption: 'Summary Energy Comsumption',
    minerstat: 'Certain data retrieved from <a style="display: inline" href="https://minerstat.com" target="_blank" >minerstat.com</a>',
    on: 'on',
    off: 'off',
    generalCommissionTooltip: 'Specify how much /$currency/ of the revenue you are going to spend on expenses other than electricity.',
    transactionCommissionTooltip: 'Fee for transferring currency from one wallet to another or withdrawing funds to a bank card.',
    networkComplexityTooltip: 'Network load, which directly affects your profitability. The higher the complexity of the network, the lower the expected revenue will be.',
    transferCommissionTooltip: 'Fee for exchanging crypto for regular money (fiat).',
    subscriptionCommissionTooltip: 'Some operating systems (OS) for mining farms charge a usage fee. If you do not pay for them or do not use the OS, leave the field unchanged.',
    networkComplexityGrowthPercentageTooltip: 'Average percentage increase in network complexity per /$unit/. You can specify your own value.',
    networkComplexityGrowthTimeTooltip: 'Count in /$unit/ during which the specified growth is expected.',
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