<template>
  <a
    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    data-bs-toggle="collapse"
    :href="`#id-${randomID}`"
    role="button"
    aria-expanded="false"
    :aria-controls="`id-${randomID}`"
  >
    Expand ..
  </a>
  <div
    class="collapse mt-4 max-h-24 overflow-y-auto"
    :id="`id-${randomID}`"
    style="max-width: 500px"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import randomUUID from "../../pubFunction/randomUUID.js";

defineProps({
  randomID: {
    type: String,
    required: true,
    default: randomUUID(),
  },
});
</script>
