import { useState } from "react";
import InputQuantity from "./InputQuantity";
function DataTable({ data: dataTable, setDataTable }) {

    const [quantity, setQuantity] = useState(0);

    const handleAddToCartOnClick = (id) => {
        if (quantity > 0) {
            fetch(`https://localhost:7031/api/cartItem`, {
                method: "POST",
                body: JSON.stringify({
                    productId: id,
                    quantity
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result.status === "success") {
                        alert("Successfully added to Cart")
                    }
                })

        } else {
            alert("Quantity is required")
        }
    }

    const getQuantity = (value) => {
        setQuantity(value)
    }

    return (
        <di>
            <table class="table table-striped ">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Cost</th>
                        <th scope="col" className="text-start">Quantity</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map(d => (
                        <tr key={d.id}>
                            <th scope="row">{d.id}</th>
                            <td className="w-25">{d.name}</td>
                            <td>&#8369; {d.cost}</td>
                            <td className="w-25">
                                <InputQuantity getQuantity={getQuantity} quantity={quantity} />
                            </td>
                            <td>
                                <button type="button" onClick={() => handleAddToCartOnClick(d.id)} className="btn btn-primary w-100" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                    &nbsp;
                                    Add to Cart</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </di >
    );
}

export default DataTable;