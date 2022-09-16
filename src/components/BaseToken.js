import React, { useState, useEffect } from 'react';


function BaseToken({pic, label, supply: parentSupply = 0, onBaseSupplyChangedHandler, onBaseTradeHandler, onBaseSupplyContractHandler}) {
    const [supply, setSupply] = useState(parentSupply);

    useEffect(() => {
        setSupply(parentSupply);
    }, [parentSupply]);

    const doMint = async () => {
        await onBaseSupplyContractHandler(label);
        setSupply(supply + 1);        
        await onBaseSupplyChangedHandler(label, supply + 1);
    }

    const doTrade = () => {
        onBaseTradeHandler(label);
    }
    
    return (
        <td>
            <div className="Td"> 
                <img src={pic} className="App-logo" alt="logo" />
                <label>{label}</label>
                <button type="button" className="Btn-logo" onClick={doMint}>Mint This</button>
                <button type="button" className="Btn-logo" onClick={doTrade}>Trade for this</button>
                <label className="Small-lbl">Supply: {supply}</label>
            </div>
        </td>
    )
}

export default BaseToken;