import { Box, Checkbox, debounce, Input, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { FC } from 'react'
import { ITodos } from '../models/models'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTodosMutation, usePutTodosMutation } from '../store/redusers/todoApi';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

interface TodoItemProps {
  item: ITodos
}

const TodoItem: FC<TodoItemProps> = ({ item }: TodoItemProps) => {

  const [checked, setChecked] = React.useState(item.completed);
  const [todoTitle, setTodoTitle] = React.useState(item.title);
  const [edit, setEdit] = React.useState(false);



  const [deleteTodo] = useDeleteTodosMutation()
  const [putTodo] = usePutTodosMutation()

  const clickDelete = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked)

    const todo = {
      title: item.title,
      completed: e.target.checked
    }
    putTodo({ id: item.id, body: todo })
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateTitleValue = React.useCallback(
    debounce((todo) => {
      console.log("dd")
      putTodo({ id: item.id, body: todo })
    }, 321), []
  )

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value)
    const todo = {
      title: e.target.value,
      completed: checked
    }
    updateTitleValue(todo)
  }

  return (
    <ListItem
      disablePadding
    >
      <Checkbox
        edge="start"
        onChange={clickDelete}
        checked={checked}
      />
      <ListItemButton
        onClick={() => setEdit(true)}
      >
        {edit ?
          <Box>
            <Input
              value={todoTitle}
              onChange={onChangeInput}

            />
            <TaskAltIcon onClick={(e) => {
              e.stopPropagation()
              setEdit(!edit)
            }} />
          </Box>
          : <ListItemText primary={item.title}
            onClick={() => setEdit(!edit)}
          />
        }
      </ListItemButton>
      <DeleteIcon
        sx={{
          "&:hover": {
            color: "#b0a72bcc",
          },
          color: "#551aa8"
        }}
        onClick={() => deleteTodo(item.id)}
      />
    </ListItem>
  )
}

export default TodoItem