<template>
  <UiContainer>
    <div class="flex flex-col md:flex-row gap-10">
      <div class="max-w-full w-[300px]">
        <img :src="movie.image" alt="" class="w-full rounded-xl">
      </div>
      <div class="flex-1">
        <div class="mb-10">
          <h1
            v-html="movie.name"
            class="text-gray-200 inline-block mb-6 text-3xl font-extrabold tracking-tight"
          />
          <p
            v-html="movie.description"
            class="leading-[26px] text-gray-400"
          />
        </div>

        <h1
          v-text="'Сеанси'"
          class="text-gray-200 inline-block mb-4 text-2xl font-extrabold tracking-tight"
        />
        <div
          v-for="(session, i) of sessions[movieId]"
          :key="i"
          class="mb-6"
        >
          <p
            class="text-accent text-sm mb-2"
            v-text="session.showdate"
          />
          
          <div class="flex flex-wrap gap-4">
            <div
              v-for="(time, i) of session.daytime.split(';')"
              v-text="time"
              :key="i"
              class="flex items-center cursor-pointer text-gray-400 bg-light hover:bg-light/80 rounded-lg h-10 px-4"
              @click="onShowPlaces(session.showdate, time)"
            />
          </div>
        </div>
      </div>
    </div>

    <!--  Select place popup  -->
    <div v-if="places.length" class="bg-dark/50 flex items-center justify-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative max-w-full w-[712px] max-h-full">
        <div class="relative rounded-lg shadow bg-light">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Виберіть місце
            </h3>
            <button
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="onPlacePopupClose"
            >
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
          
          <div class="gap-2 flex-1 px-4 py-4">
            <template
              v-for="(place, i) of places"
              :key="i"
            >
              <div
                v-text="`Ряд ${place[0].row}`"
                :class="[(selectedRow === place[0].row) ? '!bg-accent !text-white' : '']"
                class="mb-3 py-2 px-4 text-gray-300 text-accent text-sm hover:text-white cursor-pointer rounded bg-accent/20 hover:bg-accent"
                @click="onRowSelect(place[0].row)"
              />
                <div v-if="selectedRow === place[0].row" class="mb-4">
                  <div class="flex flex-wrap gap-2">
                    <div
                      v-for="(seat, i) of place[1]"
                      v-text="seat.seat"
                      :class="[selectedSeat === seat.seat && 'border border-accent']"
                      class="cursor-pointer w-10 h-10 bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 text-sm flex items-center justify-center rounded"
                      @click="onSeatSelect(seat.seat)"
                    />
                  </div>
                </div>
            </template>
          </div>
          
          <div class="flex items-center justify-between p-6 gap-4 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              class="rounded-lg text-sm font-medium px-5 h-10 items-center hover:text-gray-900 bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600"
              @click="onPlacePopupClose"
            >
              Скасувати
            </button>
            <button
              class="text-white bg-accent hover:bg-accent/70 px-5 font-medium rounded-lg text-sm h-10 flex items-center py-2.5 text-center"
              @click="onBook"
            >
              Купити
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--  Ticket popup  -->
    <div v-if="ticket" class="bg-dark/50 flex items-center justify-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative max-w-full w-[712px] max-h-full">
        <div class="relative rounded-lg shadow bg-light">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Квиток
            </h3>
            <button
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="onTicketPopupClose"
            >
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>

          <div class="px-4 py-4 text-gray-400">
            <p class="mb-2">Фільм: {{movie.name}}</p>
            <p class="mb-2">Дата: {{ticket.daytime}}</p>
            <p class="mb-2">Час: {{ticket.showdate}}</p>
            <p class="mb-2">Ряд: {{ticket.daytime}}</p>
            <p class="">Місце: {{ticket.seat}}</p>
          </div>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
import type { Movie, MovieSession } from "~/types"
import type { ApiInstance } from "~/plugins/api"

const route = useRoute()

const { $api }: { $api: ApiInstance } = <any>useNuxtApp()

const movieId: Ref<string> = computed(() => <string>route.params.id)

const { data: movie }: { data: Ref<Movie> } = await useAsyncData(() => $api.movie.get(movieId.value))
const { data: sessions }: { data: Ref<MovieSession> } = await useAsyncData(() => $api.movie.getSessions(movieId.value))
const places: Ref<any> = ref([])
const selectedRow: Ref<any> = ref(null)
const selectedSeat: Ref<number | null> = ref(null)
const selectedDate: Ref<string | null> = ref(null)
const selectedTime: Ref<string | null> = ref(null)
const ticket: Ref<any> = ref(null)

const onShowPlaces = async (daytime: string, showdate: string) => {
  selectedDate.value = showdate
  selectedTime.value = daytime
  places.value = await $api.movie.showPlaces(movieId.value, daytime, showdate)
}

const onRowSelect = (row: any) => {
  selectedRow.value = row
}

const onSeatSelect = async (seat: any) => {
  selectedSeat.value = seat
}

const onBook = async () => {
  ticket.value = await $api.movie.bookPlace({
    movieId: movieId.value,
    row: selectedRow.value,
    seat: <number>selectedSeat.value,
    showdate: <string>selectedDate.value,
    daytime: <string>selectedTime.value
  })
  
  onPlacePopupClose()
}

const onPlacePopupClose = () => {
  places.value = []
  selectedRow.value = null
  selectedSeat.value = null
}

const onTicketPopupClose = () => {
  ticket.value = null
}
</script>
