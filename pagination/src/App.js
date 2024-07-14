import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const fetchProd = async () =>{
    const response = await fetch(`https://dummyjson.com/products?limit=150`);
    const data = await response.json()
    // console.log(data);
    if (data && data.products) {
      setProducts(data.products)
    }
  }
  useEffect(()=>{
  
    fetchProd();
  },[])

  console.log([...Array(products.length / 10)],'[...Array(products.length / 10)]');

  const selectPageHandler = (p) =>{
      setPage(p)
  }
  
  return (
   <div className='container'>
    <div className='products'>
      
      {
        products && products.slice(page * 10 - 10, page * 10).map((product)=>(
          <div className='product_box' key={product.id}>
            <div className='product_box_img text-center'>
              <img src={product.images} />
              </div>

              <div className='product_box_name text-center mb-2'>
                {product.title}
              </div>

          </div>
        ))
      }

    </div>

    {
      
    products.length >0  &&(

    <div className='button_container'>
      {

      [...Array(products.length / 10)].map((_,i)=>{
        return <span key={i} className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
      })
      }

    </div>
    ) 
    }

   </div>
  );
}

export default App;
