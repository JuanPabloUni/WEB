import React, { useState } from "react";
import logoImage from "../../assets/images/logo_colombiarte.png";
import "./Registro.css";
import { useTranslation } from 'react-i18next';

function Registro() {

    const { t } = useTranslation(["trad"]);
    
    const [nombreValue, setNombreValue] = useState(t("HU01-nombre"));
    const [apellidoValue, setApellidoValue] = useState(t("HU01-apellido"));
    const [correoValue, setCorreoValue] = useState(t("HU01-correo"));
    const [contraseñaValue, setContraseñaValue] = useState(t("HU01-clave"));
    const [rolValue, setRolValue] = useState(""); // Estado para el valor seleccionado del rol
    
    const handleClick = (event, setter, defaultValue) => {
        if (event.target.value === defaultValue) {
            setter(event.target.innerText = "");
        }
    };

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
    };
    
    const handleInputBlur = (event, defaultValue, setter) => {
        if (event.target.value === '') {
            setter(defaultValue);
        }
    };
    
    const handleRegistro = async () => {
        try {
            const response = await fetch('http://localhost:4000/usuarios', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    nombre: nombreValue,
                    apellido: apellidoValue,
                    correo: correoValue,
                    contraseña: contraseñaValue,
                    rol: rolValue
                })
            });

            if (response.status === 201) {
              const data = await response.json();
              alert(`Usuario ${data.rol} creado exitosamente!`);
            } else {
              alert("No se pudo crear el usuario correctamente");
            }
        } catch (error) {
            alert('Error:', error);
        }
    };

    return (
        <div>
            <section className="Registrar-seccion">

                <div className="Registrar-logo">
                    <img src={logoImage} alt="Logo de ColombiArte"/>
                </div>

                <div className="Registrar-titulo">
                    <h1>{t("HU01-nuevousuario")}</h1>
                </div>

                <div className="Registrar-inputs">
                  <div className="row">
                    <input 
                      type="text"
                      aria-label={t("HU01-nombre")} 
                      placeholder={nombreValue}
                      onClick={(event) => handleClick(event, setNombreValue, t("HU01-nombre"))}
                      onChange={(event) => handleInputChange(event, setNombreValue, false)} 
                      onBlur={(event) => handleInputBlur(event, t("HU01-nombre"), setNombreValue)} 
                    />
                    <input 
                      type="text"
                      aria-label={t("HU01-apellido")}  
                      placeholder={apellidoValue}
                      onClick={(event) => handleClick(event, setApellidoValue, t("HU01-apellido"))}
                      onChange={(event) => handleInputChange(event, setApellidoValue, true)} 
                      onBlur={(event) => handleInputBlur(event, t("HU01-apellido"), setApellidoValue)} 
                    />
                  </div>
                  <div className="row">
                    <input 
                      type="text" 
                      aria-label={t("HU01-correo")}  
                      placeholder={correoValue}
                      onClick={(event) => handleClick(event, setCorreoValue, t("HU01-correo"))}
                      onChange={(event) => handleInputChange(event, setCorreoValue, false)} 
                      onBlur={(event) => handleInputBlur(event, t("HU01-correo"), setCorreoValue)} 
                    />
                    <input 
                      type="text"
                      aria-label={t("HU01-clave")} 
                      placeholder={contraseñaValue}
                      onClick={(event) => handleClick(event, setContraseñaValue, t("HU01-clave"))}
                      onChange={(event) => handleInputChange(event, setContraseñaValue, true)} 
                      onBlur={(event) => handleInputBlur(event, t("HU01-clave"), setContraseñaValue)} 
                    />
                  </div>
                  <div className="row">
                    <select 
                      aria-label={t("HU01-rol")}
                      value={rolValue}
                      onChange={(event) => setRolValue(event.target.value)}
                    >
                      <option value="visitante">{t("HU01-rol-visitante")}</option>
                      <option value="agricultor">{t("HU01-rol-agricultor")}</option>
                      <option value="artesano">{t("HU01-rol-artesano")}</option>
                    </select>
                  </div>
                </div>

                <div className="Registrar-boton">
                    <button onClick={handleRegistro}>{t("HU01-registrar")}</button>
                </div>

                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
                <div className="wave wave4"></div>
            </section>
        </div>
    );
}

export default Registro;