<template>
<div class="reservation-container ">
    <div class="reservation-container-column">
        <div class="summary-card">
            <h2>Resumo</h2>
            <div class="reservation-data-row">
                <div class="reservation-item">
                    <strong>Check-in</strong>
                    <span class="reservation-item-data">{{ formatedDateFrom }}</span>
                </div>
                <div class="reservation-item">
                    <strong>Check-in</strong>
                    <span class="reservation-item-data">{{ formatedDateTo }}</span>
                </div>
                <div class="reservation-item">
                    <strong>Hóspedes</strong>
                    <span class="reservation-item-data">{{ quantityOfPeople }} adultos</span>
                </div>
            </div>
            <a-button 
                class="edit-reservation-button" 
                type="primary"
                @click="goToHome"
            >
                Editar
            </a-button>
        </div>

        <div :class="isCreditCardMethodOpen ? 'accordion-opened' : 'accordion-closed'">
            <div class='reservation-data-row' >
                <h3>Cartão de crédito</h3>
                <Tooltip title="Expandir informações">
                    <Button 
                        type="dashed" 
                        shape="circle" 
                        :icon="h(CaretDownOutlined)" 
                        @click="openPaymentMethodAccordion('credit-card')"
                    />
                </Tooltip>
            </div>
            <div v-if="isCreditCardMethodOpen" class="flex-column">
                <a-space direction="vertical">
                    CPF
                    <a-input 
                        v-model:value.lazy="customerCPF" 
                        type="number" 
                        autofocus 
                        placeholder="Insira seu CPF"  
                        :status="getCpfValidationStatus"
                    />
                    <span>Número do cartão</span>
                    <a-input 
                        v-model:value.lazy="customerCardNumber" 
                        type="number" 
                        autofocus 
                        placeholder="Insira o número do cartão"  
                    />
                    <div class="flex-row">
                        <div>
                            <span>Validade</span>
                            <a-input 
                                v-model:value.lazy="customerCardVenc" 
                                type="number" 
                                autofocus 
                                placeholder="Insira a validade"  
                            />
                        </div>
                        <div class="flex-column">
                            <span>Número de segurança</span>
                        <a-input 
                            v-model:value.lazy="customerCardSecurityNumber" 
                            type="number" 
                            style="width: 15rem;"
                            autofocus 
                            placeholder="Insira o cód. de segurança"  
                        />
                        </div>
                    </div>
                </a-space>
            </div>
        </div>
        <div :class="isPixOpbMethodOpen ? 'accordion-opened' : 'accordion-closed'">
            <div class='reservation-data-row'>
            <h3>Pix via Open Finance</h3>
            <Tooltip title="Expandir informações">
                <Button 
                    type="dashed" 
                    shape="circle" 
                    :icon="h(CaretDownOutlined)" 
                    @click="openPaymentMethodAccordion('pix-opb')"
                />
            </Tooltip>
            </div>
            <div v-if="isPixOpbMethodOpen" class="flex-column">
                <a-space direction="vertical">
                    CPF
                    <a-input 
                        v-model:value.lazy="customerCPF" 
                        type="number" 
                        autofocus 
                        placeholder="Insira seu CPF"  
                        :status="getCpfValidationStatus"
                    />
                    <br/><span>Instituição</span>
                    <a-select
                    ref="select"
                    v-model:value="selectedBankOption"
                    placeholder="Selecione..."
                    style="width: 34vw"
                    @focus="focus"
                    @change="handleChange"
                    >
                        <a-select-option value="jack">Efí Pay</a-select-option>
                    </a-select>
                    <a-button 
                        style="margin-left: 28vw; 
                        margin-top: 0.4rem;" 
                        :disabled="!customerCPF || !selectedBankOption"
                        type="primary"
                        @click="goToFeedback"
                        >
                        Prosseguir
                    </a-button>
                </a-space>
            </div>
        </div>
    </div>
   
    <div class="info-card">
        <div class="flex-column">
            <div class="flex-row">
            <img
            class="home-welcome-carousel-img"
            :src="Room1"
            alt="Imagem da piscina da pousada Travely"
          />
          <div class="flex-column">
            <strong>Suite Single Standard</strong>
            ★★★★
          </div>
        </div>
        <h3 class="mt-2">Informações de preço</h3>
        <div class="reservation-amount-row">
            <div class="flex-column">
            <span>R$ 620,00 x {{ daysOnReserve }} noites</span>
            <span class="mt-1">Taxa de serviço</span>
        </div>
        <div class="flex-column">
            <strong>R$ {{ subtotal }}</strong>
            <strong class="mt-1">R$ {{ admTax }}</strong>
        </div>
        </div>
        <a-divider class="mt-2" />
        <div class="reservation-amount-row">
            <h3>Total</h3>
            <h3>R$ {{ totalAmount }},00</h3>
        </div>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import { ref, h, computed } from 'vue'
