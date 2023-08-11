<template>
  <ul class="font-medium flex flex-wrap gap-x-6 gap-y-6">
    <li
      class="cursor-pointer"
      @click="onItem('')"
    >
      <span
        :class="[
        (!$route.query.g || $route.query.g === 'all') && '!bg-accent/20 !text-accent'
        ]"
          class="inline-flex py-2 pl-3 pr-4 text-gray-300 hover:text-accent rounded hover:bg-accent/20"
      >
        Усі жанри
      </span>
    </li>
    <li
      v-for="(item, key) of genres"
      :key="key"
      class="cursor-pointer"
      @click="onItem(+key)"
    >
      <span
        :class="[
          (key == $route.query.g) && '!bg-accent/20 !text-accent'
        ]"
        class="inline-flex py-2 pl-3 pr-4 text-gray-300 hover:text-accent rounded hover:bg-accent/20"
      >
        {{ item }}
      </span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { Genre } from "~/types"

const emit = defineEmits(['filter'])

const router = useRouter()
const { genres } = useGenres()

const onItem = (item: Genre | '') => {
  router.push({ path: '/', query: { g: item } })
  emit('filter', item)
}
</script>
