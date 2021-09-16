import React, { useState, Fragment} from 'react';
import PlayPoker from "../components/PlayPoker";

const InitPlayPoker = () => {

    const start = () => {

        if(jugadores && jugadores.jugador1 && jugadores.jugador2){            
            setInicioVisible(false);
        }else{
            alert("Por favor, ingrese los 2 jugadores.");
        }       
      };
    
      const [jugadores, setJugadores] = useState({
        jugador1: '',
        jugador2: ''
    });

    const [inicioVisible, setInicioVisible] = useState(true);
    
    const handleInputChange = (event) => {
        setJugadores({
            ...jugadores,
            [event.target.name] : event.target.value
        })
    }

    return (
            <div >
                <br></br><br></br>
                <div class="row">                
                    <div class="col-md-6 offset-md-3">
                        <div class="card text-center"  style={inicioVisible ? {} : { display: 'none' }}>
                            <div class="card-header">
                                <b>Jugadores</b>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div className="col-md-2">
                                    </div>
                                    <div className="col-md-3">
                                        <label>Nombre jugador 1:   </label>
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" placeholder="Jugador 1" className="form-control" onChange={handleInputChange} name="jugador1"></input>
                                    </div>
                                </div>
                                <br></br>
                                <div class="row">
                                    <div className="col-md-2">
                                    </div>
                                    <div className="col-md-3">
                                        <label>Nombre jugador 2:   </label>
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" placeholder="Jugador 2" className="form-control" onChange={handleInputChange} name="jugador2"></input>
                                    </div>
                                </div>
                                <br></br>
                                    <button onClick={start} className="btn btn-secondary">Comenzar</button>
                            </div>
                            <div class="card-footer text-muted">
                                
                            </div>
                        </div>
                    </div>
                </div>
                    <div style={inicioVisible?  { display: 'none' } : {}}>                    
                        {!inicioVisible ? <PlayPoker jugadores={jugadores}>
                            </PlayPoker>: null}
                    </div>
            </div>


    );
  };
  
  export default InitPlayPoker;
  