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
          <router-link to="/exam/hiragana_to_romanization">
            平假名轉拼音
          </router-link>
        </li>

        <li>
          <router-link to="/exam/katakana_to_romanization">
            片假名轉拼音
          </router-link>
        </li>

        <li>
          <router-link to="/exam/romanization_to_hiragana">
            拼音轉平假名
          </router-link>
        </li>

        <li>
          <router-link to="/exam/romanization_to_katakana">
            拼音轉片假名
          </router-link>
        </li>

        <li>
          <router-link to="/exam/hiragana_to_katakana">
            平假名轉片假名
          </router-link>
        </li>

        <li>
          <router-link to="/exam/katakana_to_hiragana">
            片假名轉平假名
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
