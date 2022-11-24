import { Request, Response } from 'express';
import axios from 'axios';

exports.getPeople = (req: Request, res: Response) => {
  const page = req.query?.page || 1;
  const url = `https://swapi.dev/api/people/?page=${page}`;

  // Configuración para la petición
  const requestConfig = {
    method: 'get',
    url,
    headers: {
      'Content-Type': ' application/json'
    }
  };

  axios(requestConfig)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res
        .status(error?.response?.status || 500)
        .json(error?.response?.data || {});
    });
};
