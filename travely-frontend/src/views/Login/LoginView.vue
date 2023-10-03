<template>
  <the-layout :hasSideMenu="false">
    <div class="login-content">
      <a-typography-title> Fazer login </a-typography-title>
      <a-card class="login-content-card">
        <a-form
          :model="formState"
          :rules="rules"
          layout="vertical"
          name="travely-login"
          scroll-to-first-error
          @validate="(name: FormField, isValid: boolean) => updateFormValidity(name, isValid)"
        >
          <a-form-item label="E-mail" name="email">
            <a-input v-model:value="formState.email" size="large">
              <template #prefix>
                <MailOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="Senha" name="password">
            <a-input-password v-model:value="formState.password" size="large">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-form-item name="rememberMe" no-style>
              <a-checkbox v-model:checked="formState.rememberMe">Manter-me conectado</a-checkbox>
            </a-form-item>
            <!-- <a class="login-form-forgot" href="">Esqueceu a senha</a> -->
          </a-form-item>

          <a-form-item>
            <a-button
              :disabled="disabled"
              class="login-form-buttons"
              html-type="submit"
              size="large"
              type="primary"
              @click="submitForm"
            >
              Log in
            </a-button>
            <a-divider>Ou</a-divider>
            <!-- Ou -->
            <a-button class="login-form-buttons" size="large" @click="goToCreateAccount">
              Criar uma conta
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </the-layout>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue'
import TheLayout from '@/components/Layout/TheLayout.vue'
import UserService from '@/services/UserService'

import type { Rule } from 'ant-design-vue/es/form'
import { type LoginRequest } from '@/types/UserTypes.d'

type FormField = 'email' | 'password'

const formState = reactive<LoginRequest>({
  email: '',
  password: '',
  rememberMe: false
})

const formValid = reactive({
  email: false,
  password: false,
  rememberMe: true
})

const rules: Record<string, Rule[]> = {
  email: [
    { required: true, message: 'Insira seu e-mail cadastrado', trigger: 'blur' },
    { type: 'email', message: 'Insira seu e-mail cadastrado', trigger: 'blur' }
  ],
  password: [{ required: true, message: 'Insira sua senha' }]
}

function updateFormValidity(name: FormField, isValid: boolean): void {
  formValid[name] = isValid
}

const router = useRouter()

async function submitForm(): Promise<void> {
  try {
    await UserService.login(formState)
    router.push({ name: 'home' })
  } catch (err) {
    message.error('E-mail e senha inválidos', 5)
  }
}

const disabled = computed(() => {
  return !(formState.email && formState.password) || !formValid.email || !formValid.password
})

function goToCreateAccount(): void {
  router.push({ name: 'createAccount' })
}
</script>

<style scoped src="./LoginView.css" />
