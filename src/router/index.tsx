import { About } from "../container/About";
import { Home } from "../container/Home/index";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
];

export { routes };
