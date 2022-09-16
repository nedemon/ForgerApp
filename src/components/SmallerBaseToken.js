import React, { useState } from 'react';


function SmallerBaseToken({pic, label, onCheckedHandler}) {
    const [checked, setChecked] = useState(false);

    const checkedHandler = (e) => {
        setChecked(e.target.checked);
        onCheckedHandler(label, e.target.checked);
    }

    return (
        <td>
            <img src={pic} className="Smaller-app-logo" alt="logo" />
            <div>
            <input type="checkbox" id="checkbox0" name="checkbox0" onChange={checkedHandler} checked={checked}></input>
            <label className="Small-lbl">{label}</label>
            </div>
        </td>
    )
}

export default SmallerBaseToken;