import IRoute from "../interfaces/route";
import FilmPage from "../pages/film";
import GenrePage from "../pages/genge";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Films Page",
    component: FilmPage,
  },
  {
    path: "/genre",
    name: "Genre Page",
    component: GenrePage,
  },
];

export default routes;
