module.exports.uniCraftABI = [{
        "constant": true,
        "inputs": [{
            "name": "_artisanId",
            "type": "bytes32"
        }],
        "name": "getProductList",
        "outputs": [{
            "name": "",
            "type": "bytes32[]"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "_artisanId",
            "type": "bytes32"
        }],
        "name": "getProductCount",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_id",
                "type": "bytes32"
            },
            {
                "name": "_artisanId",
                "type": "bytes32"
            },
            {
                "name": "_dateMade",
                "type": "bytes"
            },
            {
                "name": "_coopProvince",
                "type": "bytes"
            },
            {
                "name": "_fiber",
                "type": "bytes"
            },
            {
                "name": "_cStory",
                "type": "bytes"
            }
        ],
        "name": "listProduct",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "bytes32"
        }],
        "name": "artisans",
        "outputs": [{
                "name": "name",
                "type": "bytes"
            },
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "ssn",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "bytes32"
        }],
        "name": "products",
        "outputs": [{
                "name": "artisanId",
                "type": "bytes32"
            },
            {
                "name": "coopProvince",
                "type": "bytes"
            },
            {
                "name": "dateMade",
                "type": "bytes"
            },
            {
                "name": "fiber",
                "type": "bytes"
            },
            {
                "name": "compellingStoryUri",
                "type": "bytes"
            },
            {
                "name": "userStory",
                "type": "bytes"
            },
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "name": "",
            "type": "address"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_id",
                "type": "bytes32"
            },
            {
                "name": "_userStory",
                "type": "bytes"
            }
        ],
        "name": "buyProduct",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
                "name": "_id",
                "type": "bytes32"
            },
            {
                "name": "_name",
                "type": "bytes"
            },
            {
                "name": "_addr",
                "type": "address"
            },
            {
                "name": "_ssn",
                "type": "bytes"
            }
        ],
        "name": "issuerCertificate",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "newOwner",
            "type": "address"
        }],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "name": "_id",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "_name",
                "type": "bytes"
            },
            {
                "indexed": false,
                "name": "_addr",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_ssn",
                "type": "bytes"
            }
        ],
        "name": "IssuerCertificate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "name": "_id",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "_artisanId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "_dateMade",
                "type": "bytes"
            },
            {
                "indexed": false,
                "name": "_coopProvince",
                "type": "bytes"
            },
            {
                "indexed": false,
                "name": "_fiber",
                "type": "bytes"
            },
            {
                "indexed": false,
                "name": "_cStory",
                "type": "bytes"
            }
        ],
        "name": "CreateProduct",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "name": "_id",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_soldDate",
                "type": "uint256"
            }
        ],
        "name": "BuyProduct",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "name": "UserStory",
            "type": "bytes"
        }],
        "name": "UserStoryAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    }
]