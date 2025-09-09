import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type User = { id: string; name: string; email: string }
type State = { token?: string; user?: User }
const initial: State = {}
const slice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    signIn: (s: State, a: PayloadAction<{ token: string; user: User }>) => { s.token = a.payload.token; s.user = a.payload.user },
    signOut: (s: State) => { s.token = undefined; s.user = undefined }
  }
})
export default slice.reducer
export const { signIn, signOut } = slice.actions
export const selectIsAuthed = (r: any) => Boolean((r as any).auth?.token)
