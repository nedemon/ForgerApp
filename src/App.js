import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import pic0 from './assets/1.jpg'
import pic1 from './assets/2.jpg'
import pic2 from './assets/3.jpg'
import pic3 from './assets/4.jpg'
import pic4 from './assets/5.jpg'
import pic5 from './assets/6.jpg'
import pic6 from './assets/7.jpg'
import './App.css'
import BaseToken from "./components/BaseToken"
import DerivedToken from "./components/DerivedToken"
import SmallerBaseToken from "./components/SmallerBaseToken"

import tokenAddress from './contracts/TToken-contract-address.json'
import tokenArtifact from './contracts/TToken.json'
import forgerAddress from './contracts/Forger-contract-address.json'
import forgerArtifact from './contracts/Forger.json'

const HARDHAT_NETWORK_ID = '31337'
//const ERROR_CODE_TX_REJECTED_BY_USER = 4001

function App() {
  const [data, setdata] = useState({
    address: "",
    Balance: "Empty",
  });
  const [baseSupplyArr, setBaseSupplyArr] = useState([0, 0, 0]);
  const [derivedSupplyArr, setDerivedSupplyArr] = useState([0, 0, 0, 0]); //3, 4, 5, 6
  const [checkedArr, setCheckedArr] = useState([false, false, false]);
  const [TokenContract, setToken] = useState(null);
  const [ForgerContract, setForger] = useState(null);
  useEffect(() => {
    async function getNetworkName() {
      if (window.ethereum === undefined) {
        alert("Please, install metamask!!");
        return;
      }
      const [selectedAddress] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (window.ethereum.networkVersion !== HARDHAT_NETWORK_ID) { 
        alert("Wrong network!!");
        return;
      }
      let provider = new ethers.providers.Web3Provider(window.ethereum)

      const token = new ethers.Contract(
        tokenAddress.TToken,
        tokenArtifact.abi,
        provider.getSigner(0)
      );

      const forger = new ethers.Contract(
        forgerAddress.Forger,
        forgerArtifact.abi,
        provider.getSigner(0)
      );
      
      setToken(token);
      setForger(forger);

      if(window.ethereum && window.ethereum.networkVersion === HARDHAT_NETWORK_ID && token) {
        const [selectedAddress] = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        let baseArray = [];
        const res0 = await token.balanceOf(selectedAddress, 0);
        const res1 = await token.balanceOf(selectedAddress, 1);
        const res2 = await token.balanceOf(selectedAddress, 2);
        baseArray.push(res0.toNumber())
        baseArray.push(res1.toNumber())
        baseArray.push(res2.toNumber())        
        setBaseSupplyArr(baseArray)

        let derArray = [];
        const res3 = await token.balanceOf(selectedAddress, 3);
        const res4 = await token.balanceOf(selectedAddress, 4);
        const res5 = await token.balanceOf(selectedAddress, 5);
        const res6 = await token.balanceOf(selectedAddress, 6);
        derArray.push(res3.toNumber())
        derArray.push(res4.toNumber())
        derArray.push(res5.toNumber())
        derArray.push(res6.toNumber())
        setDerivedSupplyArr(derArray)

      }
    };
    getNetworkName();
  }, []);

  useEffect(() => {
    async function getBalance() {
            
    };
    getBalance();
  }, [baseSupplyArr])

  

  const onBaseSupplyContractHandler = async (label) => {
    let transaction;
    switch(label) {
      case "Token 0":
        transaction = await ForgerContract.mintBasic(0);
        await transaction.wait();
        break;
      case "Token 1":
        transaction = await ForgerContract.mintBasic(1);
        await transaction.wait();
        break;
      case "Token 2":
        transaction = await ForgerContract.mintBasic(2);
        await transaction.wait();
        break;  
      default:
        console.log("Unknown");
    }
  }
  
  const onBaseTradeHandler = async (label) => {
    let transaction;
    switch(label) {
      case "Token 0":
        if(selectedArr[0] && derivedSupplyArr[0] > 0) {
          transaction = await ForgerContract.tradeDerived(3, 0);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[0] + 1);
          onDerivedSupplyChangedHandler("Token 3", derivedSupplyArr[0] - 1);
        } else if(selectedArr[1] && derivedSupplyArr[1] > 0) {
          transaction = await ForgerContract.tradeDerived(4, 0);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[0] + 1);
          onDerivedSupplyChangedHandler("Token 4", derivedSupplyArr[1] - 1);
        } else if(selectedArr[2] && derivedSupplyArr[2] > 0) {
          transaction = await ForgerContract.tradeDerived(5, 0);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[0] + 1);
          onDerivedSupplyChangedHandler("Token 5", derivedSupplyArr[2] - 1);
        } else if(selectedArr[3] && derivedSupplyArr[3] > 0) {
          transaction = await ForgerContract.tradeDerived(6, 0);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[0] + 1);
          onDerivedSupplyChangedHandler("Token 6", derivedSupplyArr[3] - 1);
        }
        break;
      case "Token 1":
        if(selectedArr[0] && derivedSupplyArr[0] > 0) {
          transaction = await ForgerContract.tradeDerived(3, 1);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[1] + 1);
          onDerivedSupplyChangedHandler("Token 3", derivedSupplyArr[0] - 1);
        } else if(selectedArr[1] && derivedSupplyArr[1] > 0) {
          transaction = await ForgerContract.tradeDerived(4, 1);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[1] + 1);
          onDerivedSupplyChangedHandler("Token 4", derivedSupplyArr[1] - 1);
        } else if(selectedArr[2] && derivedSupplyArr[2] > 0) {
          transaction = await ForgerContract.tradeDerived(5, 1);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[1] + 1);
          onDerivedSupplyChangedHandler("Token 5", derivedSupplyArr[2] - 1);
        } else if(selectedArr[3] && derivedSupplyArr[3] > 0) {
          transaction = await ForgerContract.tradeDerived(6, 1);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[1] + 1);
          onDerivedSupplyChangedHandler("Token 6", derivedSupplyArr[3] - 1);
        }
        break;
      case "Token 2":
        if(selectedArr[0] && derivedSupplyArr[0] > 0) {
          transaction = await ForgerContract.tradeDerived(3, 2);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[2] + 1);
          onDerivedSupplyChangedHandler("Token 3", derivedSupplyArr[0] - 1);
        } else if(selectedArr[1] && derivedSupplyArr[1] > 0) {
          transaction = await ForgerContract.tradeDerived(4, 2);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[2] + 1);
          onDerivedSupplyChangedHandler("Token 4", derivedSupplyArr[1] - 1);
        } else if(selectedArr[2] && derivedSupplyArr[2] > 0) {
          transaction = await ForgerContract.tradeDerived(5, 2);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[2] + 1);
          onDerivedSupplyChangedHandler("Token 5", derivedSupplyArr[2] - 1);
        } else if(selectedArr[3] && derivedSupplyArr[3] > 0) {
          transaction = await ForgerContract.tradeDerived(6, 2);
          await transaction.wait();
          onBaseSupplyChangedHandler(label, baseSupplyArr[2] + 1);
          onDerivedSupplyChangedHandler("Token 6", derivedSupplyArr[3] - 1);
        }
        break;
      default:
        console.log("Unknown");
    }
  }
  
  const onDerivedSupplyChangedHandler = (label, supply) => {
    let newArray;
    switch(label) {
      case "Token 3":
        newArray = [...derivedSupplyArr];
        newArray[0] = supply;
        setDerivedSupplyArr(newArray);
        break;
      case "Token 4":
        newArray = [...derivedSupplyArr];
        newArray[1] = supply;
        setDerivedSupplyArr(newArray);
        break;
      case "Token 5":
        newArray = [...derivedSupplyArr];
        newArray[2] = supply;
        setDerivedSupplyArr(newArray);
        break;
      case "Token 6":
        newArray = [...derivedSupplyArr];
        newArray[3] = supply;
        setDerivedSupplyArr(newArray);
        break;  
      default:
        console.log("Unknown");
    }
  }

  
  const onBaseSupplyChangedHandler = async (label, supply) => {
    let newArray;
    switch(label) {
      case "Token 0":
        newArray = [...baseSupplyArr];
        newArray[0] = supply;
        setBaseSupplyArr(newArray);
        break;
      case "Token 1":
        newArray = [...baseSupplyArr];
        newArray[1] = supply;
        setBaseSupplyArr(newArray);
        break;
      case "Token 2":
        newArray = [...baseSupplyArr];
        newArray[2] = supply;
        setBaseSupplyArr(newArray);
        break;
      default:
        console.log("Unknown");
    }
  }
  
  const onCheckedHandler = (label, checked) => {    
    let newArray;
    switch(label) {
      case "Token 0":
        newArray = [...checkedArr];
        newArray[0] = checked;
        setCheckedArr(newArray);
        break;
      case "Token 1":
        newArray = [...checkedArr];
        newArray[1] = checked;
        setCheckedArr(newArray);
        break;
      case "Token 2":
        newArray = [...checkedArr];
        newArray[2] = checked;
        setCheckedArr(newArray);
        break;
      default:
        console.log("Unknown");
    }
  }

  const doForge = async () => {
    let transaction;
    // 0 1 2 => 6
    if(baseSupplyArr[0] > 0 && baseSupplyArr[1] > 0 && baseSupplyArr[2] > 0 && checkedArr[0] && checkedArr[1] && checkedArr[2]) {      
      transaction = await ForgerContract.forge(true, true, true, {gasLimit: '300000'});
      await transaction.wait();
      onDerivedSupplyChangedHandler("Token 6", derivedSupplyArr[3] + 1);
      baseSupplyArr[0]--;
      baseSupplyArr[1]--;
      baseSupplyArr[2]--;
    }
    // 0 1 => 3
    if(baseSupplyArr[0] > 0 && baseSupplyArr[1] > 0 && checkedArr[0] && checkedArr[1]) {
      transaction = await ForgerContract.forge(true, true, false,  {gasLimit: '300000'});
      await transaction.wait();
      onDerivedSupplyChangedHandler("Token 3", derivedSupplyArr[0] + 1);
      baseSupplyArr[0]--;
      baseSupplyArr[1]--;
    }
    // 1 2 => 4
    if(baseSupplyArr[1] > 0 && baseSupplyArr[2] > 0 && checkedArr[1] && checkedArr[2]) {
      transaction = await ForgerContract.forge(false, true, true,  {gasLimit: '300000'});
      await transaction.wait();
      onDerivedSupplyChangedHandler("Token 4", derivedSupplyArr[1] + 1);
      baseSupplyArr[1]--;
      baseSupplyArr[2]--;
    }
    // 0 2 => 5
    if(baseSupplyArr[0] > 0 && baseSupplyArr[2] > 0 && checkedArr[0] && checkedArr[2]) {
      transaction = await ForgerContract.forge(true, false, true, {gasLimit: '300000'});
      await transaction.wait();
      onDerivedSupplyChangedHandler("Token 5", derivedSupplyArr[2] + 1);
      baseSupplyArr[0]--;
      baseSupplyArr[2]--;
    }    
  }  

  const MyBtnHandler = async () => {
    if (window.ethereum) {
      const transaction = await TokenContract.setMinter(forgerAddress.Forger);
      await transaction.wait()
      console.log("Minter set successfully to " + forgerAddress.Forger);
      const [selectedAddress] = await window.ethereum.request({      
        method: 'eth_requestAccounts'
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(selectedAddress);
      const balanceInEth = ethers.utils.formatEther(balance);
      setdata({Balance: balanceInEth, address: selectedAddress});
    }
    // const [selectedAddress] = await window.ethereum.request({
    //   method: 'eth_requestAccounts'
    // });
    // const res = await TokenContract.balanceOf(selectedAddress, 3);
    // console.log(res);
  }

  const onDerivedSupplyContractHandler = async (label) => {
    let transaction;
    switch(label) {
      case "Token 3":
        transaction = await ForgerContract.burnDerived(3);
        await transaction.wait();
        break;
      case "Token 4":
        transaction = await ForgerContract.burnDerived(4);
        await transaction.wait();
        break;
      case "Token 5":
        transaction = await ForgerContract.burnDerived(5);
        await transaction.wait();
        break;
      case "Token 6":
        transaction = await ForgerContract.burnDerived(6);
        await transaction.wait();
        break;  
      default:
        console.log("Unknown");
    }
  }

  const doBurn = async () => {
    if(derivedSupplyArr[0] > 0 && selectedArr[0]) {
      await onDerivedSupplyContractHandler("Token 3");
      onDerivedSupplyChangedHandler("Token 3", derivedSupplyArr[0] - 1);
    }
    if(derivedSupplyArr[1] > 0 && selectedArr[1]) {
      await onDerivedSupplyContractHandler("Token 4");
      onDerivedSupplyChangedHandler("Token 4", derivedSupplyArr[1] - 1);
    }
    if(derivedSupplyArr[2] > 0 && selectedArr[2]) {
      await onDerivedSupplyContractHandler("Token 5");
      onDerivedSupplyChangedHandler("Token 5", derivedSupplyArr[2] - 1);
    }
    if(derivedSupplyArr[3] > 0 && selectedArr[3]) {
      await onDerivedSupplyContractHandler("Token 6");
      onDerivedSupplyChangedHandler("Token 6", derivedSupplyArr[3] - 1);
    }
  };

  const[selectedArr, setSelectedArr] = useState([false, false, false, false]);
  const selectedHandler = (label, flag) => {
    let newArray;    
    switch(label) {
      case "Token 3":
        newArray = [...selectedArr];
        newArray[0] = flag;
        setSelectedArr(newArray);
        break;
      case "Token 4":
        newArray = [...selectedArr];
        newArray[1] = flag;
        setSelectedArr(newArray);
        break;
      case "Token 5":
        newArray = [...selectedArr];
        newArray[2] = flag;
        setSelectedArr(newArray);
        break;
      case "Token 6":
        newArray = [...selectedArr];
        newArray[3] = flag;
        setSelectedArr(newArray);
        break;  
      default:
        console.log("Unknown");
    }
  }
  return (
    <div className="App">            
      <header className="App-header">
        <div>
          <label className="Balance-btn">You have {data.Balance} Ether</label>
          <button type="button" className="Balance-btn" onClick={MyBtnHandler}>Connect wallet</button>
        </div>

        <table className="HugeTable">
          <tbody>
            <tr>
              <BaseToken pic={pic0} 
                label="Token 0" 
                supply={baseSupplyArr[0]} 
                onBaseSupplyChangedHandler={onBaseSupplyChangedHandler} 
                onBaseTradeHandler={onBaseTradeHandler}
                onBaseSupplyContractHandler={onBaseSupplyContractHandler}
                />
              <BaseToken pic={pic1} 
                label="Token 1" 
                supply={baseSupplyArr[1]} 
                onBaseSupplyChangedHandler={onBaseSupplyChangedHandler} 
                onBaseTradeHandler={onBaseTradeHandler}
                onBaseSupplyContractHandler={onBaseSupplyContractHandler}
                />
              <BaseToken pic={pic2} 
                label="Token 2" 
                supply={baseSupplyArr[2]} 
                onBaseSupplyChangedHandler={onBaseSupplyChangedHandler} 
                onBaseTradeHandler={onBaseTradeHandler}
                onBaseSupplyContractHandler={onBaseSupplyContractHandler}
                />
            </tr>
          </tbody>
        </table>

        <hr width="1700"/>

        <table className="HugeTable">
          <tbody>
            <tr>
              <td>
                <label>Your NFTs</label>
              </td>
              <td>
                <label>Your forged NFTs</label>
              </td>
            </tr>
            <tr>
              <td><label className="Small-lbl">Select 2 or more NFTs</label></td>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <SmallerBaseToken pic={pic0} label="Token 0" onCheckedHandler={onCheckedHandler}/>
                      <SmallerBaseToken pic={pic1} label="Token 1" onCheckedHandler={onCheckedHandler}/>
                      <SmallerBaseToken pic={pic2} label="Token 2" onCheckedHandler={onCheckedHandler}/>
                    </tr>
                  </tbody>
                </table>

              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <DerivedToken pic={pic3} label="Token 3" supply={derivedSupplyArr[0]} onClickExternal={selectedHandler}/>
                      <DerivedToken pic={pic4} label="Token 4" supply={derivedSupplyArr[1]} onClickExternal={selectedHandler}/>
                      <DerivedToken pic={pic5} label="Token 5" supply={derivedSupplyArr[2]} onClickExternal={selectedHandler}/>
                      <DerivedToken pic={pic6} label="Token 6" supply={derivedSupplyArr[3]} onClickExternal={selectedHandler}/>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td><button className="Btn-logo" onClick={doForge}>Forge!</button></td>
              <td><button className="Btn-logo" onClick={doBurn}>Burn</button></td>
            </tr>
          </tbody>
        </table>

      </header>
      
    </div>
  );
}

export default App;
