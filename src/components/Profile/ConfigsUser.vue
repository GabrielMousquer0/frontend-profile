<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store';
import { runMutation, negativeNotify, positiveNotify } from '../../helpers';
import EditUser from '../../schemas/mutation/EditUser.gql';
import EditPassword from '../../schemas/mutation/EditPassword.gql';

const store = useUserStore();
const router = useRouter();
const pswVisibility = ref(false);
const scrollAreaRef = ref(false);
const usernameEdit = ref(store.getUser.username);
const emailEdit = ref(store.getUser.email);
const status = reactive({
  username: false,
  email: false,
  password: false,
});
const password = reactive({
  current: '',
  new: '',
  confirm: '',
});
const value = {
  true: {
    icon: 'visibility',
    type: 'text',
  },
  false: {
    icon: 'visibility_off',
    type: 'password',
  },
};

function iconValue() {
  pswVisibility.value = !pswVisibility.value;
}

const config = computed(() => value[pswVisibility.value]);
async function saveUsername(id, username) {
  try {
    await runMutation(EditUser, {
      id,
      input: {
        username
      }
    });
    return positiveNotify(`Nome do usuario alterado para: ${username}`);
  } catch {
    return negativeNotify('Um erro ocorreu ao fazer a mudança do nome do usuario!');
  }
}
async function saveEmail(id, email) {
  try {
    await runMutation(EditUser, {
      id,
      input: {
        email
      }
    });
    return positiveNotify(`E-mail alterado para: ${email}`);
  } catch {
    return negativeNotify('Um erro ocorreu ao fazer a mudança do E-mail!');
  }
}
async function savePassword(id, password) {
  if (!password)
    return negativeNotify('Preencha o campo');
  try {
    await runMutation(EditPassword, {password, id });
    return positiveNotify(`Senha alterada para: ${password}`);
  } catch {
    return negativeNotify('Um erro ocorreu ao fazer a mudança de senha');
  }
}


const verifyButtonUsername = computed(() => {
  if(!usernameEdit.value.trim() || usernameEdit.value.trim() == store.getUser.username.trim()) {
    return !status.username;
  }
  return status.username;
});
const verifyButtonEmail = computed(() => {
  if(!emailEdit.value.trim() || emailEdit.value.trim() === store.getUser.email.trim()) {
    return !status.email;
  }
  return status.email;
});
const verifyButtonPassword = computed(() => {
  if(!password.current.trim() || !password.new.trim() || password.new.trim() !== password.confirm.trim()) {
    return !status.password;
  } 
  return status.password;
});
function scroll(position) {
  scrollAreaRef.value.setScrollPosition('vertical', position, 200);
}
</script>

<template>
  <div class="q-pa-md">
    <q-btn 
      label="voltar"
      icon="chevron_left"
      color="primary"
      @click="router.push({ name: 'ProfileUser', params: { id: store.getUser.id } })"
    />
  </div>
  <div class="q-pa-md">
    <q-card class=" no-box-shadow self-center q-pa-md q-mb-md">
      <span class="text-h4">Gerenciamento<br>de conta</span>
      <q-card-section class="row">
        <span class="text-subtitle1">Aqui você pode configurar as informações<br> pessoais da sua conta!</span>
        <q-card-section class="row">
          <q-card-section>
            <q-btn 
              color="primary" 
              icon="badge"
              label="Usuário"
              @click="scroll(0)"
            />
          </q-card-section>
          <q-card-section>
            <q-btn 
              color="primary" 
              icon="mail"
              label="e-mail"
              @click="scroll(300)"
            />
          </q-card-section>
          <q-card-section>
            <q-btn 
              color="primary" 
              icon="lock"
              label="Senha"
              @click="scroll(600)"
            />
          </q-card-section>
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-scroll-area 
      ref="scrollAreaRef" 
      class="scroll-area full-width"
    >
      <div class="card-config row q-mb-xl">
        <q-card
          class="user no-border-radius no-box-shadow bg-info col-4 col-md-6"
        >
          <q-card-section>
            <span class="text-h4"><q-icon name="badge" /> Nome do Usuário</span>
          </q-card-section>
          <q-card-section>
            <span class="text-subtitle1">O nome de usuário serve para você ser identificado por outros usuarios, sem necessariamente ser chamado pelo id ou seu e-mail</span>
          </q-card-section>
        </q-card>
        <q-card class="no-border-radius no-box-shadow bg-dark col-4 col-md-6">
          <q-card-section class="row q-mb-xl">
            <q-input
              class="input-size"
              outlined
              counter
              maxlength="20"
              label="Nome do usuário"
              v-model="usernameEdit"
            />
          </q-card-section>
          <q-card-section class="row justify-end">
            <q-btn 
              label="Salvar"
              icon="save"
              color="primary"
              @click="saveUsername(store.getUser.id, usernameEdit)"
              :disable="verifyButtonUsername"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="card-config row q-mb-xl">
        <q-card class="email no-border-radius no-box-shadow bg-info col-4 col-md-6">
          <q-card-section>
            <span class="text-h4"><q-icon name="mail" /> E-mail</span>
          </q-card-section>
          <q-card-section>
            <span class="text-subtitle1">Essa informação é particular e não será compartilhada com outras pessoas.</span>
          </q-card-section>
        </q-card>
        <q-card class="no-border-radius no-box-shadow bg-dark col-4 col-md-6">
          <q-card-section class="row q-mb-xl">
            <q-input
              class="input-size"
              outlined
              counter
              maxlength="20"
              label="E-mail"
              v-model="emailEdit"
            />
          </q-card-section>
          <q-card-section class="row justify-end">
            <q-btn 
              label="Salvar"
              icon="save"
              color="primary"
              @click="saveEmail(store.getUser.id, emailEdit)"
              :disable="verifyButtonEmail"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="card-config row">
        <q-card class="senha no-border-radius no-box-shadow bg-info col-4 col-md-6">
          <q-card-section>
            <span class="text-h4"><q-icon name="lock" /> Senha</span>
          </q-card-section>
          <q-card-section>
            <span class="text-subtitle1">Recomendamos que atualize sua senha periodicamente para ajudar a evitar qualquer acesso não autorizado à sua conta.</span>
          </q-card-section>
        </q-card>
        <q-card class="no-border-radius no-box-shadow bg-dark col-4 col-md-6">
          <q-card-section class="column q-mb-xl">
            <q-input
              class="input-size"
              outlined
              label="Senha Atual"
              type="password"
              v-model="password.current"
            />
            <q-input
              class="input-size"
              outlined
              label="Nova Senha"
              :type="config.type"
              v-model="password.new"
            >    
              <template #append>
                <q-icon
                  :name="config.icon"
                  class="pointer"
                  @click="iconValue()"
                />
              </template>
            </q-input>
            <q-input
              class="input-size"
              outlined
              label="Confirmar Senha"
              type="password"
              v-model="password.confirm"
            />
          </q-card-section>
          <q-card-section class="row justify-end">
            <q-btn 
              label="Salvar"
              icon="save"
              color="primary"
              @click="savePassword(store.getUser.id, password.confirm)"
              :disable="verifyButtonPassword"
            />
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </div>
</template>
<style scoped>

.scroll-area { 
  height: 30rem;
  max-width: 115vh;
}
.card-config {
    height: 20rem;
    width: 70rem;
}

.input-size {
    width: 20rem;
    margin-bottom: 15px;
}
</style>