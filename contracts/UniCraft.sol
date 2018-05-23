pragma solidity ^0.4.18;
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract UniCraft is Ownable{
    struct Certificate
    {
        bytes name;
        address addr;
        bytes ssn;
        bytes32[] productIds;
    }
    // mapping artisanID -> artisan
    mapping (bytes32 => Certificate) public artisans;
    struct Product
    {
        bytes32 artisanId;
        bytes coopProvince;
        uint256 dateMade;
        bytes fiber;
        uint256 soldDate;
        bytes compellingStoryUri;
        bytes userStory;
        address owner;
    }
    mapping (bytes32 => Product) public products;
    
    event IssuerCertificate(bytes32 _id, bytes _name, address _addr, bytes _ssn);
    event CreateProduct(bytes32 _id, bytes32 _artisanId, uint256 _dateMade, bytes _coopProvince, bytes _fiber, bytes _cStory);
    event BuyProduct(bytes32 _id, address buyer, uint256 _soldDate);
    event UserStoryAdded(bytes UserStory);
    /*
    * @dev issue certificate for the artisan, this function throw EXCEPTION when artisanId is exist
    * @param artisanId, artisan name, artisan ethereum address, artisan ssn
    * @retun true if success in issue certificate for the artisan otherwise return false
     */
    function issuerCertificate(bytes32 _id, bytes _name, address _addr, bytes _ssn)
    public
    onlyOwner
    returns (bool)
    {
        require(artisans[_id].addr == address(0x0));
        Certificate memory certificate = Certificate("",address(0x0),"",new bytes32[](0));
        certificate.name = _name;
        certificate.addr = _addr;
        certificate.ssn = _ssn;
        artisans[_id] = certificate;
        emit IssuerCertificate(_id, _name, _addr, _ssn);
        return true;
    }
    /*
    * @dev list the product in Blockchain before listing on Ecomerce platform 
    * @param product Id, artisan Id (the maker of product), compelling story attached to that product
    * @retun true if success in listing product otherwise return false
     */
    function listProduct(bytes32 _id, bytes32 _artisanId, bytes _coopProvince, bytes _fiber, bytes _cStory)
    public
    onlyOwner
    returns (bool)
    {
        require(artisans[_artisanId].addr != address(0x0));
        require(products[_id].dateMade == 0);
        Product memory product;
        product.artisanId = _artisanId;
        product.dateMade = now;
        product.coopProvince = _coopProvince;
        product.fiber = _fiber;
        product.compellingStoryUri = _cStory;
        //product.status = 0;
        products[_id] = product;
        artisans[_artisanId].productIds.push(_id);
        emit CreateProduct(_id, _artisanId, now, _coopProvince, _fiber, _cStory);
        return true;
    }
    /*
    * @dev add story and owner of product when someone invoke buying feature,
    allow user to add their own story to the product as a gift or memory
    * @param product Id, userStory in bytes
    * @retun true if success in buying and otherwise false
     */
    function buyProduct(bytes32 _id, bytes _userStory)
    public
    returns (bool)
    {
        require(products[_id].owner == address(0x0));
        require(products[_id].artisanId != 0);
        products[_id].owner = msg.sender;
        products[_id].soldDate = now;
        products[_id].userStory = _userStory;
        emit BuyProduct(_id, msg.sender, now);
        emit UserStoryAdded(_userStory);
        return true;
    }
    /*
    * @dev count the total product an artisan have made
    * @param artisan ID
    * @retun number of total product
    */
    function getProductCount(bytes32 _artisanId)
    public
    view
    returns (uint256)
    {
        return artisans[_artisanId].productIds.length;
    }
    /*
    * @dev list all products Id an artisan have made
    * @param artisan ID
    * @retun the list of product ids
    */
    function getProductList(bytes32 _artisanId)
    public
    view
    returns (bytes32[])
    {
        return artisans[_artisanId].productIds;
    }
}