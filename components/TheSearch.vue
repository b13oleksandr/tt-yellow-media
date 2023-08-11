<template>
  <div>
    <div class="bg-light rounded-lg">
      <div class="flex flex-wrap justify-between md:flex-row">
        <input
          :value="search"
          type="text"
          placeholder="Пошук"
          class="flex-1 h-10 px-4 m-1 text-gray-400 placeholder-gray-400 bg-transparent border-none appearance-none lg:h-12 text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
          @input="onSearch"
        >
      </div>
    </div>

    <div v-if="search.length > 2 && searchResult.length">
      <div class="relative">
        <div class="z-10 divide-y divide-gray-100 rounded-lg shadow bg-light top-2 absolute w-full">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
            <li
              v-for="movie of searchResult"
              :key="movie.id"
            >
              <p
                class="block px-4 py-4 hover:bg-dark/30 cursor-pointer"
                v-text="movie.name"
                @click="onSearchItem(movie)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ApiInstance } from "~/plugins/api"
import type { Movie } from "~/types"

const { $api }: { $api: ApiInstance } = <any>useNuxtApp()
const router = useRouter()

const search: Ref<string> = ref('')
const searchResult: Ref<Movie[]> = ref([])

const onSearch = async (e: any) => {
  search.value = e.target.value
  searchResult.value = await $api.movie.search(search.value)
}

const onSearchItem = async (movie: Movie) => {
  await router.push({ path: `/${movie.id}` })
  search.value = ''
  searchResult.value = []
}
</script>
