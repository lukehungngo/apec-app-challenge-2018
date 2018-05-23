var express = require('express');
var utils = require('./utils.js')
var router = express.Router();
Web3 = require('web3')
//var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/jEuv2hLiFC9ILI7MvArl'));
var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/TOIiNmTE9VH8TIrRHCib'));
const privateKey = "88fffae7b718ab21f4d79acf7602e8281f7b0d16ca7c17b34a8609d73cb7fb44"


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

	utils.issueCertificate(name,ssn,picture)


	const dataRegister = utils.cvssledgerContract.methods.registerIssuer(issuerPubkey, issuerName).encodeABI();

	utils.CreateAndBroadcastTx(privateKey, dataRegister,(txID)=> response.json(txID))
});

router.post('/registerUser', function (req, response, next) {
	let userHash = req.body.userHash.toString()
	console.log(req.body.userHash)
	let userName = req.body.userName.toString()
	console.log(req.body.userName)

	userHash = "0x" + utils.ascii_to_hexa(userHash)
	userName = "0x" + utils.ascii_to_hexa(userName)
	console.log(userHash + ' ' + typeof (userHash))
	console.log(userName + ' ' + typeof (userName))

	const dataRegister = utils.cvssledgerContract.methods.registerUser(userHash, userName).encodeABI();

	utils.CreateAndBroadcastTx(privateKey, dataRegister,(txID)=> response.json(txID))
});
//function addCertificate(bytes16 userHash, bytes16 issuerPubkey, bytes16 issuerSignature, bytes16 certHash) public onlyOwner {
router.post('/addCertificate', function (req, response, next) {
	let userHash = req.body.userHash.toString()
	console.log(req.body.userHash)
	let issuerPubkey = req.body.issuerPubkey.toString()
	console.log(req.body.issuerPubkey)
	let issuerSignature = req.body.issuerSignature.toString()
	console.log(req.body.issuerSignature)
	let certHash = req.body.certHash.toString()
	console.log(req.body.certHash)

	userHash = "0x" + utils.ascii_to_hexa(userHash)
	issuerPubkey = "0x" + utils.ascii_to_hexa(issuerPubkey)
	issuerSignature = "0x" + utils.ascii_to_hexa(issuerSignature)
	certHash = "0x" + utils.ascii_to_hexa(certHash)

	console.log(userHash + ' ' + typeof (userHash))
	console.log(issuerPubkey + ' ' + typeof (issuerPubkey))
	console.log(issuerSignature + ' ' + typeof (issuerSignature))
	console.log(certHash + ' ' + typeof (certHash))

	const dataRegister = utils.cvssledgerContract.methods.addCertificate(userHash, issuerPubkey, issuerSignature, certHash).encodeABI();
	utils.CreateAndBroadcastTx(privateKey, dataRegister,(txID)=> response.json(txID))
	//response.json(utils.CreateAndBroadcastTx(privateKey, dataRegister))
});
router.post('/test', function (req, response, next) {
})
module.exports = router;
