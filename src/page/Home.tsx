import { Container } from "@mui/system"
import SimpleTodos from "../components/ListTodos"
import { useGetTodosQuery } from "../store/redusers/todoApi"

const Home = () => {

  const { data } = useGetTodosQuery()

  return (
    <Container>
      <SimpleTodos
        title="Todo"
        todos={data}
      />
    </Container>
  )
}

export default Home