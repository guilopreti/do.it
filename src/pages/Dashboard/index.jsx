import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import Input from "../../components/Input";
import { Container, InputContainer, TaskContainer } from "./styles";
import { FiEdit2 } from "react-icons/fi";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const Dashboard = ({ authenticated, setAuthenticated }) => {
  const [tasks, setTasks] = useState([]);

  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token")) || ""
  );
  const { register, handleSubmit } = useForm();

  const loadTasks = () => {
    api
      .get("/task", {
        headers: { Authorization: `Bearer ${token}` },
        params: { completed: false },
      })
      .then((resp) => {
        const apiTasks = resp.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTasks(apiTasks);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const leave = () => {
    localStorage.clear();
    setAuthenticated(false);
  };

  const onSubmit = ({ task }) => {
    if (!task) {
      return toast.error("Complete o campo para enviar uma tarefa");
    }

    api
      .post(
        "/task",
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => loadTasks());
  };

  const handleCompleted = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);
    api
      .put(
        `/task/${id}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => setTasks(newTasks));
  };

  if (!authenticated) {
    return <Redirect to={"/login"} />;
  }

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>
          {new Date().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </time>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova tarefa"
            register={register}
            name="task"
          />
          <Button type="submit">Adicionar</Button>
          <Button type="button" className="leave-button" onClick={leave}>
            Sair
          </Button>
        </section>
      </InputContainer>
      <TaskContainer>
        {tasks.map((task) => (
          <Card
            key={task._id}
            title={task.description}
            date={task.createdAt}
            onClick={() => handleCompleted(task._id)}
          />
        ))}
      </TaskContainer>
    </Container>
  );
};

export default Dashboard;
