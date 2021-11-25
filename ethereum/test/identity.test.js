const Identity = artifacts.require('Identity');


contract(Identity,async(accounts)=>{

    beforeEach(async()=>{
        //Loading all contracts
        identity = await Identity.new();
     })

    describe('Identity Contract',async()=>{
        it('deploy a contract',async()=>{
            assert.ok(identity.address);
        });
        it('Get Owner',async()=>{
            const Owner = await identity.Owner({from : accounts[0]});
            assert.equal(accounts[0],Owner);
        });
        //Can't access the map declared inside of a struct
        it('Regiser 1st User',async()=>{
            await identity.registerUser({from : accounts[0]});
            const userData = await identity.UserDetail(accounts[0]);
            assert.equal(accounts[0],userData.UserAddress);
        });
        it('Regiser 2nd User',async()=>{
            await identity.registerUser({from : accounts[1]});
            const userData = await identity.UserDetail(accounts[1]);
            assert.equal(accounts[1],userData.UserAddress);
        });
        it('Register 1 Issuer',async()=>{

            await identity.registerUser({from : accounts[0]});
            await identity.registerUser({from : accounts[1]});
            await identity.requestIssuerAccount("I wanna issue" , "National Id",{from : accounts[1]});
            await identity.verifyIssuerAccount(accounts[1],{from : accounts[0]});
            const issuerData = await identity.IssuerDetail(accounts[1]);
            assert.equal(issuerData.Status , 2);

        });
        it('Add 1 id',async()=>{
            await identity.registerUser({from : accounts[0]});
            await identity.registerUser({from : accounts[1]});
            await identity.requestIssuerAccount("I wanna issue" , "National Id",{from : accounts[1]});
            await identity.verifyIssuerAccount(accounts[1],{from : accounts[0]});
            await identity.newId("_Hash",accounts[1],"_Sign", "_IssuerHash",{from : accounts[0]});
            const Id = await identity.getId(0,accounts[0]);
            assert.equal("National Id",Id.Name);
        });
        
    });
})