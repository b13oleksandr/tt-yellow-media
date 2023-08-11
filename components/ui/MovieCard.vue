<template>
  <div class="h-full rounded-lg shadow bg-light">
    <div>
      <a class="relative pt-[142%] flex">
        <img
          :src="image"
          class="rounded-t-lg w-full absolute top-0 left-0 w-full h-full object-cover"
          alt=""
        />
      </a>
    </div>
    <div class="p-5">
      <a href="#">
        <p
          class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
          v-html="name"
        />
      </a>
      <p
        class="mb-3 font-normal text-gray-700 dark:text-gray-400 !font-light truncate-text !no-underline"
        v-text="genres[genre]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Genre } from "~/types"
const { genres } = useGenres()

defineProps<{
  image: string
  name: string
  genre: Genre
}>()
</script>
