// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;
contract Identity {
    
/***************Structures***************/

    //identity structure
    struct identity {
        string Name;
        string Hash;
        address Owner;
        address Issuer;
        string OwnerSignature;
        string IssuerSignature;
    }

    //user structure
    struct user {
        address UserAddress;
        string PublicKey;
        bool Registered;
        uint IdCount;
        mapping(uint => identity) Ids;
    }

    //request structure
    struct verifyIdRequest {
        address Owner;
        string Hash;
        uint Status;
    }

    //issuer verification request
    struct issuerVerificationRequest {
        address Owner;
        uint Status;//0->rejected , 1->pending , 2->Accepted
        string Id;
        string Desc;
    }

    //issuer structure
    struct issuer {
        address IssuerAddress;
        string Desc;
        uint Status; //0->unverified , 1->pending , 2->Accepted
        string IssueId;
        uint ReqCount;
        mapping(uint => verifyIdRequest) Request;
    }

/***************Global Variables***************/

    address public Owner;
    issuer[] public Issuer;
    issuerVerificationRequest[] public IssuerVerificationRequest;
    mapping(address => user) public UserDetail;
    mapping(address => issuer) public IssuerDetail;

/***************Constructor***************/
    
    //constructor (Runs Only On Deployment of Contract)
    constructor() public {
        Owner = msg.sender;
    }

/***************Modifiers***************/

    //check message sent by owner
    modifier restricted() {
        require(msg.sender == Owner,"Not Authorized");
        _;
    }

    //check Account Registeration
    modifier registered(address account) {
        require(UserDetail[account].Registered == true,"This Account is not Registered");
        _;
    }
    modifier issue(address account) {
        require(IssuerDetail[account].Status == 2,"This Account does not issue any Id");
        _;
    }

/***************Functions***************/

    //Register A User Account
    function registerUser(string memory _PublicKey) public {
        require(UserDetail[msg.sender].Registered == false,"Account Already Registered");
        user memory newUser;
        newUser.UserAddress = msg.sender;
        newUser.IdCount = 0;
        newUser.PublicKey = _PublicKey;
        newUser.Registered = true;
        UserDetail[msg.sender] = newUser;
    }

    //Request An Issuer Account
    function requestIssuerAccount(string memory _Desc, string memory _IssueId) registered(msg.sender) public {
        require(IssuerDetail[msg.sender].Status == 0,
        "Either Account is already an Issuer or has a pending issuer request");

        issuer memory newIssuer;
        newIssuer.IssuerAddress = msg.sender;
        newIssuer.Status = 1;
        newIssuer.Desc = _Desc;
        newIssuer.IssueId = _IssueId;
        newIssuer.ReqCount = 0;  
        IssuerDetail[msg.sender] = newIssuer; 

        //create a verification request
        issuerVerificationRequest memory NewRequest;
        NewRequest.Owner = msg.sender;
        NewRequest.Status = 1;
        NewRequest.Id = _IssueId;
        NewRequest.Desc = _Desc;
        IssuerVerificationRequest.push(NewRequest);
    }

    //Verify an Issuer Account
    function verifyIssuerAccount(uint _RqNo) restricted public {
        require(_RqNo < IssuerVerificationRequest.length , "Request Not Found");
        address IssuerAddress = IssuerVerificationRequest[_RqNo].Owner;
        require(IssuerVerificationRequest[_RqNo].Status == 1 , "Request Already Processed");
        require(IssuerDetail[IssuerAddress].Status == 1,
        "Either Account is already an Issuer or did not wish to be an issuer currently");
        
        IssuerDetail[IssuerAddress].Status = 2;
        Issuer.push(IssuerDetail[IssuerAddress]);
        IssuerVerificationRequest[_RqNo].Status = 2;
    }

    //Reject an issuer account
    function rejectIssuerAccount(uint _RqNo) restricted public {
        require(_RqNo < IssuerVerificationRequest.length , "Request Not Found");
        address IssuerAddress = IssuerVerificationRequest[_RqNo].Owner;
        require(IssuerVerificationRequest[_RqNo].Status == 1 , "Request Already Processed");
        require(IssuerDetail[IssuerAddress].Status == 1,
        "Either Account is already an Issuer or did not wish to be an issuer currently");
        
        IssuerDetail[IssuerAddress].Status = 0;
        IssuerVerificationRequest[_RqNo].Status = 0;
    }

    //Add A New Identity
    function newId(string memory _Hash, address _Issuer,string memory _Sign, string memory _IssuerHash) 
    registered(msg.sender) issue(_Issuer) public{
        identity memory NewId;
        NewId.Name = IssuerDetail[_Issuer].IssueId;
        NewId.Hash = _Hash;
        NewId.Owner = msg.sender;
        NewId.Issuer = _Issuer;
        NewId.OwnerSignature = _Sign;
        NewId.IssuerSignature = "Pending";
        UserDetail[msg.sender].Ids[UserDetail[msg.sender].IdCount++] = NewId;

        //create a verification request
        verifyIdRequest memory NewRequest;
        NewRequest.Owner = msg.sender;
        NewRequest.Hash = _IssuerHash;
        NewRequest.Status = 1;
        IssuerDetail[_Issuer].Request[IssuerDetail[_Issuer].ReqCount++] = NewRequest;
    }

    //Delete An Identity
    function deleteId(uint _IdNum) registered(msg.sender) public {
        require(_IdNum < UserDetail[msg.sender].IdCount  , "Id does not Exist");

        for(uint i = _IdNum; i<UserDetail[msg.sender].IdCount-1 ; i++)
        UserDetail[msg.sender].Ids[i] = UserDetail[msg.sender].Ids[i+1];

        delete UserDetail[msg.sender].Ids[UserDetail[msg.sender].IdCount-1];
        UserDetail[msg.sender].IdCount--;
    }

    //Accept An Identity Verification Request
    function AcceptIdRequest(uint _ReqNo , string memory _Sign) 
    public registered(msg.sender) issue(msg.sender){
        require(_ReqNo < IssuerDetail[msg.sender].ReqCount, "Request Not Found");
        require(IssuerDetail[msg.sender].Request[_ReqNo].Status == 1 , 
        "Request Already Accepted or Rejected");

        bool flag = false;
        address User = IssuerDetail[msg.sender].Request[_ReqNo].Owner;

        for(uint i=0 ; i< UserDetail[User].IdCount ; i++){
            if(keccak256(bytes(UserDetail[User].Ids[i].Name)) == keccak256(bytes(IssuerDetail[msg.sender].IssueId)) && 
                keccak256(bytes(UserDetail[User].Ids[i].IssuerSignature)) == keccak256(bytes("Pending"))){
                UserDetail[User].Ids[i].IssuerSignature = _Sign;
                flag = true;
                break;
            }
        }
        if(flag == false)
        revert("User Identity Not Found");

        IssuerDetail[msg.sender].Request[_ReqNo].Status = 2;
    }

    //Reject An Identity Verification Request
    function RejectIdRequest(uint _ReqNo) public registered(msg.sender) issue(msg.sender){
        require(_ReqNo < IssuerDetail[msg.sender].ReqCount, "Request Not Found");
        require(IssuerDetail[msg.sender].Request[_ReqNo].Status == 1 , "Request Already Accepted or Rejected");

        IssuerDetail[msg.sender].Request[_ReqNo].Status = 0;

        bool flag = false;
        address User = IssuerDetail[msg.sender].Request[_ReqNo].Owner;

        for(uint i=0 ; i< UserDetail[User].IdCount ; i++){
            if(keccak256(bytes(UserDetail[User].Ids[i].Name)) == keccak256(bytes(IssuerDetail[msg.sender].IssueId)) &&
                keccak256(bytes(UserDetail[User].Ids[i].IssuerSignature)) == keccak256(bytes("Pending"))){
                UserDetail[User].Ids[i].IssuerSignature = "Rejected";
                flag = true;
                break;
            }
        }
    }

    function totalId() public view returns (uint){
        return UserDetail[msg.sender].IdCount;
    }

    function getId(uint _IdNo, address account) public view returns (identity memory){
        require(_IdNo < UserDetail[account].IdCount, "Id does not exist");
        return UserDetail[account].Ids[_IdNo];
    }

    function totalIssuer() public view returns (uint){
        return Issuer.length;
    }

    function totalRequest() public view returns (uint){
        return IssuerDetail[msg.sender].ReqCount;
    }

    function getRequest(uint _RqNo) issue(msg.sender) public view returns (verifyIdRequest memory){
        require(_RqNo < IssuerDetail[msg.sender].ReqCount, "Request does not exist");
        return IssuerDetail[msg.sender].Request[_RqNo];
    }

    function issuerVerificationRequestCount() public view returns (uint){
        return IssuerVerificationRequest.length;
    }
}
