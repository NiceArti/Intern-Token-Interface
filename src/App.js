import React, { Component } from "react";
import InternToken from "./contracts/InternToken.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = 
  { 
    storageValue: 0, 
    web3: null, 
    accounts: null, 
    contract: null,
    balanceOfMsgSender: 0,
    anotherAccount: null,
    amount: 0,
  };

  componentDidMount = async () => {
    try {
      this.to = this.to.bind(this);
      this.amount = this.amount.bind(this);
      this.transfer = this.transfer.bind(this);
      this.burn = this.burn.bind(this);
      this.mint = this.mint.bind(this);
      this.addToWhitelist = this.addToWhitelist.bind(this);


      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = InternToken.networks[networkId];
      const instance = new web3.eth.Contract(
        InternToken.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const balanceOfMsgSender = await instance.methods.balanceOf(accounts[0]).call();
      const balanceOfSasha = await instance.methods.balanceOf("0xb0eDDC579AF621657dC0A7CE3016FA02a35B616A").call();
      const balanceOfVova = await instance.methods.balanceOf("0xc1fADc7346e3f3D36c29cdb88725679416bd603a").call();
      const balanceOfErke = await instance.methods.balanceOf("0x2787DeB7Cb801858CfD3AE8532C15EAa9b6925F2").call();
      const balanceOfIgor = await instance.methods.balanceOf("0xdB44F63e0Ae6F2166c2f990a4dC877D4bDDCa500").call();
      const balanceOfNicolai = await instance.methods.balanceOf("0x468172566756063Cc52ab6C020aE9c9583D9AB95").call();
      const balanceOfSlava = await instance.methods.balanceOf("0x48c5e730125565435e9E9D70CbD680bb7819bbCD").call();
      const balanceOfEgor = await instance.methods.balanceOf("0x0B89aafa6328dbA176Ea91eA04859241991c386A").call();
      const balanceOfVadim = await instance.methods.balanceOf("0x27bE67f7EEd685E4eBe96e0B0DE08A9f30b8b8D2").call();
      const balanceOfNikita = await instance.methods.balanceOf("0xcfcb8fee75E86865718f608B3BCcB582B4D7C560").call();

      const tokenAddress = deployedNetwork.address;

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
      { 
        web3, 
        accounts, 
        contract: instance,
        balanceOfMsgSender,
        balanceOfSasha,
        balanceOfVova,
        balanceOfErke,
        balanceOfIgor,
        balanceOfNicolai,
        balanceOfSlava,
        balanceOfEgor,
        balanceOfVadim,
        balanceOfNikita,
        tokenAddress
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  enableMint()
  {
    var mint = document.getElementById("mint");
    var mintVal = document.getElementById("mintVal");

    if(mintVal.value.length !== 0)
      mint.disabled = false;
    else
      mint.disabled = true;
  }


  enableBurn()
  {
    var burn = document.getElementById("burn");
    var burnVal = document.getElementById("burnVal");

    if(burnVal.value.length !== 0)
        burn.disabled = false;
    else 
        burn.disabled = true;
  }

  enableTransfer()
  {
    var transfer = document.getElementById("transfer");
    var transferVal = document.getElementById("transferVal");

    if(transferVal.value.length !== 0)
      transfer.disabled = false;
    else 
      transfer.disabled = true;
  }

  enableWl()
  {
    var addToWhitelist = document.getElementById("addToWhitelist");
    var wlVal = document.getElementById("wlVal");

    if(wlVal.value.length !== 0)
      addToWhitelist.disabled = false;
    else 
      addToWhitelist.disabled = true;
  }

  async transfer(e)
  {
    e.preventDefault();
    const {anotherAccount, amount, contract, accounts} = this.state;
    await contract.methods.transfer(anotherAccount, amount).send({from: accounts[0]});
  }

  async burn(e)
  {
    e.preventDefault();
    const {anotherAccount, amount, contract, accounts} = this.state;
    await contract.methods.burn(anotherAccount, amount).send({from: accounts[0]});
  }

  async mint(e)
  {
    e.preventDefault();
    const {anotherAccount, amount, contract, accounts} = this.state;
    await contract.methods.mint(anotherAccount, amount).send({from: accounts[0]});
  }
  
  //!=
  async addToWhitelist(e)
  {
    e.preventDefault();
    const {anotherAccount, contract, accounts} = this.state;
    await contract.methods.addToWhitelist(anotherAccount).send({from: accounts[0]});
  }


  to(e)
  {
    this.setState({anotherAccount: e.target.value})
  }

  amount(e)
  {
    this.setState({amount: e.target.value})
  }


  render() {
    if (!this.state.web3) {
      return (
        <div id="switch">
          Switch network to Ropsten!!!
        </div>
      );
    }
    return (
      <div className="App">
        <div id="header">
          <span id="balance" >Balance: {this.state.balanceOfMsgSender} INT</span>
          <span id="account" ><span class="account-type">Account: </span>{this.state.accounts}</span>
        </div>

        <div id="content">
          <form name="TransferForm" onSubmit={this.transfer}>
            <input type="submit" id="transfer" disabled="true" value="Transfer"/>
            <input type="text" placeholder="0x38HG4NO..." id="address" onChange={this.to}/>
            <input type="text" placeholder="10" id="transferVal" class="amount" onChange={this.amount} onKeyUp={this.enableTransfer}/>
          </form>
          
          <form name="MintForm" onSubmit={this.mint}>
            <input type="submit" id="mint" disabled="true" value="Mint"/>
            <input type="text" placeholder="0x38HG4NO..." id="address" onChange={this.to}/>
            <input type="text" placeholder="10" id="mintVal" class="amount" onKeyUp={this.enableMint} onChange={this.amount}/>
          </form>

          <form name="BurnForm" onSubmit={this.burn}>
            <input type="submit" id="burn" disabled="true" value="Burn"/>
            <input type="text" placeholder="0x38HG4NO..." id="address" onChange={this.to}/>
            <input type="text" placeholder="10" id="burnVal" class="amount" onChange={this.amount} onKeyUp={this.enableBurn}/>
          </form>

          <form name="WhiteListForm" onSubmit={this.addToWhitelist}>
            <input type="submit" id="addToWhitelist" disabled="true" value="Add in whitelist"/>
            <input type="text" placeholder="0x38HG4NO..." id="wlVal" onChange={this.to} onKeyUp={this.enableWl}/>
          </form>
        </div>

        <div id="content-inner">
          <table>
            <thead>
              <tr>
                <th>Telegram</th>
                <th>Name</th>
                <th>Address</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody> 
              <tr>
                <th>@flexxxbob</th>
                <th>Alexander</th>
                <th>0xb0eDDC579AF621657dC0A7CE3016FA02a35B616A</th>
                <th>{this.state.balanceOfSasha} INT</th>
              </tr>
              <tr>
                <th>@Valdemar1337</th>
                <th>Vladimir</th>
                <th>0xc1fADc7346e3f3D36c29cdb88725679416bd603a</th>
                <th>{this.state.balanceOfVova} INT</th>
              </tr>
              <tr>
                <th>@Nektarines</th>
                <th>Nichita</th>
                <th>0xcfcb8fee75E86865718f608B3BCcB582B4D7C560</th>
                <th>{this.state.balanceOfNikita} INT</th>
              </tr>
              <tr>
                <th>@zhaukenove</th>
                <th>Yerkebulan</th>
                <th>0x2787DeB7Cb801858CfD3AE8532C15EAa9b6925F2</th>
                <th>{this.state.balanceOfErke} INT</th>
              </tr>
              <tr>
                <th>@Igorterzi</th>
                <th>Igor</th>
                <th>0xdB44F63e0Ae6F2166c2f990a4dC877D4bDDCa500</th>
                <th>{this.state.balanceOfIgor} INT</th>
              </tr>
              <tr>
                <th>@vadim_peev</th>
                <th>Vadim</th>
                <th>0x27bE67f7EEd685E4eBe96e0B0DE08A9f30b8b8D2</th>
                <th>{this.state.balanceOfVadim} INT</th>
              </tr>
              <tr>
                <th>@sweetbubalehj</th>
                <th>Egor</th>
                <th>0x0B89aafa6328dbA176Ea91eA04859241991c386A</th>
                <th>{this.state.balanceOfEgor} INT</th>
              </tr>
              <tr>
                <th>@Kcintes</th>
                <th>Nicolai</th>
                <th>0x468172566756063Cc52ab6C020aE9c9583D9AB95</th>
                <th>{this.state.balanceOfNicolai} INT</th>
              </tr>
              <tr>
                <th>@s_tomayli</th>
                <th>Slava</th>
                <th>0x48c5e730125565435e9E9D70CbD680bb7819bbCD</th>
                <th>{this.state.balanceOfSlava} INT</th>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="token">
          <span class="account-type">Token: </span>{this.state.tokenAddress}
        </div>

      </div>

      
    );
  }
}

export default App;
