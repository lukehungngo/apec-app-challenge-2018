Web3 = require('web3')
const contract = require('./contract.js')
// const WsProvider = new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')
// var web3 = new Web3(WsProvider);
var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/TOIiNmTE9VH8TIrRHCib'));

module.exports.ascii_to_hexa = async function (str) {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n++) {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}
	return arr1.join('');
}
const privateKey = "0x88fffae7b718ab21f4d79acf7602e8281f7b0d16ca7c17b34a8609d73cb7fb44"
// Contract address
CONTRACT_ADDRESS = "0x0842977719589e80ba00a1c9d3198c0315ed97fc"
// Create Smart Contract using address (in Ethereum Blockhain) and ABI
module.exports.uniCraftContract = new web3.eth.Contract(contract.uniCraftABI, module.exports.CONTRACT_ADDRESS)

module.exports.CreateAndBroadcastTx = function (privateKey, dataRegister, callback) {
	//var resLink = 'https://rinkeby.etherscan.io/tx/'
	// Create transaction
	// Sign transaction with data, gas, receipient address, owner's privatekey
	return web3.eth.accounts.signTransaction({
			data: dataRegister,
			gas: 300000,
			to: CONTRACT_ADDRESS,
			chainId: 4
		},
		privateKey,
		function (err, res) {
			if (err) return Promise.reject(err);

			console.log(err);

			console.log(res)

			//get raw transaction
			const signedTransaction = res.rawTransaction;

			//broadcast signed transaction
			web3.eth.sendSignedTransaction(signedTransaction, (err, res) => {

				console.log(err);

				console.log(res);
				callback('https://rinkeby.etherscan.io/tx/' + res)
				return res;
			});
		}
	);
}
module.exports.CreateRawTransaction = function (dataRegister, privateKey) {
	return web3.eth.accounts.signTransaction({
			data: dataRegister,
			gas: 3000000,
			to: CONTRACT_ADDRESS
		},
		privateKey
	)
}
module.exports.CreateRawContractTransaction = function (dataRegister, privateKey) {
	if (from === null) from = sender
	return web3.eth.accounts.signTransaction({
			data: dataRegister,
			gas: 3000000,
			to: CONTRACT_ADDRESS
		},
		privateKey
	)
}
BroadcastRawTransaction = function (res) {
	const signedTransaction = res.rawTransaction;

	//broadcast signed transaction
	return web3.eth.sendSignedTransaction(signedTransaction, (err, res) => {
		if (err) console.log("Error: ", err);

		console.log("Transaction Hash: ", res);

	});
}

module.exports.issueCertificate = async function (name, ssn, picture) {
	let prvSigner = web3.utils.randomHex(32)
	let pubSigner = web3.eth.accounts.privateKeyToAccount(prvSigner).address
	console.log("Private key and Public key", prvSigner, pubSigner)
	console.log("Public key type ", typeof (pubSigner))
	let data = name + ssn + picture
	let hash = web3.utils.sha3(data)
	console.log("Hash ", typeof (hash))

	let nameHex = "0x" + await module.exports.ascii_to_hexa(name)
	let ssnHex = "0x" + await module.exports.ascii_to_hexa(ssn)

	//let hashHex = "0x" + await module.exports.ascii_to_hexa(hash)
	//let pubKeyHex = "0x" + await module.exports.ascii_to_hexa(pubSigner)

	console.log("type of hash", typeof (hashHex), hash)
	console.log("type of nameHex", typeof (nameHex), nameHex)
	console.log("type of pubKeyHex", typeof (pubKeyHex), pubSigner)
	console.log("type of ssnHex", typeof (ssnHex), ssnHex)

	const dataRegister = module.exports.uniCraftContract.methods.issuerCertificate(hash, nameHex, pubSigner, ssnHex).encodeABI();
	return {
		"dataRegister": dataRegister,
		"ArtisanId": hash
	}

	// var transactionLink
	// await module.exports.CreateAndBroadcastTx(privateKey, dataRegister, (txId) => transactionLink = txId)
	// console.log("Transaction Link: ", transactionLink)
	// return transactionLink

	// var transactionLink
	// let rawTransaction = await module.exports.CreateRawTransaction(privateKey, dataRegister)
	// console.log("Rawtx", rawTransaction)
	// let txID = await module.exports.BroadcastRawTransaction(rawTransaction)
	// console.log("TxID ", txID)
	// console.log("Transaction Link: ", transactionLink)
	// return transactionLink
}
module.exports.storeStory = async function (name, ssn, picture) {
	let prvSigner = web3.utils.randomHex(32)
	let pubSigner = web3.eth.accounts.privateKeyToAccount(prvSigner).address
	console.log("Private key and Public key", prvSigner, pubSigner)
	console.log("Public key type ", typeof (pubSigner))
	let data = name + ssn + picture
	let hash = web3.utils.sha3(data)
	console.log("Hash ", typeof (hash))

	let nameHex = "0x" + await module.exports.ascii_to_hexa(name)
	let ssnHex = "0x" + await module.exports.ascii_to_hexa(ssn)

	//let hashHex = "0x" + await module.exports.ascii_to_hexa(hash)
	//let pubKeyHex = "0x" + await module.exports.ascii_to_hexa(pubSigner)

	console.log("type of hash", typeof (hashHex), hash)
	console.log("type of nameHex", typeof (nameHex), nameHex)
	console.log("type of pubKeyHex", typeof (pubKeyHex), pubSigner)
	console.log("type of ssnHex", typeof (ssnHex), ssnHex)

	const dataRegister = module.exports.uniCraftContract.methods.issuerCertificate(hash, nameHex, pubSigner, ssnHex).encodeABI();
	return {
		"dataRegister": dataRegister,
		"ArtisanId": hash
	}

}