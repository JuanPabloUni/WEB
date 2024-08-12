import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./ProdAgricolasDetail.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from 'react-i18next';


function ProdArtesanosDetail() {

  const {t, i18n} = useTranslation(["trad"])

  let { idproducto } = useParams();

  let navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const id = idproducto

  const token = localStorage.getItem('token');
  
  const [productoAgricola, setProductoAgricola] = useState(null); // Estado para almacenar el producto agrícola
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la indicación de carga
  const [error, setError] = useState(null); // Estado para almacenar posibles errores

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [material, setMaterial] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(true);
  const [origen, setOrigen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('https://loremflickr.com/640/480');

  const fetchProductoAgricola = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/productos_agricolas/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProductoAgricola(data);
      setNombre(data.nombre)
      setPrecio(data.precio)
      setCantidad(data.cantidad)
      setMaterial(data.material)
      setDisponibilidad(data.disponibilidad)
      setOrigen(data.origen)
      setDescripcion(data.descripcion)
      setImagen(data.imagen)
    } catch (error) {
      setError('Failed to fetch producto agrícola: ' + error.message);
      console.error('There was an error!', error);
    }
    setIsLoading(false);
  };

    // Efecto para cargar el producto agrícola cuando el componente se monta o el id cambia
    useEffect(() => {
      fetchProductoAgricola();
    }, [id]); // Dependencia en id


  
    const handleEdit = async (event) => {
      event.preventDefault();
      const productoAgricola = { nombre: nombre, precio: parseFloat(precio), cantidad: parseInt(cantidad), material: material, disponibilidad: disponibilidad, origen: origen, descripcion: descripcion, imagen: imagen };
      const response = await fetch(`http://localhost:4000/productos_agricolas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productoAgricola),
      });
      if (response.status === 200){
          const responseData = await response.json();
          alert('Producto agrícola editado correctamente')
          navigate(`/ProdAgricolas`);
      }else{
          alert('Error al editar el producto agrícola')
      }
    };
  
  
const handleDelete = async () => {
  // Muestra un cuadro de diálogo de confirmación
  const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este elemento?");
  if (confirmDelete) {
    try {
      const response = await fetch(`http://localhost:4000/productos_agricolas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Producto agrícola eliminado con éxito");
      navigate(`/ProdAgricolas`);
    } catch (error) {
      console.error('Error al eliminar el producto agrícola:', error);
    }

  } else {
    // Si el usuario cancela, simplemente puedes hacer un return o mostrar un mensaje
  }
};

if (isLoading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
if (!productoAgricola) return <p>No se encontró el producto agrícola.</p>;

    if (!token) {
        alert('No hay token JWT. El usuario no está autenticado.');
        return;
    }

const usuario = JSON.parse(localStorage.getItem('usuario'));

  return (
        <div>
            <div className="userinfo">
                <img src={logoImage} alt="Logo de ColombiArte" className="logod"/>
                <p>{usuario.nombre}<img src={usuarioimg} alt="Logo de ColombiArte" className="iconusuario"/></p>
            </div>
          <h1 className="tituloeditar">{t("HU02-editarproductoagricola")}</h1>
         <div className="creacion">
    <div className="campo">
        <label htmlFor="nombre">{t("HU03-nuevoNombre")}</label>
        <input type="text" id="nombre" placeholder={t("HU03-nuevoNombre")} defaultValue={productoAgricola.nombre} onChange={e => setNombre(e.target.value)}/>
    </div>
    <div className="campo">
        <label htmlFor="precio">{t("HU03-nuevoPrecio")}</label>
        <input type="text" id="precio" placeholder={t("HU03-nuevoPrecio")} defaultValue={productoAgricola.precio} onChange={e => setPrecio(e.target.value)}/>
    </div>
    <div className="campo">
        <label htmlFor="cantidad">{t("HU03-nuevoCantidad")}</label>
        <input type="text" id="cantidad" placeholder={t("HU03-nuevoCantidad")} defaultValue={productoAgricola.cantidad} onChange={e => setCantidad(e.target.value)}/>
    </div>
    <div className="campo-descripcion">
        <label htmlFor="descripcion">{t("HU03-nuevoDescripcion")}</label>
        <textarea id="descripcion" placeholder={t("HU03-nuevoDescripcion")} defaultValue={productoAgricola.descripcion} onChange={e => setDescripcion(e.target.value)}></textarea>
    </div>
    <div className="campo-upload-box">
        <label htmlFor="upload" className="upload-box">
            {t("HU03-nuevoinputimagen")}
            <input type="file" id="upload" hidden />
        </label>
    </div>
</div>
          <div className="fondo">
                <button onClick={handleEdit} className="guardar">{t("HU03-GuardarCambios")}</button>
                <button onClick={handleDelete} className="eliminar">{t("HU03-Eliminar")}</button>
          </div>
        </div>
    );
  }


export default ProdArtesanosDetail;



/*
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./ProdAgricolasDetail.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from 'react-i18next';

function ProdAgricolasDetail() {

  const { t } = useTranslation(["trad"]);

  let { idproducto } = useParams();

  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    async function fetchProd() {
        const response = await fetch('https://raw.githubusercontent.com/sgoncalves13/RetoReact/main/productosAgricolas.json');
        const productsData = await response.json();
        productsData.forEach(product => {
            console.log(product.id);
            if(product.id == idproducto){
                setProduct(product);
            } 
        });
    }
    fetchProd();
}, [idproducto]);
  
const handleDelete = () => {
  // Muestra un cuadro de diálogo de confirmación
  const confirmDelete = window.confirm(t("HU04-confimarcioneliminar"));
  if (confirmDelete) {
    // Lógica para eliminar el elemento

  } else {
    // Si el usuario cancela, simplemente puedes hacer un return o mostrar un mensaje
  }
};

  if (product === null){
    return (<div>{t("HU02-HU02-cargando")}</div>)
  }
  else{
  return (
        <div>
            <div className="userinfo">
                <img src={logoImage} alt="Logo de ColombiArte" className="logod"/>
                <p>Jefferson Hernandez<img src={usuarioimg} alt="Logo de ColombiArte" className="iconusuario"/></p>
            </div>
            <h1 className="tituloeditar">{t("HU02-editarproductoagricola")}</h1>
            <div className="creacion">
                <div className="campo">
                    <label htmlFor="nombre">{t("HU01-nombre")}</label>
                    <input type="text" id="nombre" placeholder={t("HU01-nombre")} defaultValue={product.nombre}/>
                </div>
                <div className="campo">
                    <label htmlFor="precio">{t("HU02-precio")}</label>
                    <input type="text" id="precio" placeholder={t("HU02-precio")} defaultValue={product.precio}/>
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">{t("HU02-disponibilidad")}</label>
                    <input type="text" id="cantidad" placeholder={t("HU02-disponibilidad")} defaultValue={product.disponibilidad}/>
                </div>
                <div className="campo-descripcion">
                    <label htmlFor="descripcion">{t("HU02-descripcion")}</label>
                    <textarea id="descripcion" placeholder={t("HU02-descripcion")} defaultValue={product.descripcion}></textarea>
                </div>
                <div className="campo-upload-box">
                    <label htmlFor="upload" className="upload-box">
                    {t("HU03-nuevoinputimagen")}
                        <input type="file" id="upload" hidden />
                    </label>
                </div>
          </div>
          <div className="fondo">
                <button className="guardar">{t("HU03-GuardarCambios")}</button>
                <button onClick={handleDelete} className="eliminar">{t("HU03-Eliminar")}</button>
          </div>
      </div>
    );
  }
}

export default ProdAgricolasDetail;
*/