<template>
  <the-layout :hasSideMenu="false">
    <a-card class="create-account-content-card">
      <a-typography-title> Criar conta </a-typography-title>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        layout="vertical"
        name="travely-create-account"
        scroll-to-first-error
        @validate="(name: FormField, isValid: boolean) => updateFormValidity(name, isValid)"
      >
        <a-form-item has-feedback label="E-mail" name="email">
          <a-input v-model:value="formState.email" size="large">
            <template #prefix>
              <MailOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item has-feedback label="Digite sua senha" name="password">
          <a-input-password
            v-model:value="formState.password"
            size="large"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="Confirme sua senha" name="checkPassword">
          <a-input-password
            v-model:value="formState.checkPassword"
            size="large"
            type="password"
            autocomplete="off"
          />
        </a-form-item>
        <ul class="password-validation-list">
          <li
            :class="passwordValidationList.mustBeEqual.class"
            :style="passwordValidationList.mustBeEqual.style"
          >
            As senhas devem ser iguais
          </li>
          <li
            :class="passwordValidationList.mustHaveOneNumber.class"
            :style="passwordValidationList.mustHaveOneNumber.style"
          >
            A senha deve conter pelo menos um número
          </li>
          <li
            :class="passwordValidationList.mustHaveOneUppercaseLetter.class"
            :style="passwordValidationList.mustHaveOneUppercaseLetter.style"
          >
            A senha deve conter pelo menos uma letra maiúscula
          </li>
          <li
            :class="passwordValidationList.minLength.class"
            :style="passwordValidationList.minLength.style"
          >
            A senha deve ter no mínimo 8 caracteres
          </li>
        </ul>

        <a-form-item class="create-account-agree-spacing">
          <a-checkbox v-model:checked="formState.agreeWithTerms"
            >Concordo com a abertura de conta no sistema Travely</a-checkbox
          >
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disableCreateAccount"
            :loading="creatingAccount"
            class="login-form-buttons"
            html-type="submit"
            size="large"
            type="primary"
            @click="createAccount"
          >
            Criar conta
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </the-layout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message, theme } from 'ant-design-vue'
import TheLayout from '@/components/Layout/TheLayout.vue'
import { MailOutlined } from '@ant-design/icons-vue'
import UserService from '@/services/UserService'

import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'
import { type CreateAccountRequest } from '@/types/UserTypes.d'

type FormField = 'email' | 'password' | 'checkPassword'

const formState = reactive<CreateAccountRequest>({
  email: '',
  password: '',
  checkPassword: '',
  agreeWithTerms: false
})

const formValid = reactive({
  email: false,
  password: false,
  checkPassword: false
})

const formRef = ref<FormInstance>()

const validateCheckPassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Por favor, confirme sua senha')
  } else if (value !== formState.password) {
    return Promise.reject('')
  } else {
    return Promise.resolve()
  }
}

const validatePassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Por favor, insira uma senha válida')
  } else {
    if (formState.password.length < 8 || formState.password.length > 20) {
      return Promise.reject('A senha deve ter no máximo 20 caracteres')
    }
    if (!/[0-9]/.test(formState.password)) {
      return Promise.reject()
    }
    if (!/[A-Z]/.test(formState.password)) {
      return Promise.reject()
    }
    if (formState.checkPassword !== '') {
      formRef.value?.validateFields('checkPassword')
    }
    return Promise.resolve()
  }
}

const rules: Record<string, Rule[]> = {
  email: [
    { required: true, message: 'Por favor, insira um e-mail válido', trigger: 'blur' },
    { type: 'email', message: 'Por favor, insira um e-mail válido', trigger: 'blur' },
    {
      max: 255,
      message: 'O e-mail deve ter no máximo 255 caracteres',
      trigger: 'blur'
    }
  ],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
  checkPassword: [{ required: true, validator: validateCheckPassword, trigger: 'blur' }]
}

function updateFormValidity(name: FormField, isValid: boolean): void {
  formValid[name] = isValid
}

const { useToken } = theme
const { token } = useToken()

const passwordValidationList = computed(() => {
  const mustBeEqual =
    formState.password.length > 0 &&
    formState.checkPassword.length > 0 &&
    formState.password === formState.checkPassword
  const mustHaveOneNumber = /[0-9]/.test(formState.password)
  const mustHaveOneUppercaseLetter = /[A-Z]/.test(formState.password)
  const minLength = formState.password.length >= 8

  return {
    mustBeEqual: {
      value: mustBeEqual,
      class: mustBeEqual ? 'password-requirement-checked' : '',
      style: mustBeEqual ? { color: token.value.colorSuccess } : ''
    },
    mustHaveOneNumber: {
      value: mustHaveOneNumber,
      class: mustHaveOneNumber ? 'password-requirement-checked' : '',
      style: mustHaveOneNumber ? { color: token.value.colorSuccess } : ''
    },
    mustHaveOneUppercaseLetter: {
      value: mustHaveOneUppercaseLetter,
      class: mustHaveOneUppercaseLetter ? 'password-requirement-checked' : '',
      style: mustHaveOneUppercaseLetter ? { color: token.value.colorSuccess } : ''
    },
    minLength: {
      value: minLength,
      class: minLength ? 'password-requirement-checked' : '',
      style: minLength ? { color: token.value.colorSuccess } : ''
    }
  }
})

const disableCreateAccount = computed(() => {
  return Object.values(formValid).some((value) => !value) || !formState.agreeWithTerms
})

const router = useRouter()
const creatingAccount = ref(false)

async function createAccount(): Promise<void> {
  creatingAccount.value = true
  try {
    await UserService.createAccount(formState)
    message.success('Tudo certo! Você será direcionado para fazer login')
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1000)
  } catch (err) {
    message.error('Algo inesperado aconteceu. Por favor, tente novamente')
  } finally {
    creatingAccount.value = false
  }
}
</script>

<style scoped src="./CreateAccountView.css" />
