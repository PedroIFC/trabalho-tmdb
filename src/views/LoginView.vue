<template>
    <section class="login-section">
      <div class="login-container">
        <h2>Entrar na Sua Conta</h2>
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div class="input-group">
            <label for="password">Senha</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit" class="login-btn">Entrar</button>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
        <p class="forgot-password">
          <a href="#">Esqueceu sua senha?</a>
        </p>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'  // Importando o router
  import { useAuthStore } from '@/stores/auth'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const authStore = useAuthStore()
  const router = useRouter()  // Criando uma instância do router
  
  const handleSubmit = async () => {
    try {
      error.value = '' // Limpar qualquer erro anterior
      await authStore.login(email.value, password.value)
      console.log('Login bem-sucedido!')
  
      // Redireciona o usuário para a página "/filmes" após login bem-sucedido
      router.push('/filmes')
    } catch (err) {
      error.value = err.message // Exibe a mensagem de erro no login
      console.error('Erro ao fazer login:', err.message)
    }
  }
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', sans-serif;
  }
  
  .all {
    background-color: #2C343F;
    width: 100%;
    height: 94.9vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  body {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #fff;
  }
  
  .login-section {
    justify-items: center;
    justify-content: center;
    display: flex;
    width: 100%;
    max-width: 380px;
    background: #2c3e50;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    border-radius: 15px;
    padding: 40px;
    backdrop-filter: blur(10px);
  }
  
  .login-container h2 {
    font-size: 26px;
    margin-bottom: 25px;
    color: #ecf0f1;
    text-align: center;
    font-weight: 500;
  }
  
  .input-group {
    margin-bottom: 25px;
  }
  
  .input-group label {
    display: block;
    font-size: 14px;
    color: #bdc3c7;
    margin-bottom: 8px;
  }
  
  .input-group input {
    width: 100%;
    padding: 16px;
    font-size: 16px;
    border: 2px solid #34495e;
    border-radius: 8px;
    background-color: #34495e;
    color: #ecf0f1;
    transition: border-color 0.3s ease, background-color 0.3s ease;
  }
  
  .input-group input:focus {
    border-color: #1abc9c;
    background-color: #3b4b5d;
    outline: none;
  }
  
  .login-btn {
    width: 100%;
    padding: 16px;
    background: #1abc9c;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
  }
  
  .login-btn:hover {
    background: #16a085;
    transform: translateY(-2px);
  }
  
  .forgot-password {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }
  
  .forgot-password a {
    color: #1abc9c;
    text-decoration: none;
    font-weight: 600;
  }
  
  .forgot-password a:hover {
    color: #16a085;
  }
  
  .error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
  }
  </style>
  