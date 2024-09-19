<template>
  <div class="main">
    <NuxtLayout :name="layoutName">
      <NuxtPage />
    </NuxtLayout>

<!--    <NuxtPage />-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        layoutName: "desktop-default"
      }
    }
  }
</script>

<style src="./src/styles/main.scss"></style>