import Room1 from '@/assets/public/quarto-1.jpg'
import { Button, Tooltip } from 'ant-design-vue';
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { useReservationStore } from '@/stores/reservationStore'
import { useRouter } from 'vue-router'

const isCreditCardMethodOpen = ref(false);
const isBilletMethodOpen = ref(false);
const isPixOpbMethodOpen = ref(false);

const useReservation = useReservationStore()

function onDateFormat(dataString: string): string {
  const data = new Date(dataString);
  const day = data.getDate().toString().padStart(2, '0');
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear();
  return `${day}/${month}/${year}`;
}

const formatedDateTo = ref(onDateFormat(useReservation.dateTo));
const formatedDateFrom = ref(onDateFormat(useReservation.dateFrom));

console.log(formatedDateFrom, formatedDateTo);

const openPaymentMethodAccordion = (type: String) => {
    if(type === 'credit-card') isCreditCardMethodOpen.value = !isCreditCardMethodOpen.value;
    if(type === 'billet') isBilletMethodOpen.value = !isBilletMethodOpen.value;
    if(type === 'pix-opb') isPixOpbMethodOpen.value = !isPixOpbMethodOpen.value;
};

function getDay(dataString: string): number {
  const dateParts = dataString.split('/');
  if (dateParts.length === 3) {
    const day = parseInt(dateParts[0]);
    return day;
  } else {
    return 0;
  }
};

const daysOnReserve: number = Number(getDay(formatedDateTo.value) - Number(getDay(formatedDateFrom.value)));

const quantityOfPeople = ref(useReservation.quantity);

const customerCPF = ref();

const focus = () => {
  console.log('focus');
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const selectedBankOption = ref();

function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let divisionRest = (sum * 10) % 11;
  if (divisionRest === 10 || divisionRest === 11) {
    divisionRest = 0;
  }
  if (divisionRest !== parseInt(cpf.charAt(9))) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  divisionRest = (sum * 10) % 11;
  if (divisionRest === 10 || divisionRest === 11) {
    divisionRest = 0;
  }
  if (divisionRest !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}


const getCpfValidationStatus = () => {
    if (customerCPF.value.length && validateCPF(customerCPF.value)) return '';
    return 'error';
};

const customerCardSecurityNumber = ref();
const customerCardVenc = ref();
const customerCardNumber = ref();


const router = useRouter()

const goToHome = () => {
    router.push({
      name: 'home'
    })
};

const roomValue = ref(620);
const admTax = ref('179,00');
const subtotal = ref(`${daysOnReserve * roomValue.value},00`);

const totalAmount = computed(()=> {
const total = parseInt(subtotal.value) + parseInt(admTax.value);
return `${total}`;
});

const goToFeedback = () => {
    window.open('https://app.sejaefi.com.br/pix/fazer-pix');
    router.push({
      name: 'reservation-feedback',
      query: {
        subtotal: subtotal.value,
        totalAmount: totalAmount.value,
      }
    })
}

</script>
<style scoped src="./ReservationConfirmStep.css" />