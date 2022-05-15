export type ActionType = RemoveTodoListACType


export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListID:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListID
        }
    } as const

}