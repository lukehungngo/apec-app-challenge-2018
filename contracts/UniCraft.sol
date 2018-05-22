pragma solidity ^0.4.18;
import 'zeppelin-solidity/contracts/ownership/ownable.sol';

contract UniCraft is Ownable{
    struct Certificate{
        bytes name;
        address addr;
        bytes ssn;
        bytes32[] productIds;
    }
    // mapping artisanID -> artisan
    mapping (bytes32 => Certificate) public artisans;
    struct Product{
        bytes32 artisanId;
        uint256 producedDate;
        uint256 soldDate;
        bytes compellingStoryUri;
        bytes userStory;
        address owner;
        //uint8 status;
        //0: Available, 1: Unverified, 2: Verified
    }
    //mapping productID -> product
    mapping (bytes32 => Product) public products;
    
    event IssuerCertificate(bytes32 _id, bytes _name, address _addr, bytes _ssn);
    event CreateProduct(bytes32 _id, bytes32 _artisanId, uint256 _producedDate, bytes _cStory);
    event BuyProduct(bytes32 _id, address buyer, uint256 _soldDate, bytes _uStory);
    // event AddUserStory(bytes32 _id, bytes _userStory);
    // event ConfirmProduct(bytes32 _id, bool _result);
    function issuerCertificate(bytes32 _id, bytes _name, address _addr, bytes _ssn)
    public
    onlyOwner
    returns (bool)
    {
        Certificate memory certificate = Certificate("",address(0x0),"",new bytes32[](0));
        certificate.name = _name;
        certificate.addr = _addr;
        certificate.ssn = _ssn;
        artisans[_id] = certificate;
        emit IssuerCertificate(_id, _name, _addr, _ssn);
        return true;
    }
    
    function createProduct(bytes32 _id, bytes32 _artisanId, bytes _cStory)
    public
    onlyOwner
    returns (bool)
    {
        require(artisans[_artisanId].addr != address(0x0));
        require(products[_id].producedDate != 0);
        Product memory product;
        product.artisanId = _artisanId;
        product.producedDate = now;
        product.compellingStoryUri = _cStory;
        //product.status = 0;
        products[_id] = product;
        artisans[_artisanId].productIds.push(_id);
        emit CreateProduct(_id, _artisanId, now, _cStory);
        return true;
    }
    function buyProduct(bytes32 _id, bytes _userStory)
    public
    returns (bool)
    {
        require(products[_id].owner == address(0x0));
        //products[_id].status == 1
        products[_id].owner = msg.sender;
        products[_id].soldDate = now;
        products[_id].userStory = _userStory;
        emit BuyProduct(_id, msg.sender, now, _userStory);
        return true;
    }
    // function addUserStory(bytes32 _id, bytes _userStory)
    // public
    // returns (bool)
    // {
    //     require(products[_id].owner == msg.sender);
    //     require(products[_id].status == 1);
    //     products[_id].userStory = _userStory;
    //     emit AddUserStory(_id, _userStory);
    //     return true;
    // }
    // function confirmProduct(bytes32 _id)
    // public
    // returns (bool)
    // {
    //     require(products[_id].owner == msg.sender);
    //     require(products[_id].status == 1);
    //     products[_id].status = 2;
    //     emit ConfirmProduct(_id, true);
    //     return true;
    // }
}