<template>
  <UiContainer>
    <div class="mb-6">
      <TheFilter @filter="onFilter" />
    </div>

    <div class="flex flex-wrap -m-2">
      <div
        v-for="movie of movies"
        :key="movie.id"
        class="w-full min-[380px]:w-6/12 sm:w-4/12 md:w-3/12 lg:w-1/5 p-2"
      >
        <UiMovieCard
          :image="movie.image"
          :name="movie.name"
          :genre="movie.genre"
          class="cursor-pointer"
          @click="$router.push({ path: `/${movie.id}` })"
        />
      </div>
    </div>
</UiContainer>
</template>

<script lang="ts" setup>
import { ApiInstance } from "~/plugins/api"
import {Genre} from "~/types";

const { $api }: { $api: ApiInstance } = <any>useNuxtApp()
const route = useRoute()

const movies: Ref<any> = ref([])

const { data } = await useAsyncData(async () => await $api.movie.getAll(<any>route.query.g || null))
movies.value = data.value

const onFilter = async (param: Genre) => {
  movies.value = await $api.movie.getAll(param)
}
</script>
