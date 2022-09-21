import React, { Component } from "react";
import "./Card.css";
import axios from "axios";
import imagen from "./imagen2.jpg";

class Card extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "Agumon",
      img:"https://digimon.shadowsmith.com/img/agumon.jpg" ,
      level: "Rookie",
    };
  }

  clickeado = async () => {
    let nombreDigimon = "";
    nombreDigimon = document.querySelector("#inputBusqueda").value;
    console.log(nombreDigimon);
    try {
      const resultado = await axios.get(
        `https://digimon-api.vercel.app/api/digimon/name/${nombreDigimon}`
      );
      const data = resultado.data[0];
      this.setState({ nombre: data.name, img: data.img, level: data.level });
    } catch {
        this.setState({ nombre: 'Digimon no encontrado', img: imagen, level: 'No data' })
    }
    document.querySelector("#inputBusqueda").value = "";
  };
  render() {
    return (
      <div className="cartaContainer" id="divContainerCarta">
        <div className="divBusqueda">
          <input
            type="text"
            id="inputBusqueda"
            placeholder="Buscar un digimon"
          />
          <button onClick={this.clickeado} className="btnBuscar">
            {" "}
            Buscar
          </button>
        </div>
        <div className="divInfo">
          <img src={this.state.img} className="imagenDigimon"></img>
          <h2>{this.state.nombre}</h2>
          <p>Level: {this.state.level}</p>
        </div>
      </div>
    );
  }
}
export default Card;
