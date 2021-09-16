import React, { useState, useEffect} from 'react';
import { Image } from "react-bootstrap";
import { FaPlayCircle } from 'react-icons/fa';

const PlayPoker = (props) => {

    const [idJuego, setIdJuego] = useState();
    const [mostrarBtnPlay, setMostrarBtnPlay] = useState(true);
    const [mensajeGanador, setMensajeGanador] = useState("");
  
    var valoresSuit = [
        {
            suit: "SPADES",
            valor: 3
        },
        {
            suit: "DIAMONDS",
            valor: 2
        },
        {
            suit: "CLUBS",
            valor: 1
        },
        {
            suit: "HEARTS",
            valor: 4
        }
    ];

    var opcionadasVacias = [
        {carta:"https://i.ibb.co/fF8VQLL/The-back-of-a-single-playing-card-on-white-with-shadow-and-clipping-path-to-remove-shadow.jpg"},
        {carta:"https://i.ibb.co/fF8VQLL/The-back-of-a-single-playing-card-on-white-with-shadow-and-clipping-path-to-remove-shadow.jpg"}
    ]
    
    const [cartasJug1, setCartasJug1] = useState([]);
    const [cartasJug2, setCartasJug2] = useState([]);

    const [cartasOpcionadasJug1, setCartasOpcionadasJug1] = useState([]);
    const [cartasOpcionadasJug2, setCartasOpcionadasJug2] = useState([]);

    useEffect(() => {
        fetch('http://deckofcardsapi.com/api/deck/new/')
        .then(res => res.json())
        .then((data) => {
            setIdJuego(data.deck_id);
            play(data.deck_id,true);
        })
        .catch(console.log)       
      }, []);

    useEffect(() => {
        //Se revisan las repetidas del jugador 1
        var hashJ1 = {};
        var repetidaJ1 = cartasJug1.filter(function(current) {
            var existsJ1 = hashJ1[current.value];
            hashJ1[current.value] = true;
            return existsJ1;
        });

        var cartasRepetidasJ1 = [];
        if(repetidaJ1 != null && repetidaJ1[0] != null){
            cartasRepetidasJ1 = cartasJug1.filter(function(current) {
                if(current.value == repetidaJ1[0].value){
                return current;
                };
                });
                setCartasOpcionadasJug1(cartasRepetidasJ1);
        }
        //Se revisan las repetidas del jugador 2 
        var hashJ2 = {};
            var repetidaJ2 = cartasJug2.filter(function(current) {
                var existsJ2 = hashJ2[current.value];
                hashJ2[current.value] = true;
                return existsJ2;
            });

        var cartasRepetidasJ2 = [];
        if(repetidaJ2 != null && repetidaJ2[0] != null){
            cartasRepetidasJ2 = cartasJug2.filter(function(current) {
                if(current.value == repetidaJ2[0].value){
                return current;
                };
                });
                setCartasOpcionadasJug2(cartasRepetidasJ2);
        }    
        //Se revisa si hay empate 
        if((repetidaJ1 != null && repetidaJ1[0] != null) && (repetidaJ2 != null && repetidaJ2[0] != null)){

            //Suma puntos por pinta jugador 1
            var puntosJ1 = 0;
            valoresSuit.filter(function(valor) {
                if(valor.suit == (cartasRepetidasJ1[0].suit  || cartasRepetidasJ1[1].suit)){
                    puntosJ1 = puntosJ1 + valor.valor;
                };
            });
            //Suma puntos por pinta jugador 2
            var puntosJ2 = 0;
            valoresSuit.filter(function(valor) {
                if(valor.suit == (cartasRepetidasJ2[0].suit  || cartasRepetidasJ2[1].suit)){
                    puntosJ2 = puntosJ2 + valor.valor;
                };
            });

            if(puntosJ1 == puntosJ2){
                setMensajeGanador("¡Es un empate! ¿Que tal si lo vuelven a intentar?");
            }else if(puntosJ1 > puntosJ2){
                setMensajeGanador("Felicidades " + props.jugadores.jugador1 + ". ¡Ganaste!");
            }else{
                setMensajeGanador("Felicidades " + props.jugadores.jugador2 + ". ¡Ganaste!");
            }
            setMostrarBtnPlay(false);
        }else{
            if(repetidaJ1 != null && repetidaJ1[0] != null) {
                //Gano el uno
                setMensajeGanador("Felicidades " + props.jugadores.jugador1 + ". ¡Ganaste!");
                setMostrarBtnPlay(false);

            }else if(repetidaJ2 != null && repetidaJ2[0] != null){
                //Gano el dos 
                setMensajeGanador("Felicidades " + props.jugadores.jugador2 + ". ¡Ganaste!");
                setMostrarBtnPlay(false);
            }
        }
    }, [cartasJug2]);

      const play = (id, esPrimerVez) => {

        if(!esPrimerVez){
            id = idJuego;
        }
        fetch('http://deckofcardsapi.com/api/deck/'+id+'/draw/?count=2')
        .then(res => res.json())
        .then((data) => {
            var carta1 = {
                carta:data.cards[0].image,
                value:data.cards[0].value,
                suit:data.cards[0].suit
            };
            var carta2 = {
                carta:data.cards[1].image,
                value:data.cards[1].value,
                suit:data.cards[1].suit
            };
            setCartasJug1([
                ...cartasJug1,
                carta1                
            ])
            setCartasJug2([
                ...cartasJug2,
                carta2
            ])
            
        })
        .catch(console.log)

        //Barajar
        fetch('http://deckofcardsapi.com/api/deck/'+id+'/shuffle/')
        .then(res => res.json())
        .then((data) => {            
        })
        .catch(console.log)

      };     

      const resetPlay= () => {
        window.location.reload();
      }
    
    return (       
            <div>   
                <div class="row">
                <div class="col-md-6 offset-md-4">
                    <h1>{mensajeGanador}</h1>
                    <br></br> <br></br>
                 </div>
                </div>
                <div class="row">
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-3">
                            <h4>Jugador 1: {props && props.jugadores ? props.jugadores.jugador1 : "-"}</h4>
                        </div>
                            {mostrarBtnPlay ?<div className="col-md-2 offset-md-1"><button type="button"  onClick={play} class="btn btn-info btn-circle"><FaPlayCircle/></button></div>: null}   
                            {!mostrarBtnPlay ? <div className="col-md-3"><button type="button"  onClick={resetPlay} class="btn btn-info"><FaPlayCircle/>¡Jugar de nuevo!</button></div>: null}  
                        
                        <div className="col-md-2">
                            <h4>Jugador 2: {props && props.jugadores ? props.jugadores.jugador2 : "-"}</h4>
                        </div>
                        <div className="col-md-2">
                        </div>
                    </div>   

                    <div class="row">
                        <div className="col-md-6">
                            <div class="row">
                                <div name="opcionadasJug1" class="col-md-8 offset-md-3">
                                    <h6>Cartas Opcionadas</h6>
                                    
                                    {
                                        cartasOpcionadasJug1.length>0 ?
                                        cartasOpcionadasJug1.map((carta) => (
                                            <img src={carta.carta}></img>                            
                                            ))
                                        :
                                        opcionadasVacias.map((carta) => (                                            
                                                 <img src={carta.carta}></img>    
                                        ))  
                                    }  
                                </div>
                            </div>
                            <div class="row">
                                <div name="obtenidasJug1">
                                    <h6>Cartas Obtenidas</h6>                            
                                    {cartasJug1.map((carta) => (
                                    <img src={carta.carta}></img>                                
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="row">
                                <div name="opcionadasJug2" class="col-md-8 offset-md-3">
                                    <h6>Cartas Opcionadas</h6>
                                    {
                                        cartasOpcionadasJug2.length>0 ?
                                        cartasOpcionadasJug2.map((carta) => (
                                            <img src={carta.carta}></img>                            
                                            ))
                                        :
                                        opcionadasVacias.map((carta) => (
                                        <img src={carta.carta}></img>                            
                                        ))  
                                    }
                                </div>
                            </div>
                            <div class="row">
                                <div name="obtenidasJug2">
                                    <h6>Cartas Obtenidas</h6>
                                    {cartasJug2.map((carta) => (
                                    <img src={carta.carta}></img>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>     
                                   
                   
         </div>       
    );
  };
  
  export default PlayPoker;
  