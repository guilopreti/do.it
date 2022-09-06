import { AnimationContainer, Background, Container, Content } from "./styles";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const Login = ({ authenticated, setAuthenticated }) => {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email Obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo de 8 digitos")
      .required("Senha Obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmit = (data) => {
    api
      .post("/user/login", data)
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("@Doit:token", JSON.stringify(token));
        localStorage.setItem("@Doit:user", JSON.stringify(user));
        setAuthenticated(true);
        return history.push("/dashboard");
      })
      .catch((_) => toast.error("Email ou senha inválidos"));
  };

  if (authenticated) {
    return <Redirect to={"/dashboard"} />;
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>

            <Input
              register={register}
              name="email"
              icon={FiMail}
              label="Email"
              placeholder="Seu email"
              error={errors.email?.message}
            />
            <Input
              register={register}
              name="password"
              icon={FiLock}
              label="Senha"
              placeholder="Sua senha"
              type="password"
              error={errors.password?.message}
            />

            <Button type="submit">Logar</Button>
            <p>
              Não tem uma conta? Faça seu <Link to={"/signup"}>cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
