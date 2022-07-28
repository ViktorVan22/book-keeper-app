import { About } from "@/container/About";
import { Data } from "@/container/Data";
import { Home } from "@/container/Home/index";
import { Login } from "@/container/Login";
import { User } from "@/container/User";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/data",
    component: Data,
  },
  {
    path: "/user",
    component: User,
  },
  {
    path: "/login",
    component: Login,
  },
];

export { routes };
