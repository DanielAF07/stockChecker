const { default: axios } = require('axios');
const { chromium } = require('playwright')
const cron = require('node-cron')

const stores = {
  bestbuy: {
    name: 'Best Buy',
    hasStock: async (browser) => {
      const page = await browser.newPage()
      await page.goto('https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149&intl=nosplash')
      try {
        const content = await page.textContent('.fulfillment-fulfillment-summary')
        if (content.toLowerCase().includes('sold out')) return false
        return true
      } catch (err) {
        return true
      }
    }
  },
  walmart: {
    name: 'Walmart',
    hasStock: async (browser) => {
      const page = await browser.newPage()
      await page.goto('https://www.walmart.com/ip/Sony-PlayStation-5-Video-Game-Console/165545420?country=US')
      try {
        const content = await page.textContent('span[itemprop="price"]')
        const price = content.slice(1, content.indexOf('.'))
        const hasStock = parseInt(price) <= 500
        if (hasStock) return true
        return false
      } catch (error) {
        return true
      }
    }
  }
}

const checkStock = async () => {
  const browser = await chromium.launch({ headless: false })
  for (const store in stores) {
    console.log(`Checking ${store}`);
    if (await stores[store].hasStock(browser)) {
      const body = {
        content: `🔥 ${stores[store].name} has stock! 🔥 @everyone`,
        embeds: null
      }
      await axios.post('https://discord.com/api/webhooks/934279546994299011/H2wq2Rl_T9P9DoKrba1n7f3rkKZif3tqcz2FTCt0jhuQiwNfiREdASCsH8xbwrfecMNv', body)
    }
  }
  await browser.close()
}

cron.schedule('* * * * *', () => {
  checkStock()
})
