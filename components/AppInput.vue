<template>
  <form id="question"
    class="flex flex-row w-full gap-3 px-6 pt-1 pb-3 mx-2 stretch last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl">
    <div class="relative flex flex-1 h-full md:flex-col">

      <div
        class="flex flex-col w-full pb-2 flex-grow pt-2  relative border border-indigo-900/50  bg-transparent rounded-md shadow-[0_0_15px_rgba(0,0,0,0.10)]">

        <textarea @keyup.enter.prevent="emit('clicked', inputText)" @input="adjustTextareaHeight" ref="textarea" tabindex="0" rows="1"
          placeholder="e.g. new admissions now open at Glendale"
          class="w-full p-0 pl-3 m-0 bg-transparent border-0 resize-none pr-7 focus:ring-0 focus-visible:ring-0 focus:outline-none"
          v-model="inputText"></textarea>

        <button @click.prevent="emit('clicked', inputText)"
          class="absolute p-1 text-indigo-500 transition-colors rounded-md right-1 md:right-2 hover:bg-indigo-600 hover:text-indigo-100 disabled:hover:bg-transparent">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
            stroke-linejoin="round" class="w-4 h-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
const emit = defineEmits(["clicked"])
const inputText = ref("")
const textarea = ref("")
function adjustTextareaHeight(event) {
  if (inputText.value.length > 0 && event.code != "Enter") {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = textarea.value.scrollHeight + 'px';
  } else {
    textarea.value.style.height = 24 + 'px';
  }
}
</script>