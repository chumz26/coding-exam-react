import { useEffect, useState } from "react";
import SearchProduct from './SearchProduct';
import DataTable from './DataTable';

function Home() {


    const [dataTable, setDataTable] = useState([]);

    const fetchProducts = () => {
        fetch("https://localhost:7031/api/product")
            .then(res => res.json())
            .then(result => {
                if (result.status === "success") {
                    setDataTable(result.data)
                }
            })
    }

    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div className="pt-4">
            <h3>
                Product(s)
            </h3>
            <div className="text-end mb-4">
                <a href="/cart" className="btn btn-primary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>&nbsp;
                    Go to Cart</a>
            </div>
            <hr />
            <div className="mb-4" >
                <SearchProduct setDataTable={setDataTable} />
            </div>
            <div>
                <DataTable data={dataTable} />
            </div>
        </div>
    );
}

export default Home;