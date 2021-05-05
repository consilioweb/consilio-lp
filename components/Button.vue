<template>
  <button
    class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg text-white bg-consilio-700 border-consilio-800 hover:bg-consilio-800 hover:border-consilio-900 font-black"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      default: '',
      type: String,
    },
  },
}
</script>
