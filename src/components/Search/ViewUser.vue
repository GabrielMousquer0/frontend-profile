<script setup>
import { moment, ms, useRouter, runQuery } from '../../helpers';
import User from '../../schemas/query/user.gql';
import { viewUserStore } from '../../store';

const router = useRouter();
const store = viewUserStore();

const result = runQuery(User, { id: store.getId });

</script>

<template>
  <div class="q-pa-md">
    <q-btn
      class="btn"
      label="voltar"
      icon="chevron_left"
      color="primary"
      @click="router.push({ path: '/list' })"
    />
  </div>
    
  <div v-if="result">
    <q-card class="card column fixed-center">
      <q-card-section class="information">
        <q-avatar size="130px">
          <img :src="result.user.infos.avatar">
        </q-avatar><span class="text-h1">Informações</span>
      </q-card-section>
      <q-list>
        <q-item-section>
          <q-item-label class="information">
            <span class="text-h4"> <q-icon name="person" /> Username:</span>
            <q-item-label>
              <span class="text-h5"> {{ result.user.username }} </span>
            </q-item-label>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="information">
            <span class="text-h4"><q-icon name="leaderboard" /> Cargo:</span>
            <q-item-label>
              <span class="text-h5"> {{ result.user.infos.role }} </span>
            </q-item-label>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="information">
            <span class="text-h4"><q-icon name="calendar_month" /> Criado Em:</span>
            <q-item-label>
              <span class="text-h5"> {{ moment(ms(result.user.infos.created_at)).format('DD/MM/YYYY') }} </span>
            </q-item-label>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-section>
            <q-item-label class="information">
              <span class="text-h4">Linguagens: </span>
              <q-item-label>
                <q-btn-dropdown
                  icon="lang"
                  label="Ver"
                >
                  <q-list
                    v-for="lang in result.user.languages"
                    :key="lang"
                  >
                    <q-item-section>
                      <q-btn color="grey">
                        <q-icon><img :src="lang.id.replace('1', '/js.png').replace('2', '/python.png').replace('3', '/typescript.png')"></q-icon>{{ lang.name }}
                      </q-btn>
                    </q-item-section>
                  </q-list>
                  <q-list v-show="result.user.languages.length == 0">
                    <q-btn
                      color="grey"
                      icon="error"
                      label="Não possui"
                    />
                  </q-list>
                </q-btn-dropdown>
              </q-item-label>
            </q-item-label>
          </q-item-section>
          <q-item-label class="information">
            <span class="text-h4"><q-icon name="description" /> Descrição:</span>
            <q-item-label>
              <q-input
                v-model="result.user.infos.description"
                class="inputDesc"
                type="textarea"
              />
            </q-item-label>
          </q-item-label>
        </q-item-section>
      </q-list>
    </q-card>
  </div>
</template>

<style scoped>
.inputDesc {
    background-color: white;
    width: 780px;
}

.card {
    background-color: #acacac;
    margin-top: 9rem;
    height: 100%;
}

.information {
    margin-bottom: 2rem;
}
</style>