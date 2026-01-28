// import React, { useEffect, useState, useRef,useCallback } from "react";
// import Product from "./Product";
// import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
// import "./Store.css";

// const Store = ({ searchText }) => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filter, setFilter] = useState("");
//   let postPerPage = 12

//   const hasRun = useRef(false);
//   const hasRun1 = useRef(false);

//   // useEffect(() => {
//   //   if (hasRun.current) return;
//   //   hasRun.current = true;
//   //   ProductCategory();
//   // }, []);
  
// useEffect(() => {
//   ProductCategory();
// }, []);

//   // useEffect(() => {
//   //   // if (hasRun1.current) return;
//   //   if(searchText){
//   //     handleApiCall();
//   //     hasRun1.current = false
//   //   }else{
//   //     hasRun1.current = true
//   //   }
//   // }, [searchText])

//   // useEffect(() => {
//   //   handleApiCall()
//   // }, [])

//   // const handleApiCall = async (filter) => {
//   //   await fetch("https://dummyjson.com/products")
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       if (searchText) {
//   //         setProducts(data.products.filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase()),));
//   //       } else if (filter) {
//   //         setProducts(data.products.filter((product) => filter === product.category));
//   //       } else {
//   //         setProducts(data.products);
//   //       }
//   //     });
//   // };
//   const handleApiCall = useCallback(async (filter) => {
//   const res = await fetch("https://dummyjson.com/products");
//   const data = await res.json();

//   let updatedProducts = data.products;

//   if (searchText) {
//     updatedProducts = updatedProducts.filter((product) =>
//       product.title.toLowerCase().includes(searchText.toLowerCase())
//     );
//   }

//   if (filter) {
//     updatedProducts = updatedProducts.filter(
//       (product) => product.category === filter
//     );
//   }

//   setProducts(updatedProducts);

// }, [searchText]);

// useEffect(() => {
//   handleApiCall(filter);
// }, [searchText, filter, handleApiCall]);


//   const ProductCategory = () => {
//     fetch("https://dummyjson.com/products/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data));
//   };

//   // const handleChange = (event) => {
//   //   const selected = event.target.value;
//   //   handleApiCall(selected);
//   //   setCurrentPage(1);
//   // };

//     const handleChange = (event) => {
//     setFilter(event.target.value);   // ✅ set filter state
//     setCurrentPage(1);
//   };

//   const lastIndex = currentPage * postPerPage;
//   const firstIndex = lastIndex - postPerPage;
//   const records = products.slice(firstIndex, lastIndex);
//   const totalPages = Math.ceil(products.length / postPerPage);

//   const paginate = (page) => setCurrentPage(page);

//   return (
//     <div className="home-container">
//       <select className="Dropdown" onChange={handleChange}>
//         <option value="">Select the Category</option>
//         {categories.map((category, index) => (
//           <option key={index} value={category.slug}>
//             {category.name}
//           </option>

//         ))}
//       </select>

//       <div className="product-grid">
//         {records.length > 0 ? (
//           records.map((product) => <Product key={product.id} product={product} />)
//         ) : (
//           <p>No products found.</p>
//         )}
//       </div>

//       {/* Pagination Section */}
//       {products.length > 0 && (
//         <div className="paginate">
//           <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
//             <FaArrowAltCircleLeft />
//           </button>

//           {new Array(totalPages).fill(0).map((_, index) => (
//             <button
//               key={index + 1}
//               className={currentPage === index + 1 ? "active" : ""}
//               onClick={() => paginate(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
          
//           <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>
//             <FaArrowAltCircleRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Store;



import React, { useEffect, useState, useCallback } from "react";
import Product from "./Product";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./Store.css";

const Store = ({ searchText }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // [{value,label}]
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const postPerPage = 12;

  // fetch categories once
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        // data is usually an array of strings; normalize to {value,label}
        const normalized = (Array.isArray(data) ? data : []).map((c) => {
          if (typeof c === "string") {
            const label = c
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ");
            return { value: c, label };
          }
          // fallback if API ever returns objects
          return { value: c.slug ?? c.name ?? "", label: c.name ?? c.slug ?? "" };
        });
        setCategories(normalized);
      })
      .catch(() => setCategories([]));
  }, []);

  // fetch products (search + filter)
  const handleApiCall = useCallback(
    async (selectedCategory) => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      let updated = data?.products ?? [];

      if (searchText) {
        const q = searchText.toLowerCase();
        updated = updated.filter((p) => p.title.toLowerCase().includes(q));
      }

      if (selectedCategory) {
        updated = updated.filter((p) => p.category === selectedCategory);
      }

      setProducts(updated);
    },
    [searchText]
  );

  // re-run when search or filter changes
  useEffect(() => {
    handleApiCall(filter);
  }, [searchText, filter, handleApiCall]);

  const handleChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  // pagination
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length / postPerPage);
  const paginate = (page) => setCurrentPage(page);

  return (
    <div className="home-container">
      <select className="Dropdown" onChange={handleChange} value={filter}>
        <option value="">Select the Category</option>
        {categories.map((c, idx) => (
          <option key={idx} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <div className="product-grid">
        {records.length > 0 ? (
          records.map((product) => <Product key={product.id} product={product} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {products.length > 0 && (
        <div className="paginate">
          <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
            <FaArrowAltCircleLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={currentPage === n ? "active" : ""}
              onClick={() => paginate(n)}
            >
              {n}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Store;
