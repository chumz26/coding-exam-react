import { useState } from "react";

function SearchProduct({setDataTable}) {

    const [searchInputData, setSearchInputData] = useState();

    const handleOnchange = (value) => {
        if(value){
            setSearchInputData(value)
            fetch(`https://localhost:7031/api/product/searchProduct=${value}`)
            .then(res => res.json())
            .then(result => {
                if(result.status === "success"){
                    setDataTable(result.data)
                }
            })
        }
    }

    return ( 
        <div>
            <input type="text" className="form-control" onChange={({target}) => {handleOnchange(target.value)}} placeholder="Search Product..."/>
        </div>
     );
}

export default SearchProduct;