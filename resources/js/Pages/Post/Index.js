import React from "react";
import { InertiaLink, usePage, useForm } from "@inertiajs/inertia-react";
import Layout from '@/Shared/Layout';
import RowTable from '@/Shared/RowTable';
import Modal from 'react-modal';
import Portfolio from '@/Components/Portfolio';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#app');

const Index = () => {
    let subtitle;
    const { posts, portfolios, sum, anual, mensual } = usePage().props;
    const { postsData } = posts;
    console.log(portfolios)
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = () =>{
      setIsOpen(true);
    }
  
    const afterOpenModal = () => {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    const closeModal = () => {
      setIsOpen(false);
    }

    const { data, setData, errors, post } = useForm({
      title: "",
      description: "",
  });

    function handleSubmit(e) {
      e.preventDefault();
      post(route("posts.store"));
  }

    return (
        <div>
            <table style={{ width: '100%'}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PLAZO</th>
                        <th>INVERSIÓN</th>
                        <th>PLAN</th>
                        <th>RENDIMIENTO</th>
                        <th><span className="sr-only">Delete</span></th>
                    </tr>
                  </thead>
                  <tbody>
                  {portfolios.map((i) => (
                    <Portfolio key={i.id} id={i.id} amount={i.amount} type={i.type}/>
                  )
                  )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2">
                        <div className="bg-opacity-60 bg-white w-full h-10 flex items-center justify-center border border-gray-300 rounded">
                            <span>Suma de inversiones:</span>
                          </div>
                      </td>
                      <td>
                        <div className="bg-opacity-60 bg-white w-full h-10 flex items-center justify-center border border-gray-300 rounded">
                          <span>$ {Number(sum).toFixed(2)}</span>
                        </div>
                      </td>
                      <td>
                        <div className="bg-opacity-60 bg-white w-full h-10 flex items-center justify-center border border-gray-300 rounded">
                            <span>Tus ganancias:</span>
                        </div>
                      </td>
                      <td>
                        <div className="bg-opacity-60 bg-white w-full h-10 flex items-center justify-center border border-gray-300 rounded">
                          <span>$ {portfolios.reduce(function(prev, arr) { 
                      // return the sum with previous value
                      const type = arr.type === 1 ? mensual : anual;
                      return prev + arr.amount * type/100;
                      // set initial value as 0
                        },0).toFixed(2)}</span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
            </table>
            <div>
            {portfolios.map((i) => (
                    <div key={i.id}>
                        <h1>{i.amount}</h1>
                    </div>
                  )
                  )}
            </div>
            <h1 className="mb-8 text-3xl font-bold">Posts</h1>
            <div className="flex items-center justify-between mb-6">
              <InertiaLink
                className="btn-indigo focus:outline-none"
                href={route('organizations.create')}
              >
                <span>Create</span>
                <span className="hidden md:inline"> Organization</span>
              </InertiaLink>
            </div>
            <button onClick={openModal}>Open Modal</button>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(({ id, reference, amount}) => (
                    <RowTable key={id} id={id} title={reference} description={amount} />
                  )
                  )}  
                  </tbody>
              </table>
            </div>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form name="createForm" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <label className="">Title</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.title}
                                </span>
                            </div>
                            <div className="mb-0">
                                <label className="">Description</label>
                                <textarea
                                    type="text"
                                    className="w-full rounded"
                                    label="description"
                                    name="description"
                                    errors={errors.description}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                <span className="text-red-600">
                                    {errors.description}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </form>
              </Modal>
        </div>
    );
};

Index.layout = page => <Layout title="Posts" children={page} />;


export default Index;