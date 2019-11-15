<template>
  <section class="home">
    <h1>五十音小五</h1>
    <div id="nav">
      <ul>
        <li>
          <router-link to="/table">
            表格
          </router-link>
        </li>
        <li>
          <router-link to="/exam">
            測驗
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
}
</script>
