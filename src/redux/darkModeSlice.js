import { createSlice } from '@reduxjs/toolkit'
function addBodyClass() {
    document.documentElement.classList.add('dark')
}
function removeBodyClass() {
    document.documentElement.classList.remove('dark')
}
function togglebodyClass(){
    document.documentElement.classList.toggle('dark')
}
export const darkModeSlice = createSlice({
    name: 'dm',
    initialState: {
        darkModeBool: false
    },
    reducers: {
        darkModeToggle: (state) => {
            state.darkModeBool = !state.darkModeBool
            togglebodyClass()
            localStorage.setItem('darkMode', state.darkModeBool)
        },
        onLoadInit: (state) => {
            state.darkModeBool = localStorage.getItem('darkMode') === 'true'
            if (state.darkModeBool) addBodyClass()
            if (!state.darkModeBool) removeBodyClass()
        }

    }
})

export const { darkModeToggle, onLoadInit } = darkModeSlice.actions
export default darkModeSlice.reducer