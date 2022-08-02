import { About } from "@/container/About";
import { Account } from "@/container/Account";
import { Data } from "@/container/Data";
import { Detail } from "@/container/Detail";
import { Home } from "@/container/Home/index";
import { Login } from "@/container/Login";
import { User } from "@/container/User";
import { UserInfo } from "@/container/UserInfo";

const root_path = "book-keeper-website";

const routes = [
  {
    path: root_path + "/",
    component: Home,
  },
  {
    path: root_path + "/about",
    component: About,
  },
  {
    path: root_path + "/data",
    component: Data,
  },
  {
    path: root_path + "/user",
    component: User,
  },
  {
    path: root_path + "/login",
    component: Login,
  },
  {
    path: root_path + "/detail",
    component: Detail,
  },
  {
    path: root_path + "/userinfo",
    component: UserInfo,
  },
  {
    path: root_path + "/account",
    component: Account,
  },
];

export { routes };
