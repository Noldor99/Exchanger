import { FC } from 'react'
import { List, Typography } from '@mui/material';
import { ITodos } from '../models/models';
import TodoItem from './TodoItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAddTodosMutation } from '../store/redusers/todoApi';

interface TodosProps {
  title: string,
  todos?: ITodos[]
}

const ListTodos: FC<TodosProps> = ({ title, todos }: TodosProps) => {

  const [addTodo] = useAddTodosMutation()

  return (
    <>
      <Typography variant="h4" textAlign='center'>{title}</Typography>
      <List dense sx={{
        width: '100%', maxWidth: 360, bgcolor: 'background.paper',
        margin: '0 auto'
      }}>
        {todos?.map(item => (
          <TodoItem
            key={item.id}
            item={item}
          />
        ))}
        <AddCircleOutlineIcon
          sx={{
            "&:hover": {
              color: "#b0a72bcc",
            },
            margin: '0 auto',
            display: 'block'
          }}
          onClick={() => addTodo()} />
      </List>
    </>
  )
}

export default ListTodos