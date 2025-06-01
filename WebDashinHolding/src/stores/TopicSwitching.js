import {ref, watchEffect} from "vue";

const key = '__theme__';
const theme = ref(localStorage.getItem(key) || 'light');
watchEffect(() => {
    document.documentElement.dataset.theme = theme.value;
})
export const useTheme = () => {
    return {
        theme,
        toggleTheme() {
            theme.value = theme.value === 'light' ? 'dark' : 'light';
            localStorage.setItem(key, theme.value);
        }
    }
}
