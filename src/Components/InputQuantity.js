import { useState } from "react";

function InputQuantity({getQuantity}) {

    const [quantity, setQuantity] = useState(0);

    const handleQuantityOnChange = (value) =>{
        if(value > 0){
            setQuantity(value)
            getQuantity(value)
        }
    }

    return ( 
        <div className="">
            <input type="number" className="form-control" value={quantity} onChange={({ target }) => handleQuantityOnChange(target.value)} min="1" />
        </div>
     );
}

export default InputQuantity;