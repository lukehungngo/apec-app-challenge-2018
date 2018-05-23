Web3 = require('web3')
const WsProvider = new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')
var web3 = new Web3(WsProvider);

exports.ascii_to_hexa = function (str) {
	var arr1 = [];
	for (var n = 0, l = str.length; n < l; n++) {
		var hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	}
	return arr1.join('');
}

// Contract address
module.exports.CONTRACT_ADDRESS = "0x3c494f446d73324bff30badc2f9c5f21c5d798b4"
// Create Smart Contract using address (in Ethereum Blockhain) and ABI
module.exports.uniCrafeContract = new web3.eth.Contract(contract.uniCraftABI, module.exports.CONTRACT_ADDRESS)

module.exports.CreateAndBroadcastTx = function (privateKey, dataRegister, callback) {
	//var resLink = 'https://rinkeby.etherscan.io/tx/'
	// Create transaction
	// Sign transaction with data, gas, receipient address, owner's privatekey
	return web3.eth.accounts.signTransaction({
			data: dataRegister,
			gas: 300000,
			to: CONTRACT_ADDRESS
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

module.exports.issueCertificate = async function (name, ssn, picture) {
	let prvSigner = web3.utils.randomHex(32)
	let pubSigner = web3.eth.accounts.privateKeyToAccount(prvSigner).address

	let hash = web3.utils.sha3(name, ssn, picture);
	nameHex = "0x" + utils.ascii_to_hexa(name)
	ssnHex = "0x" + utils.ascii_to_hexa(ssn)
	const dataRegister = await module.exports.uniCrafeContract.methods.issuerCertificate(hash, ).encodeABI();
}