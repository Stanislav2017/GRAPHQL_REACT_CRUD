import React, { useEffect, useState } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_GENRE, GET_GENRES } from "../queries/genre";
import { CREATE_GENRE, REMOVE_GENRE, UPDATE_GENRE } from "../mutations/genre";
import IUpdateGenre from "../interfaces/IUpdateGenre";

const GenrePage: React.FunctionComponent<IPage> = ({ name }) => {
  const { data, loading, error, refetch } = useQuery(GET_GENRES);
  const [getGenere] = useLazyQuery(GET_GENRE);
  const [createGenre] = useMutation(CREATE_GENRE);
  const [updateGenre] = useMutation(UPDATE_GENRE);
  const [removeGenre] = useMutation(REMOVE_GENRE);

  const defaultEntity: { id?: number; title: string } = { title: "" };

  const [entity, setEntity] = useState(defaultEntity);
  const [isCreate, setIsCreate] = useState(true);
  const [genres, setGenres] = useState([]);

  const clearInput = () => setEntity(defaultEntity);

  function create() {
    createGenre({ variables: { input: entity } }).then(() => {
      clearInput();
      refetch();
    });
  }

  function update() {
    updateGenre({ variables: { input: entity } })
      .then(() => {
        clearInput();
        setIsCreate(true);
        refetch();
      })
      .catch((e) => console.error);
  }

  function edit(id: number) {
    setIsCreate(false);
    getGenere({ variables: { id } })
      .then(({ data }) =>
        setEntity((prev) => ({ ...prev, title: data.getGenre.title, id }))
      )
      .catch((e: any) => console.error(e));
  }

  function remove(id: number) {
    removeGenre({ variables: { id } }).then(() => refetch());
  }

  function cancelUpdate() {
    clearInput();
    setIsCreate(true);
  }

  useEffect(() => {
    if (!loading) {
      setGenres(data.getGenres);
    }
  }, [data, loading]);

  useEffect(() => {
    logging.info(`Loading ${name}`);
    if (!loading) {
      setGenres(data.getGenres);
    }
  }, [data, loading, name]);

  return (
    <div className="row align-items-center">
      <div className="col">
        <h2 className="d-flex flex-content-center">
          {isCreate ? "Create" : "Update"} Genre
        </h2>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            value={entity.title}
            onChange={(e) =>
              setEntity((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        {isCreate && (
          <>
            <button
              onClick={create}
              type="button"
              className="btn btn-primary btn-block"
            >
              Create Genre
            </button>
          </>
        )}
        {!isCreate && (
          <>
            <button
              onClick={update}
              type="button"
              className="btn btn-primary btn-block"
            >
              Update Genre
            </button>
            <button
              onClick={cancelUpdate}
              type="button"
              className="btn btn-danger btn-block"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      <div className="col">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <th colSpan={4}>
                  <div>Error! Something happend!</div>
                </th>
              </tr>
            )}
            {loading && (
              <tr>
                <th colSpan={4}>
                  <div>Loading...</div>
                </th>
              </tr>
            )}
            {!genres.length && (
              <tr>
                <th colSpan={4}>
                  <div>Genres not found!</div>
                </th>
              </tr>
            )}
            {!error &&
              !loading &&
              genres.map((v: IUpdateGenre, i: number) => {
                return (
                  <tr key={i}>
                    <th scope="row">{v.id}</th>
                    <td>{v.title}</td>
                    <td className="d-flex justify-content-end">
                      <button
                        onClick={() => edit(v.id)}
                        className="btn btn-warning"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => remove(v.id)}
                        className="btn btn-danger"
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenrePage;
