/**
 * Utilisation : 
 * node src/test/pupperteer.js
 */

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    slowMo: 250,
    dumpio: true, // chrome logging
  });
  const page = await browser.newPage();

  // page.setOfflineMode(true)

  // Watch the console
  page.on('console', msg => {
    console.log(msg.type, msg.text)
  })

  // await blocImage(page)

  // test('Test Bingo voiture', async() => {
  //   await page.goto('https://bingo-voiture.firebaseapp.com')
  // })

  // await page.goto('https://google.com', {waitUntil: 'load'})
  await page.goto('https://bingo-voiture.firebaseapp.com', {waitUntil: 'load'})
  // await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});

// Emulation
// await page.emulate(devices['iPhone 6'])
// await page.emulateMedia('screen')
// page.setViewport({
//   width: 600, height: 800,
//   deviceScaleFactor: 2
// })

// await page.$eval('h1', h1 => {
//   h1.click()
// })

// await page.waitForSelector('.bouton-menu', {visible: true})
// const overlay = await page.$('.bouton-menu')
// await overlay.screenshot({path: 'overlay.png'})

// Interaction
// await page.type('input[name=q]', 'Polymer')
// await page.click('input[type="submit"]')
// await page.waitForSelector('#foot')
// await page.waitForSelector('h3 a')
// const links = await page.$$eval('h3 a', anchors => {
//   return anchors.map(a => a.textContent)
// })
// console.log(links)
await page.waitFor(500)
console.log('5!')


await page.waitForSelector('bingo-app')
const bingoApp = await page.$('bingo-app') // ElementHandle

const bingoMenu = await getElement(bingoApp, 'bingo-menu')
const bouton = await getElement(bingoMenu, '.bouton-menu')
bouton.click()

await page.waitFor(1000)
const bingoCouleur = await getElement(bingoApp, 'bingo-couleurs')
// console.log('bingoCouleur', bingoCouleur)
const homeButton = await getElement(bingoApp, `paper-icon-button[icon='bingo-icons:home']`)
homeButton.click()
return
// console.log('bingoMenu', bingoMenu.toString())


// console.log('bingo-menu', bingoApp.shadowRoot.querySelector('bingo-menu'))
// await bingoApp.shadowRoot.waitForSelector('bingo-menu')
// const bingoApp = bingoApp.shadowRoot.waitForSelector('bingo-menu')
// const bouton = bingoApp.shadowRoot.querySelector('bingo-menu').shadowRoot.querySelector('.bouton-menu')
// await page.click('input[type="submit"]')


const shadowRoot = await page.evaluate(ba => {
  console.log('document.location', document.location)
  console.log('ba', ba)
  console.log('document.documentElement.clientWidthba', document.documentElement.clientWidth)
  console.log('document.documentElement.clientHeight', document.documentElement.clientHeight)
  console.log('window.devicePixelRatio', window.devicePixelRatio)

  //return ba.shadowRoot.querySelector('bingo-menu')
  return document.querySelector('bingo-app')
}, bingoApp);
console.log('shadowRoot', shadowRoot)
await bingoApp.dispose();

const shadowRoot2 = await page.$$eval('bingo-app', ba => ba);
console.log('shadowRoot2', shadowRoot2)

// const x = await page.evaluate(() => 
// document //.querySelector('bingo-app')
//   // .querySelector('bingo-menu').shadowRoot
//   // .querySelector('.bouton-menu').click()
// );
// console.log('x', x)

// const metrics = await page.getMetrics()
// console.log(metrics)

// Capture
// await page.pdf({path: 'hn.pdf', format: 'A4'});

  // await browser.close();
})()


async function getElement (element, selector) {
  // await element.waitForSelector(selector)
  const shadowRoot = await element.getProperty('shadowRoot')
  // await shadowRoot.waitForSelector(selector)
  return await shadowRoot.$(selector) // ElementHandle

}

/*


//const { puppeteer } = import from 'puppeteer' //require('puppeteer')
const puppeteer = require('puppeteer')

// puppeteer.launch().then(async browser => {
//   const page = await browser.newPage()
//   // await page.goto('https://www.google.ca/search?q=josee+courtemanche+sherbrooke&oq=josee+courtemanche+sherbrooke')
//   await page.goto('https://bingo-voiture.firebaseapp.com')
//   await page.screenshot({ path: 'screenshot.png'})
//   await browser.close()
// })

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.ca/search?q=josee+courtemanche+sherbrooke&oq=josee+courtemanche+sherbrooke')
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
*/


function blocImage(page) {
//   await page.setRequestInterceptionEnabled(true)
// page.on('request', req => {
//   if (req.resourceType === 'image') {
//     req.abort()
//   } else {
//     req.continue()
//   }
// })
}
