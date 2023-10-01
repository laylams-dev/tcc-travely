<template>
  <the-layout :hasSideMenu="false">
    <div class="login-content">
      <a-typography-title>
        <span class="login-content-title">
          <LoginOutlined class="login-content-title-icon" />
          <span>Fazer login</span>
        </span>
      </a-typography-title>
      <a-card class="login-content-card">
        <a-form
          :model="formState"
          :rules="rules"
          layout="vertical"
          name="travely-login"
          scrollToFirstError
          @finish="submitForm"
          @finishFailed="onFinishFailed"
          @validate="(name: FormField, isValid: boolean) => updateFormValidity(name, isValid)"
        >
          <a-form-item label="E-mail" name="email">
            <a-input v-model:value="formState.email" size="large">
              <template #prefix>
                <MailOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item label="Password" name="password">
            <a-input-password v-model:value="formState.password" size="large">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-form-item name="rememberMe" no-style>
              <a-checkbox v-model:checked="formState.rememberMe">Remember me</a-checkbox>
            </a-form-item>
            <!-- <a class="login-form-forgot" href="">Esqueceu a senha</a> -->
          </a-form-item>

          <a-form-item>
            <a-button
              :disabled="disabled"
              type="primary"
              size="large"
              html-type="submit"
              class="login-form-button"
            >
              Log in
            </a-button>
            <!-- Ou
            <a href="">Criar uma conta</a> -->
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </the-layout>
</template>

<script setup lang="ts">
import { LoginOutlined } from '@ant-design/icons-vue'
import TheLayout from '@/components/Layout/TheLayout.vue'
import { reactive, computed } from 'vue'
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { Rule } from 'ant-design-vue/es/form'

interface FormState {
  email: string
  password: string
  rememberMe: boolean
}

type FormField = 'email' | 'password'

const formState = reactive<FormState>({
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

function submitForm(values: any): void {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const disabled = computed(() => {
  return !(formState.email && formState.password) || !formValid.email || !formValid.password
})
</script>

<style scoped>
.login-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 50vw;
  margin: 0 auto;
}

.login-content-title {
  display: inline-flex;
}

.login-content-title-icon {
  margin-right: 0.75rem;
  font-size: 1.5rem;
}

.login-form-button {
  width: 100%;
}
</style>
