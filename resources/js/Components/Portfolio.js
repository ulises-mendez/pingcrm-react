import { useState, useEffect } from "react";
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import TextInput from '@/Shared/TextInput';
import { set } from "lodash";
export default (props) =>{
  const { errors, anual, mensual } = usePage().props;
  const [amount,setAmount] = useState(props.amount);
  const [type, setType] = useState(props.type);
  const typeProfit = props.type === 1 ? mensual : anual;
  const gains = props.amount * typeProfit/100;
  const [profit,setProfit] = useState(gains);
  //const [message, setMessage] = useState('');

  const update = () =>{
    Inertia.put(route('portfolio.update', props.id),{
      amount: amount,
      type: type,
      project_id: props.id,
    },{
      errorBag: 'project'+ props.id,
    })
  }
  console.log(errors)
  const amountChange = (e) => {
    setAmount(e.target.value);
    Inertia.put(route('portfolio.update', props.id),{
      amount: e.target.value,
      type: type,
      project_id: props.id,
    },{
      errorBag: 'project'+ props.id,
    })
    }
  const typeChange = (e) => {
    setType(e.target.value);
    const profit = e.target.value == 1? mensual : anual;
    const gains = amount * profit/100;
    setProfit(gains)
    Inertia.put(route('portfolio.update', props.id),{
      amount: amount,
      type: e.target.value,
      project_id: props.id,
    },{
      errorBag: 'type'+ props.id,
    })
    }

    const deletePortfolio = () => {
        Inertia.delete(route('portfolio.destroy', props.id));
        //Inertia.reload({ only: ['portfolios','sum'] })
    }

    const message = Object.hasOwn(errors,'project'+ props.id) ? Object.values(errors)[0].amount : 
                    amount != props.amount ? 'Actualiza la cantidad de inversión' : '';
    //const sessionError = Object.hasOwn(errors,'project'+ props.id) ? Object.values(errors) : [{amount:''}];
    // console.log(sessionError[0].amount)
    /*
    useEffect(() => {
      if(amount > props.amount){
        setMessage('Cantidad supera el saldo')
      }
      if(Object.hasOwn(errors,'project'+ props.id)){
        setMessage('Saldo insuficiente')
      }else{
        setMessage('')
      }
      // const message = Object.hasOwn(errors,'project'+ props.id) ? 'Saldo insuficiente' : amount > props.amount ? 'Declara una cantidad disponible' : '';
    },);*/
  return(
    <tr>
    <td>
      <div className="bg-opacity-60 bg-white w-full h-10 flex items-center justify-center border border-gray-300 rounded">
         <span>PROJECT{props.id}</span>
      </div>
    </td>
    <td>
      <div className="bg-opacity-60 bg-white w-full h-10 flex items-center justify-center border border-gray-300 rounded">
         <span>12 M</span>
      </div>
    </td>
    <td className="relative">
    <TextInput errors={message} value={amount} onChange={(e) => amountChange(e)} type="number" min="1000" step="100" className="w-full"></TextInput>
    </td>
    <td>
    <select onChange={(e) => typeChange(e)} defaultValue={type} name="type" id="type1" className="form-select">
        <option value="1" >MENSUAL</option>
        <option value="2" >ANUAL</option>
      </select>
    </td>
    <td>
      <div className="bg-opacity-60 bg-white w-full h-10 flex items-center justify-center border border-gray-300 rounded">
         <span>$ {profit.toFixed(2)}</span>
      </div>
    </td>
    <td  style={{ width: '10px'}}>
      <button onClick={() => deletePortfolio()} className="bg-none text-gray-500 hover:text-red-500 mx-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </td>
</tr>
  )
}