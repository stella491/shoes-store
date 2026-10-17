import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import api from "../api/api";
import Pagination from "../Components/Pagination";
import SkelentonCard from "../Components/SkelentonCard";
import type { Product } from "../types/product";



function CategoryPage() {
  const { gender } = useParams<{ gender: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gender]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get<Product[]>("/products");
        setProducts(res.data);
        setLoading(false);
      } catch {
        console.log("Failed to load products");
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category === gender,
  );

    const start = (currentPage - 1) * itemsPerPage;
    const paged = filteredProducts.slice(start, start + itemsPerPage);
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 capitalize text-center mt-4">
        {gender} shoes
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-6 max-w-7xl mx-auto px-6 lg:px-20 md:mt-8">
        {loading ? (
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <SkelentonCard key={i} />
          ))
        ) : paged.length === 0 ? (
          <p className="text-cente text-4xl font-semibold mt-14">No product found.</p>
        ) : (
          paged.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}

export default CategoryPage;
