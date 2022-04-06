import React, { useEffect, useState } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { GET_FILM, GET_FILMS } from "../queries/film";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_FILM, REMOVE_FILM, UPDATE_FILM } from "../mutations/film";
import { GET_GENRES } from "../queries/genre";
import IUpdateFilm from "../interfaces/IUpdateFilm";
import IUpdateGenre from "../interfaces/IUpdateGenre";
import IFilm from "../interfaces/IFilm";

const FilmPage: React.FunctionComponent<IPage> = ({ name }) => {
  const {
    data: filmList,
    loading: filmLoading,
    error: filmError,
    refetch: filmRefetch,
  } = useQuery(GET_FILMS);
  const {
    data: genreList,
    loading: genreLoading,
    error: genreError,
    refetch: genreRefetch,
  } = useQuery(GET_GENRES);
  const [getFilm] = useLazyQuery(GET_FILM);
  const [createFilm] = useMutation(CREATE_FILM);
  const [updateFilm] = useMutation(UPDATE_FILM);
  const [removeFilm] = useMutation(REMOVE_FILM);

  const [genres, setGenres] = useState([]);
  const [films, setFilms] = useState([]);

  const defaultEntity: {
    id?: number;
    title: string;
    description: string;
    genreIds: Array<number>;
  } = {
    title: "",
    description: "",
    genreIds: [],
  };

  const [entity, setEntity] = useState(defaultEntity);
  const [isCreate, setIsCreate] = useState(true);
  const clearInput = () =>
    setEntity((prev: any) => ({ ...prev, ...defaultEntity }));

  function cancelUpdate() {
    clearInput();
    setIsCreate(true);
  }

  useEffect(() => {
    logging.info(`Loading ${name}`);
    if (!filmLoading) {
      setFilms(filmList.getFilms);
    }
    if (!genreLoading) {
      setGenres(genreList.getGenres);
    }
  }, [filmLoading, filmList, genreLoading, genreList]);

  function create() {
    createFilm({ variables: { input: entity } })
      .then(() => {
        clearInput();
        filmRefetch();
      })
      .catch((e) => console.error);
  }

  function update() {
    setIsCreate(true);
    updateFilm({ variables: { input: entity } })
      .then(() => {
        clearInput();
        filmRefetch();
      })
      .catch((e) => console.error);
  }

  function edit(id: number) {
    setIsCreate(false);
    getFilm({ variables: { id } })
      .then(({ data }) => {
        const { title, description, genres } = data.getFilm;
        setEntity((prev) => ({
          ...prev,
          title,
          id,
          description,
          genreIds: genres.map((v: any) => v.id),
        }));
      })
      .catch((e: any) => console.error(e));
  }

  function remove(id: number) {
    removeFilm({ variables: { id } })
      .then(() => filmRefetch())
      .catch((e) => console.error);
  }

  return (
    <div className="row align-items-center">
      <div className="col">
        <h2 className="d-flex flex-content-center">
          {isCreate ? "Create" : "Update"} Film
        </h2>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={entity.title}
            onChange={(e) =>
              setEntity((data) => ({
                ...data,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            name="description"
            value={entity.description}
            onChange={(e) =>
              setEntity((data) => ({
                ...data,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Film</label>
          <select
            name="genreIds"
            onChange={(e) =>
              setEntity((data) => ({
                ...data,
                [e.target.name]: Array.from(
                  e.target.selectedOptions,
                  (option: any) => +option.value
                ),
              }))
            }
            multiple
            className="form-control"
          >
            {genres.map((v: IUpdateGenre, i: number) => {
              return (
                <option
                  value={v.id}
                  key={i}
                  selected={entity.genreIds.includes(v.id)}
                >
                  {v.title}
                </option>
              );
            })}
          </select>
        </div>
        {isCreate && (
          <>
            <button
              onClick={create}
              type="button"
              className="btn btn-primary btn-block"
            >
              Create Film
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
              Update Film
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
              <th scope="col">Description</th>
              <th scope="col">Genres</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {!films.length && (
              <tr>
                <th colSpan={4}>
                  <div>Films not found!</div>
                </th>
              </tr>
            )}
            {films.map((v: IFilm, i: number) => {
              return (
                <tr key={i}>
                  <th scope="row">{v.id}</th>
                  <td>{v.title}</td>
                  <td>{v.description}</td>
                  <td>[{v.genres.map((v) => v.title).join(", ")}]</td>
                  <td className="d-flex justify-content-end">
                    <button
                      onClick={(e) => edit(v.id)}
                      className="btn btn-warning"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={(e) => remove(v.id)}
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

export default FilmPage;
