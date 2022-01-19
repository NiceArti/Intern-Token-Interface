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

  CopyToClipboard()
  {
    /* Get the text field */
    var tableCell = document.getElementById('addrToCopy');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
     /* Alert the copied text */
    var copy = document.getElementById('switch-2');
    copy.style.display = "block";
    const timer = setTimeout(() => 
    {
      copy.style.display = "none";
    }, 700);
  }

  CopyToClipboardToken()
  {
    /* Get the text field */
    var tableCell = document.getElementById('addrToCopyToken');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
     /* Alert the copied text */
    var copy = document.getElementById('switch-2');
    copy.style.display = "block";
    const timer = setTimeout(() => 
    {
      copy.style.display = "none";
    }, 700);
  }

  CopyToClipboard1()
  {
    /* Get the text field */
    var tableCell = document.getElementById('1');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
     /* Alert the copied text */
    var copy = document.getElementById('switch-2');
    copy.style.display = "block";
    const timer = setTimeout(() => 
    {
      copy.style.display = "none";
    }, 700);
  }

  CopyToClipboard2()
  {
    /* Get the text field */
    var tableCell = document.getElementById('2');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
     /* Alert the copied text */
    var copy = document.getElementById('switch-2');
    copy.style.display = "block";
    const timer = setTimeout(() => 
    {
      copy.style.display = "none";
    }, 700);
  }

  CopyToClipboard3()
  {
    /* Get the text field */
    var tableCell = document.getElementById('3');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
     /* Alert the copied text */
    var copy = document.getElementById('switch-2');
    copy.style.display = "block";
    const timer = setTimeout(() => 
    {
      copy.style.display = "none";
    }, 700);
  }

  CopyToClipboard4()
  {
    /* Get the text field */
    var tableCell = document.getElementById('4');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
     /* Alert the copied text */
    var copy = document.getElementById('switch-2');
    copy.style.display = "block";
    const timer = setTimeout(() => 
    {
      copy.style.display = "none";
    }, 700);
  }

  CopyToClipboard5()
  {
    /* Get the text field */
    var tableCell = document.getElementById('5');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
     /* Alert the copied text */
    var copy = document.getElementById('switch-2');
    copy.style.display = "block";
    const timer = setTimeout(() => 
    {
      copy.style.display = "none";
    }, 700);
  }

  CopyToClipboard6()
  {
    /* Get the text field */
    var tableCell = document.getElementById('6');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
     /* Alert the copied text */
    var copy = document.getElementById('switch-2');
    copy.style.display = "block";
    const timer = setTimeout(() => 
    {
      copy.style.display = "none";
    }, 700);
  }

  CopyToClipboard7()
  {
    /* Get the text field */
    var tableCell = document.getElementById('7');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
     /* Alert the copied text */
    var copy = document.getElementById('switch-2');
    copy.style.display = "block";
    const timer = setTimeout(() => 
    {
      copy.style.display = "none";
    }, 700);
  }

  CopyToClipboard8()
  {
    /* Get the text field */
    var tableCell = document.getElementById('8');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
     /* Alert the copied text */
     var copy = document.getElementById('switch-2');
     copy.style.display = "block";
     const timer = setTimeout(() => 
     {
       copy.style.display = "none";
     }, 700);
  }

  CopyToClipboard9()
  {
    /* Get the text field */
    var tableCell = document.getElementById('9');
    var copyText = tableCell.textContent;

    /* Copy the text inside the text field */
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');

    /* Alert the copied text */
    var copy = document.getElementById('switch-2');
    copy.style.display = "block";
    const timer = setTimeout(() => 
    {
      copy.style.display = "none";
    }, 700);

  }


  render() {
    if (!this.state.web3) {
      return (
        <div class="switch">
          Wait untill loading!<br/> <br/>
          If loading is too long<br/>
          switch network to Ropsten <br/>
          or send message to developers!!!
        </div>
      );
    }
    return (
      <div className="App">
        <div id="header">
          <span id="balance" >Balance: {this.state.balanceOfMsgSender} INT</span>
          <span id="account" >
            <span class="account-type">Account: </span>
            <span id="addrToCopy" class="underline untouch" onClick={this.CopyToClipboard}>{this.state.accounts}</span>
          </span>
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
                <th class="untouch">Telegram</th>
                <th class="untouch">Name</th>
                <th class="untouch">Address</th>
                <th class="untouch">Balance</th>
              </tr>
            </thead>
            <tbody> 
              <tr>
                <td>@flexxxbob</td>
                <td class="untouch">Alexander</td>
                <td class="underline untouch" id="1" onClick={this.CopyToClipboard1}> 0xb0eDDC579AF621657dC0A7CE3016FA02a35B616A</td>
                <td class="untouch">{this.state.balanceOfSasha} INT</td>
              </tr>
              <tr>
                <td>@Valdemar1337</td>
                <td class="untouch">Vladimir</td>
                <td class="underline untouch" id="2" onClick={this.CopyToClipboard2}>0xc1fADc7346e3f3D36c29cdb88725679416bd603a</td>
                <td class="untouch">{this.state.balanceOfVova} INT</td>
              </tr>
              <tr>
                <td>@Nektarines</td>
                <td class="untouch">Nichita</td>
                <td class="underline untouch" id="3" onClick={this.CopyToClipboard3}>0xcfcb8fee75E86865718f608B3BCcB582B4D7C560</td>
                <td class="untouch">{this.state.balanceOfNikita} INT</td>
              </tr>
              <tr>
                <td>@zhaukenove</td>
                <td class="untouch">Yerkebulan</td>
                <td class="underline untouch" id="4" onClick={this.CopyToClipboard4}>0x2787DeB7Cb801858CfD3AE8532C15EAa9b6925F2</td>
                <td class="untouch">{this.state.balanceOfErke} INT</td>
              </tr>
              <tr>
                <td>@Igorterzi</td>
                <td class="untouch">Igor</td>
                <td class="underline untouch" id="5" onClick={this.CopyToClipboard5}>0xdB44F63e0Ae6F2166c2f990a4dC877D4bDDCa500</td>
                <td class="untouch">{this.state.balanceOfIgor} INT</td>
              </tr>
              <tr>
                <td>@vadim_peev</td>
                <td class="untouch">Vadim</td>
                <td class="underline untouch" id="6" onClick={this.CopyToClipboard6}>0x27bE67f7EEd685E4eBe96e0B0DE08A9f30b8b8D2</td>
                <td class="untouch">{this.state.balanceOfVadim} INT</td>
              </tr>
              <tr>
                <td>@sweetbubalehj</td>
                <td class="untouch">Egor</td>
                <td class="underline untouch" id="7" onClick={this.CopyToClipboard7}>0x0B89aafa6328dbA176Ea91eA04859241991c386A</td>
                <td class="untouch">{this.state.balanceOfEgor} INT</td>
              </tr>
              <tr>
                <td>@Kcintes</td>
                <td class="untouch">Nicolai</td>
                <td class="underline untouch" id="8" onClick={this.CopyToClipboard8}>0x468172566756063Cc52ab6C020aE9c9583D9AB95</td>
                <td class="untouch">{this.state.balanceOfNicolai} INT</td>
              </tr>
              <tr>
                <td>@s_tomayli</td>
                <td class="untouch">Slava</td>
                <td class="underline untouch" id="9" onClick={this.CopyToClipboard9}>0x48c5e730125565435e9E9D70CbD680bb7819bbCD</td>
                <td class="untouch">{this.state.balanceOfSlava} INT</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="token">
          <span class="account-type">Token: </span>
          <span id="addrToCopyToken" class="underline untouch" onClick={this.CopyToClipboardToken}>{this.state.tokenAddress} </span>
        </div>

        <div id="switch-2">
          Copied
        </div>
      </div>

      
    );
  }
}

export default App;
