import React, { useState, useEffect } from "react";
import "./Productos.css";
import logo from "../../assets/images/logo_colombiarte.png";
import { useTranslation } from "react-i18next";

const Productos = () => {

  const { t } = useTranslation(["trad"])

  const [nombre, setNombre] = useState("Usuario No Identificado");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedAvailable, setSelectedAvailable] = useState("");
  const [products, setProducts] = useState([]);

  const filterOptions = [
    "precio",
    "cantidad",
    "tipo",
    "temporada",
    "origen",
    "disponible",
  ];

  const types = [
    "Frutas",
    "Vegetales",
    "Cereales",
    "Productos lácteos",
    "Carne",
    "Aves de corral",
    "Mariscos",
    "Frutos secos",
    "Hierbas",
    "Especias",
  ];

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const origins = [
    "Antioquia",
    "Bogotá D.C.",
    "Valle del Cauca",
    "Cundinamarca",
    "Santander",
    "Atlántico",
    "Norte de Santander",
    "Bolívar",
    "Tolima",
    "Risaralda",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No hay token JWT. El usuario no está autenticado.');
                return;
            }
            const response = await fetch(
                "http://localhost:4000/productos_agricolas",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setProducts(data);
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            setNombre(usuario.nombre);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    if (selectedFilters.includes(value)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
      if (value === "precio") {
        setMinPrice("");
        setMaxPrice("");
      } else if (value === "cantidad") {
        setMinQuantity("");
        setMaxQuantity("");
      } else if (value === "tipo") {
        setSelectedType("");
      } else if (value === "temporada") {
        setSelectedSeason("");
      } else if (value === "origen") {
        setSelectedOrigin("");
      } else if (value === "disponible") {
        setSelectedAvailable("");
      }
    } else {
      setSelectedFilters([...selectedFilters, value]);
    }
  };

  const isValidPrice = (price) => {
    const regex = /^\d*\.?\d*$/;
    return regex.test(price);
  };

  const filteredProducts = products.filter((product) => {
    return selectedFilters.every((filter) => {
      switch (filter) {
        case "precio":
          return (
            (!minPrice || isValidPrice(minPrice)) &&
            (!maxPrice || isValidPrice(maxPrice)) &&
            (!minPrice || product.precio >= parseFloat(minPrice)) &&
            (!maxPrice || product.precio <= parseFloat(maxPrice))
          );
        case "cantidad":
          return (
            (!minQuantity || product.cantidad >= parseInt(minQuantity, 10)) &&
            (!maxQuantity || product.cantidad <= parseInt(maxQuantity, 10))
          );
        case "tipo":
          return (
            !selectedType ||
            (product.tipo && product.tipo.toLowerCase() === selectedType.toLowerCase())
          );
        case "temporada":
          return !selectedSeason || product.temporada === selectedSeason;
        case "origen":
          return !selectedOrigin || product.origen === selectedOrigin;
        case "disponible":
          return (
            !selectedAvailable ||
            product.disponible === (selectedAvailable === "Yes")
          );
        default:
          return true;
      }
    });
  });

  return (
    <div className="productos-containerP">
      {/* Header */}
      <header className="headerP">
        <div className="logo-containerP">
          <img src={logo} alt="Logo" className="logoP" />
        </div>
        <div className="title-containerP">
          <h1 className="titleP">{t("HU06-productosagricolas")}</h1>
        </div>
        <div className="user-info-containerP">
          <span className="usernameP">{nombre}</span>
          {/* Add the icon for user info */}
          <span className="user-iconP">
            <img
              src={require("../../assets/images/usuario.png")}
              alt="User Icon"
              style={{ width: "30px", height: "30px" }}
            />
          </span>
        </div>
      </header>

      <div className="filter-menu-wrapperP">
        {/* Filter menu button */}
        <div className="filter-menu-button-containerP">
          <button
            className="filter-buttonP"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            {t("HU06-menufiltro")}
          </button>
        </div>

        {/* Filtering menu */}
        {menuVisible && (
          <div className="filter-menuP">
            {filterOptions.map((option) => (
              <div key={option}>
                {option.trim() === "precio" ? (
                  <div>
                    <label htmlFor="priceCheckbox">
                      <input
                        type="checkbox"
                        id="priceCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <div>
                      <label htmlFor="minPrice">{t("HU06-minprecio")}:</label>
                      <input
                        type="text"
                        id="minPrice"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        disabled={!selectedFilters.includes(option)}
                      />
                      <label htmlFor="maxPrice">{t("HU06-maxprecio")}:</label>
                      <input
                        type="text"
                        id="maxPrice"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        disabled={!selectedFilters.includes(option)}
                      />
                    </div>
                  </div>
                ) : option.trim() === "cantidad" ? (
                  <div>
                    <label htmlFor="quantityCheckbox">
                      <input
                        type="checkbox"
                        id="quantityCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <div>
                      <label htmlFor="minQuantity">{t("HU06-mincantidad")}:</label>
                      <input
                        type="number"
                        id="minQuantity"
                        value={minQuantity}
                        onChange={(e) => setMinQuantity(e.target.value)}
                        disabled={!selectedFilters.includes(option)}
                      />
                      <label htmlFor="maxQuantity">{t("HU06-maxcantidad")}:</label>
                      <input
                        type="number"
                        id="maxQuantity"
                        value={maxQuantity}
                        onChange={(e) => setMaxQuantity(e.target.value)}
                        disabled={!selectedFilters.includes(option)}
                      />
                    </div>
                  </div>
                ) : option.trim() === "tipo" ? (
                  <div>
                    <label htmlFor="typeCheckbox">
                      <input
                        type="checkbox"
                        id="typeCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <select
                      id="typeSelect"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      disabled={!selectedFilters.includes(option)}
                    >
                      <option value="">{t("HU06-seleccionar")} {t("HU06-" + option)}</option>
                      {types.map((type, index) => (
                        <option key={index} value={type}>
                          {t(type)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : option.trim() === "temporada" ? (
                  <div>
                    <label htmlFor="seasonCheckbox">
                      <input
                        type="checkbox"
                        id="seasonCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <select
                      id="seasonSelect"
                      value={selectedSeason}
                      onChange={(e) => setSelectedSeason(e.target.value)}
                      disabled={!selectedFilters.includes(option)}
                    >
                      <option value="">{t("HU06-seleccionar")} {t("HU06-" + option)}</option>
                      {months.map((month, index) => (
                        <option key={index} value={month}>
                          {t(month)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : option.trim() === "origen" ? (
                  <div>
                    <label htmlFor="originCheckbox">
                      <input
                        type="checkbox"
                        id="originCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <select
                      id="originSelect"
                      value={selectedOrigin}
                      onChange={(e) => setSelectedOrigin(e.target.value)}
                      disabled={!selectedFilters.includes(option)}
                    >
                      <option value="">{t("HU06-seleccionar")} {t("HU06-" + option)}</option>
                      {origins.map((origin, index) => (
                        <option key={index} value={origin}>
                          {origin}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : option.trim() === "disponible" ? (
                  <div>
                    <label htmlFor="availableCheckbox">
                      <input
                        type="checkbox"
                        id="availableCheckbox"
                        value={option}
                        checked={selectedFilters.includes(option)}
                        onChange={handleFilterChange}
                      />
                      {t("HU06-" + option)}
                    </label>
                    <select
                      id="availableSelect"
                      value={selectedAvailable}
                      onChange={(e) => setSelectedAvailable(e.target.value)}
                      disabled={!selectedFilters.includes(option)}
                    >
                      <option value="">{t("HU06-seleccionar")} {t("HU06-" + option)}</option>
                      <option value="Yes">{t("si")}</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                ) : (
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedFilters.includes(option)}
                      onChange={handleFilterChange}
                    />
                    {t("HU06-" + option)}
                  </label>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid view of agricultural products */}
      <div className="products-gridP">
        {filteredProducts.length === 0 ? (
          <p>
            {" "}
            <br />
            {t("HU06-noencontrado")}
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-cardP">
              <img src={product.imagen || ''} alt={product.nombre || ''} />
              <h3>{product.nombre || ''}</h3>
              <p>{t("HU06-tipo")}: {product.tipo ? t(product.tipo.charAt(0).toUpperCase() + product.tipo.slice(1)) : ''}</p>
              <p>{t("HU06-precio")}: ${product.precio || ''}</p>
              <p>{t("HU06-cantidad")}: {product.cantidad || ''}</p>
              <p>{t("HU06-temporada")}: {product.temporada ? t(product.temporada) : ''}</p>
              <p>{t("HU06-origen")}: {product.origen || ''}</p>
              <p>{t("HU06-disponible")}: {product.disponible ? t("si") : "No"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Productos;
