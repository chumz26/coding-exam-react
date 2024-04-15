import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderList() {

    const navigate = useNavigate();

    const [dataTable, setDataTable] = useState([]);
    const [cashAmountValue, setCashAmountValue] = useState(0);

    const fetchCartItems = () => {
        fetch("https://localhost:7031/api/cartitem")
            .then(res => res.json())
            .then(result => {
                if (result.status === "success") {
                    setDataTable(result.data)
                }
            })
    }

    const handleRemoveItemOnClick = (id) => {
        if (window.confirm("You want to remove this item?")) {
            fetch("https://localhost:7031/api/cartitem/" + id, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(result => {
                    if (result.status === "success") {
                        alert("Successfully Removed");
                        const newData = dataTable.filter(d => d.id !== id);
                        setDataTable(newData)
                    }
                })

        }
    }

    const calculate = () => {
        if (dataTable !== undefined && dataTable.length > 0) {
            const total = dataTable.reduce((n, { total }) => n + total, 0)
            return parseFloat(total).toFixed(2)
        }
    }

    const handleCashAmountOnChange = (value) => {
        setCashAmountValue(value)
    };

    const handleSaveOnClick = (e) => {
        alert("Cash Amount Saved. We will process you order(s) now. \nRedirecting to Product Page.");
        navigate("/")
    };

    useEffect(() => {
        fetchCartItems()
    }, [])

    return (
        <div className="pt-4">

            <h3>
                Your Cart Item(s)
            </h3>
            {/* <hr/> */}

            <div className="text-end mb-4">
                <a href="/" className="btn btn-primary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16">
                        <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z" />
                    </svg>&nbsp;
                    Go to Products</a>
            </div>
            <hr />
            <table class="table table-striped ">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Cost</th>
                        <th scope="col" >Quantity</th>
                        <th scope="col" >Total</th>
                        <th scope="col" >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map(d => (
                        <tr>
                            <th scope="row">{d.id}</th>
                            <td>{d.product.name}</td>
                            <td>&#8369; {parseFloat(d.product.cost).toFixed(2)}</td>
                            <td>{d.quantity}</td>
                            <td>&#8369; {parseFloat(d.total).toFixed(2)}</td>
                            <td>
                                <button type="button" onClick={() => handleRemoveItemOnClick(d.id)} className="btn btn-danger" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                    </svg>&nbsp;
                                    Remove</button>
                            </td>

                        </tr>
                    ))}
                    <tr>
                        <td colSpan={4} className="text-start fs-4 fw-bold " ><span className="ml-4">Total Price to Pay: </span></td>
                        <td className=" fs-4 fw-bold">&#8369; {calculate()}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <div className="row">
                <div className="col-9">
                    <div className="form-floating">
                        <input id="CashAmount"
                            type="number"
                            value={cashAmountValue === 0 ? "" : cashAmountValue}
                            className="form-control"
                            onChange={({ target }) => handleCashAmountOnChange(target.value)}
                            placeholder="Enter Cash Amount"
                        />
                        <label for="CashAmount">Enter Cash Amount</label>
                    </div>
                </div>
                <div className="col-3">
                    <button
                        disabled={parseFloat(cashAmountValue) > calculate() ? false : true}
                        className="w-100 btn-lg btn btn-primary"
                        onClick={() => {
                            handleSaveOnClick()
                        }}
                    >Save</button>
                </div>
            </div>
        </div>
    );
}

export default OrderList;