const main = async() => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log('Deploying contracts with account: ', deployer.address);
    console.log("Account Balance: ", accountBalance.toString());

    const Token = await hre.ethers.getContractFactory('Wave');
    const portal = await Token.deploy({ value: hre.ethers.utils.parseEther('0.001') });
    await portal.deployed();

    console.log("wavePortal address: ", portal.address);
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