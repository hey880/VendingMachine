const VendingMachine = artifacts.require("VendingMachine");
// accounts는 현재 네트워크의 모든 accounts를 추출하는 역할
contract("VendingMachine", (accounts) => {
    //deploy 전에 test 코드가 실행되도록 설정
    before(async () => {
        //contract의 instance에 대한 변수명 지정 (여기서는 instance라고 지정)
        //이 instance는 contract를 참조하는 VendingMachine
        //이렇게 코드를 짜서 실행하면 인메모리에서 가상 블록체인에 contract를 deploy 한다.
        instance = await VendingMachine.deployed();
    })

    //아래는 Mocha와 같은 test 코드. truffle test 명령어로 실행.
    it('ensures that the starting balance of the vending machine is 100', async () => {
        // instance는 contract를 참조하여 instance 변수에서 contract의 메서드를 사용할 수 있다.
        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 100, "The initial balance should be 100 donuts.")
    })
   
    it('ensures the balance of the vending machine can be updated', async () => {
        await instance.restock(100);
        let balance =  await instance.getVendingMachineBalance();
        assert.equal(balance, 200, "The balance should be 200 donuts after restocking.")
    })

    it('allows donuts to be purchased', async () => {
        //purchase 메서드에는 argument가 하나만 있음. 아래의 두번째 argument는
        //truffle에서 제공해주는 기능. accounts[0]은 contract owner를 의미
        //truffle은 web3 global object도 제공
        //transaction은 way를 지정해야 되기 때문에 ether를 way로 변환해야함
        await instance.purchase(1, {from: accounts[0], value: web3.utils.toWei('3', 'ether')});

        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 199, "The balance should be 199 donuts after sale.");
    })
})