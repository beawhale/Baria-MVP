import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import localForage from "localforage"
import auth from "./auth"
import chat from "./chat"
import ui from "./ui"

const rootReducer = combineReducers({ auth, chat, ui })

export function createWebAppStore() {
    const persistConfig = {
        key: "BARIA-MVP",
        storage: localForage,
        whitelist: ["auth", "chat", "ui"]
    }
    const store = configureStore({
        reducer: persistReducer(persistConfig, rootReducer),
        middleware: (getDefault) =>
            getDefault({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } })
    })
    const persistor = persistStore(store as any)
    return { store, persistor }
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createWebAppStore>["store"]
export type AppDispatch = AppStore["dispatch"]
