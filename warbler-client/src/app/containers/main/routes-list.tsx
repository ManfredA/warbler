import { AuthForm } from "../../components/auth-form/auth-form";
import { HomePage } from "../../components/home/home";
import { MessageForm } from "../message-form/message-form";

export const routes = [
  {
    route: '/',
    Component: HomePage,
    isPrivate: true
  },
  {
    route: '/sign-in',
    Component: () => <> <AuthForm header="Sign In" buttonText="Sign In" /> </>
  },
  {
    route: '/sign-up',
    Component: () => <> <AuthForm header="Join us!" buttonText="Sign Up" /> </>
  }
  ,
  {
    route: '/users/:userId/messages/new',
    Component: () => <> <MessageForm /> </>,
    isPrivate: true
  }
]