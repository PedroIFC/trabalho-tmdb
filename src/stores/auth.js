import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)

  const login = async (email, password) => {
    // Simulação de um processo de autenticação
    if (email === 'adm@adm.com' && password === '1234') {
      user.value = { email }
      isAuthenticated.value = true
      localStorage.setItem('isAuthenticated', true) // Persistência no localStorage
      localStorage.setItem('user', JSON.stringify(user.value))
    } else {
      throw new Error('Credenciais inválidas')
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
  }
})
