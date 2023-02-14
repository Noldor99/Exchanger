import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITodos } from '../../models/models';



export const todoApi = createApi({
  reducerPath: 'todo/api',
  tagTypes: ['todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63e4093e4474903105e57490.mockapi.io/api/v1/'
  }),
  refetchOnFocus: false,
  endpoints: build => ({
    getTodos: build.query<ITodos[], void>({
      query: () => ({
        url: `todosUser`,
        method: 'GET'
      }),
      providesTags: ['todos']
    }),
    addTodos: build.mutation<ITodos[], void>({
      //@ts-ignore
      query: () => ({
        url: `todosUser`,
        method: 'POST',
        body: { "title": "simple", "completed": false }
      }),
      invalidatesTags: ['todos']
    }),
    putTodos: build.mutation<ITodos[], any>({
      //@ts-ignore
      query: (obj) => ({
        url: `todosUser/${obj.id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj.body)
      }),
      invalidatesTags: ['todos']
    }),
    deleteTodos: build.mutation<ITodos[], number>({
      query: (id) => ({
        url: `todosUser/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['todos']
    }),
  })
})

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useDeleteTodosMutation,
  usePutTodosMutation
} = todoApi