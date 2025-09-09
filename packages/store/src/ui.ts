import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Theme = "light" | "dark"
type UiState = { theme: Theme }

const initialState: UiState = { theme: "dark" } 

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setTheme: (s, a: PayloadAction<Theme>) => { s.theme = a.payload },
        toggleTheme: (s) => { s.theme = s.theme === "dark" ? "light" : "dark" }
    }
})

export default uiSlice.reducer
export const { setTheme, toggleTheme } = uiSlice.actions
export const selectTheme = (r: any): Theme => (r as any).ui.theme
