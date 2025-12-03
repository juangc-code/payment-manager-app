import products from "../../data/products";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppProvider";
import UserMenu from "../../components/UserMenu";
import "./CatalogPage.css";

export default function CatalogPage() {
  const navigate = useNavigate();
  const { setProduct } = useApp();

  const handleSelect = (p) => {
    setProduct(p);
    navigate(`/product/${p.id}`);
  };

  return (
    <>
      <UserMenu />
      <div className="page-container">
        <div className="page-card catalog-card">
          <div className="page-header">
            <h1 className="page-title">Payment Manager</h1>
            <p className="page-subtitle">Select a product or service</p>
          </div>

          <div className="products-list">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={() => handleSelect(p)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}