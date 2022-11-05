import { AuthForm } from "../../components/auth-form/auth-form";
import { HomePage } from "../../components/home/home";

export const routes = [
  {
    route: '/',
    Component: HomePage
  },
  {
    route: '/sign-in',
    Component: () => <> <AuthForm header="Sign In" buttonText="Sign In"/> </>
  },
  {
    route: '/sign-up',
    Component: () => <> <AuthForm header="Join us!" buttonText="Sign Up"/> </>
  }
]