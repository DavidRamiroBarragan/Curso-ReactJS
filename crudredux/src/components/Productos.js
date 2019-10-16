import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comenzarDescargaProductosAction } from '../actions/productos.actions';
import Producto from './Producto';

export default function Productos() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(comenzarDescargaProductosAction());
  }, [dispatch]);

  const isFetching = useSelector(({ productos: { loading } }) => loading);
  const productos = useSelector(({ productos: { productos } }) => productos);
  const error = useSelector(({ productos: { error } }) => error);

  return (
    <React.Fragment>
      {error && (
        <p className='font-weight-bold alert alert-danger text-center mt-4'>
          Hubo un error...
        </p>
      )}
      <h2 className='text-center my-5'>Listado de Productos</h2>

      <table className='table table-striped'>
        <thead className='bg-primary table-dark'>
          <tr>
            <th scope='col'>Nombre</th>
            <th scope='col'>Precio</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </tbody>
      </table>
      {isFetching && 'Cargando...'}
    </React.Fragment>
  );
}
