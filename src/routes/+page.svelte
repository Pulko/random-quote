<script lang="ts">
  import type { PageServerData } from './$types'
	import type { QuoteType } from './+page.server'

  export let data: PageServerData

  let loading = false

  let {
    dateAdded,
    content,
    author,
    tags,
  } = data.data as QuoteType

  async function update() {
    loading = true
    const response = await fetch("https://api.quotable.io/random")
    const quote: QuoteType = await response.json()

    dateAdded = quote.dateAdded
    author = quote.author
    tags = quote.tags
    content = quote.content
    loading = false
  }
</script>

<div class="text-emerald-900 w-1/2 p-12">
  <div class="flex mb-2">
    {#each tags as tag}
      <p class="px-2 py-1 bg-orange-600 text-white mr-2 rounded">{tag}</p>
    {/each}
  </div>

  <div class="flex justify-between">
    <p class="text-xl font-bold my-5">{content}</p>

    {#if !loading}
      <button on:click={update} class="p-4">
        <div class="bg-emerald-900 p-1 rounded text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
      </button>
    {/if}
  </div>

  <div class="flex flex-col justify-between mt-2">
    <p class="text-md font-semibold">{author}</p>
    <p class="text-sm">{new Date(dateAdded).toDateString()}</p>
  </div>
</div>

