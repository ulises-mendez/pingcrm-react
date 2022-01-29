import { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import TextInput from '@/Shared/TextInput';
import LoadingButton from '@/Shared/LoadingButton';


const Row = (props) => {
  const { errors } = usePage().props
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    amount: ''
  })

  const message = Object.hasOwn(errors,'amount'+ props.id) ? 'error' : '';
  const [amount,setAmount] = useState('');
  const toggle = () =>{
    setIsOpen(!isOpen);
  }
  function handleSubmit() {
    /*
    e.preventDefault();*/
    Inertia.post(route('portfolio.store'),amount,{
      errorBag: 'amount'+ props.id,
    })
    
  }
  /*
  const { data, setData, errors, post, processing } = useForm({
    title: 'seTitle',
    user_id: 4,
    project_id: props.id,
    amount: '',
    client:''
  });*/
  const hasError = 'true';

  return (
    <>
    <tr>
    <td>{props.title}</td>
    <td>{props.description}</td>
    <td>
        <TextInput
          className="w-full pb-8 pr-6 lg:w-1/2"
          label="Cantidad"
          name="amount"
          errors={message}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
    </td>
    <td>
      <LoadingButton
              className="btn-indigo"
              onClick={() => handleSubmit()}
            >
              Submit
            </LoadingButton>
    </td>
    </tr>
    <tr style={{ display: isOpen == true ? 'block' : 'none' }}>
      <td><p>Show pannel</p></td>
    </tr>
    </>
  )
}

export default Row;