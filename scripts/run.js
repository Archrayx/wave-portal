const main = async() => {

    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("Wave");
    const waveContract = await waveContractFactory.deploy({ value: hre.ethers.utils.parseEther('0.1') });
    await waveContract.deployed();


    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by: ", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    /*
     * Get Contract balance
     */

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log('contract balance:', hre.ethers.utils.formatEther(contractBalance));

    /**
     * Let's send a few waves!
     */
    let waveTxn = await waveContract.wave('my custom message!');
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomPerson).wave("Another Custom Message!");
    await waveTxn.wait();


    /*
     * Get Contract balance to see what happened!
     */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );


    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);


};



const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

};

runMain();