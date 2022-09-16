import React, { useState, useEffect } from 'react';


export default function DerivedToken({pic, label, supply: parentSupply = 0, onClickExternal}) {
    const [supply, setSupply] = useState(parentSupply);
    useEffect(() => {
        setSupply(parentSupply);
    }, [parentSupply]);

    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive(current => !current);
        onClickExternal(label, !isActive);
    };

    return (
        <td>
            <img 
                src={pic} 
                className="Smaller-app-logo" 
                style={{
                    border: isActive ? '3px solid pink' : 'none',
                }}
                alt="logo"
                role="button"
                onClick={handleClick}/>
            <div>
                <label className="Small-lbl">{label}</label>
                <br/>
                <label className="Small-lbl">Supply: {supply}</label>                
            </div>
         </td>
    );
}