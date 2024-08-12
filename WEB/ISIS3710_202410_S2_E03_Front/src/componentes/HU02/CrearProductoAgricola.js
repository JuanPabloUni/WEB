import React, { useState } from "react";
import "./CrearProductoAgricola.css";
import logoImage from "../../assets/images/logoColombiarte_simple.png";
import usuarioimg from "../../assets/images/usuario.png";
import { useTranslation } from 'react-i18next';

function CrearProductoAgricola() {

    const { t } = useTranslation(["trad"]);

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleCrearProducto = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No hay token JWT. El usuario no está autenticado.');
                return;
            }
            const responseCreate = await fetch('http://localhost:4000/productos_agricolas', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    precio: precio,
                    cantidad: cantidad,
                    descripcion: descripcion,
                }),
            });
            if (responseCreate.ok) {
                const productoAgricola = await responseCreate.json();
                const usuario = JSON.parse(localStorage.getItem('usuario'));
                console.log(usuario.id);
                console.log(productoAgricola);
                const responseAsociacion = await fetch(`http://localhost:4000/usuario-productos_agricolas/${usuario.id}/productos-agricolas/${productoAgricola.id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (responseAsociacion.ok) {
                    alert('Producto agrícola creado exitosamente.');
                } else {
                    alert('Error al asociar el producto agricola con el agricultor')
                }
            } else {
                alert('Producto agrícola no fue creado correctamente.');
            }
        } catch (error) {
            console.error("Error al crear el producto agrícola:", error);
        }
    };    

    const token = localStorage.getItem('token');
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
        <h1 className="titulocrear">{t("HU02-nuevoproductoagricola")} </h1>
        <div className="creacion">
            <div className="campo">
                <label htmlFor="nombre">{t("HU01-nombre")}</label>
                <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={t("HU01-nombre")} />
            </div>
            <div className="campo">
                <label htmlFor="precio">{t("HU02-precio")}</label>
                <input type="text" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder={t("HU02-precio")} />
            </div>
            <div className="campo">
                <label htmlFor="cantidad">{t("HU02-disponibilidad")}</label>
                <input type="text" id="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder={t("HU02-disponibilidad")} />
            </div>
            <div className="campo-descripcion">
                <label htmlFor="descripcion">{t("HU02-descripcion")}</label>
                <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder={t("HU02-descripcion")}></textarea>
            </div>
            <div className="campo-upload-box">
                <label htmlFor="upload" className="upload-box">
                {t("HU03-nuevoinputimagen")}
                    <input type="file" id="upload" hidden />
                </label>
            </div>
        </div>

      <div className="fondo">
            <button onClick={handleCrearProducto}>{t("HU03-agregar")}</button>
      </div>
    </div>
    );
}

export default CrearProductoAgricola;