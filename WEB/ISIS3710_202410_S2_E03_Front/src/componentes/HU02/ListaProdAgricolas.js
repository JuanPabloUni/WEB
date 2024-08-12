import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./ListaProdAgricolas.css";
import logoImage from "../../assets/images/logo_colombiarte.png";
import { useTranslation } from 'react-i18next';

function ListaProdAgricolas() {

    const { t } = useTranslation(["trad"]);

    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');

    let navigate = useNavigate();

    function irADetalleProducto(idproducto) {
        navigate(`/ProdAgricolas/${idproducto}`);
    }

    function CrearProducto() {
        navigate(`/ProdAgricolas/Crear`);
    }

    useEffect(() => {
        async function fetchProd() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.alert('No hay token JWT. El usuario no está autenticado.');
                    return;
                }
                const usuario = JSON.parse(localStorage.getItem('usuario'));
                const response = await fetch(`http://localhost:4000/usuario-productos_agricolas/${usuario.id}/productos-agricolas`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    alert('No se pudo obtener la lista de productos agrícolas.');
                } else {
                    const productsData = await response.json();
                    setProducts(productsData);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProd();
    }, []);

    const filteredProducts = products.filter(product =>
        product.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="ListaProductosAgricolas">

            <div className="HeaderListt">
                <img src={logoImage} alt="Logo de ColombiArte" />
                <input type="text" placeholder={t("HU03-placeholderlist")} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button onClick={() => CrearProducto()}>{t("HU02-crearproducto")}</button>
            </div>

            <div className="Listado">
                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <div key={product.id} className="product-card" onClick={() => irADetalleProducto(product.id)}>
                        <img src={product.imagen} alt={product.nombre} />
                        <h3>{product.nombre}</h3>
                        <p><strong>{t("HU02-precio")}:</strong> {product.precio}</p>
                        <p><strong>{t("HU02-disponibilidad")}:</strong> {product.cantidad}</p>
                    </div>
                )) : <p>{t("HU04-noseencuentra")}</p>}
            </div>
        </div>
    );
}

export default ListaProdAgricolas;
