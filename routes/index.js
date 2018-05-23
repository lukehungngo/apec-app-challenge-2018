var express = require('express');
var utils = require('./utils.js')
var router = express.Router();
Web3 = require('web3')
//var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'));
var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/TOIiNmTE9VH8TIrRHCib'));
const privateKey = "0x88fffae7b718ab21f4d79acf7602e8281f7b0d16ca7c17b34a8609d73cb7fb44"


/* GET home page. */
router.get('/', function (req, res, next) {
	res.json('Nothing to response')
});
router.post('/issueCertificate', function (req, response, next) {
	let name = req.body.name.toString()
	console.log(req.body.name)
	let ssn = req.body.ssn.toString()
	console.log(req.body.ssn)
	let picture = req.body.picture.toString()

	utils.issueCertificate(name, ssn, picture).then(result => {
		dataRegister = result.dataRegister
		ArtisanId = result.ArtisanId
		utils.CreateAndBroadcastTx(privateKey, dataRegister, (txId) => response.json({
			"Link": txId,
			"ArtisanId": ArtisanId
		}))
	})

});

router.post('/listProductAndStory', async function (req, response, next) {
	let Story = req.body.Story.toString()
	let storyHex = "0x" + await utils.ascii_to_hexa(Story)
	let nonce = await web3.eth.getTransactionCount("0x5fdc5fd99b832b78b8583aa1839f72aa6c00d901") + 1
	utils.CreateAndBroadcastSelfTx(privateKey, storyHex, (txId_1) => {
		let ArtisanId = req.body.ArtisanId.toString()
		console.log(req.body.ArtisanId)
		let CoopProvince = req.body.CoopProvince.toString()
		console.log(req.body.CoopProvince)
		let Fiber = req.body.Fiber.toString()
		console.log(req.body.Fiber)
		let DateMade = req.body.DateMade.toString()
		console.log(req.body.DateMade)
		utils.listProduct(ArtisanId, DateMade, CoopProvince, Fiber, txId_1).then(result => {
			dataRegister = result.dataRegister
			ProductId = result.ProductId
			utils.CreateAndBroadcastTxWithNonce(privateKey, dataRegister, nonce, (txId_2) => response.json({
				"Link": txId_2,
				"ProductId": ProductId
			}))
		})
	})
});
router.post('/listProduct', function (req, response, next) {

	let ArtisanId = req.body.ArtisanId.toString()
	console.log(req.body.ArtisanId)
	let CoopProvince = req.body.CoopProvince.toString()
	console.log(req.body.CoopProvince)
	let Fiber = req.body.Fiber.toString()
	console.log(req.body.Fiber)
	let Story = req.body.Story.toString()
	console.log(req.body.Story)
	let DateMade = req.body.DateMade.toString()
	console.log(req.body.DateMade)
	utils.listProduct(ArtisanId, DateMade, CoopProvince, Fiber, Story).then(result => {
		dataRegister = result.dataRegister
		ProductId = result.ProductId
		utils.CreateAndBroadcastTx(privateKey, dataRegister, (txId) => response.json({
			"Link": txId,
			"ProductId": ProductId
		}))
	})

});
router.post('/listProduct', function (req, response, next) {

	let ArtisanId = req.body.ArtisanId.toString()
	console.log(req.body.ArtisanId)
	let CoopProvince = req.body.CoopProvince.toString()
	console.log(req.body.CoopProvince)
	let Fiber = req.body.Fiber.toString()
	console.log(req.body.Fiber)
	let Story = req.body.Story.toString()
	console.log(req.body.Story)
	let DateMade = req.body.DateMade.toString()
	console.log(req.body.DateMade)
	utils.listProduct(ArtisanId, DateMade, CoopProvince, Fiber, Story).then(result => {
		dataRegister = result.dataRegister
		ProductId = result.ProductId
		utils.CreateAndBroadcastTx(privateKey, dataRegister, (txId) => response.json({
			"Link": txId,
			"ProductId": ProductId
		}))
	})

});
module.exports = router;