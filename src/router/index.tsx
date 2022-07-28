import { About } from "@/container/About";
import { Data } from "@/container/Data";
import { Home } from "@/container/Home/index";
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
];

export { routes };
