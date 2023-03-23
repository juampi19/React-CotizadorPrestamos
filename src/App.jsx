import { Button } from "./components/Button";
import { Header } from "./components/Header"
import { useState, useEffect } from 'react';
import {calcularTotalPagar, formatearDinero} from './helpers'

function App() {

  const [ cantidad, setCantidad ] = useState( 10000 );
  const [ meses, setMeses ] = useState( 6 );
  const [ total, setTotal ] = useState( 0 );
  const [ subtotal, setSubtotal ] = useState(0);

  useEffect( () => {
    //Calcular el Total a pagar
    setTotal( calcularTotalPagar( cantidad, meses ) );

  }, [cantidad, meses ] );

  useEffect(() => {
     //Calcular el pago mensual
     setSubtotal( total / meses );
  }, [ total ]);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  const handleChange = ( e ) => {
    setCantidad( +e.target.value );
  }

  const handleClickAdd = ( e ) => {

    if( cantidad >= MAX ) return;

    setCantidad( cantidad + STEP );

  }

  const handleClickSubtract = ( e ) => {

    if( cantidad <= MIN ) return;

    setCantidad( cantidad - STEP );

  }

  const handleChangeMeses = (e) => {
    setMeses( +e.target.value )
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />

      <div className="flex justify-between my-6">

        <Button 
          tipo={'-'}
          handle={ handleClickSubtract }
        />

        <Button 
          tipo={'+'}
          handle={ handleClickAdd }
        />

      </div>

      <input 
        type="range"
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={ handleChange }
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />

      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
        { formatearDinero( cantidad ) }
      </p>


      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span className="text-indigo-600">Plazo </span> a pagar
      </h2>

      <select
        className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500"
        value={meses}
        onChange={ handleChangeMeses }
      >
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

      <div className="my-5 space-y-3 bg-gray-100 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span className="text-indigo-600">de Pagos</span> 
        </h2>

        <p className="text-gray-500 text-center font-bold">{ meses } Meses</p>
        <p className="text-gray-500 text-center font-bold">{formatearDinero( total )} Total a Pagar</p>
        <p className="text-gray-500 text-center font-bold">{formatearDinero( subtotal )} Pagos mensuales</p>

      </div>

    </div>
  )
}

export default App
