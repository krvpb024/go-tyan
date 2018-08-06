<template>
  <section-container>
    <section-header>
      關於
      <section-header-btn
        slot="right"
        position="right"
        tag="a"
        :show="true"
        insideType="img"
        :insideSrc="require('@/assets/image/close.svg')"
        insideAlt="info"
        toUrl="/"
      >
      </section-header-btn>
    </section-header>
    <section class="about-container">
      <article>
        <h2>五十音 gojuon</h2>
        <p>提供五十音轉拼音、拼音轉五十音、平假名片假名相互轉換，三種抽背模式。利用零碎的通勤時間也能加強五十音的記憶。</p>
        <p><strong>gojuon</strong>支援離線使用，你也可以把這個網頁加入手機的主畫面，之後不用再開啟瀏覽器輸入網址就可以直接使用。</p>
      </article>
      <article>
        <h2>作者</h2>
        <p>我是<strong>吃什麼</strong>的作者Chen Yi-Chen，如果發現這個App有bug可以到<a href="https://github.com/krvpb024/what-to-eat" target="_blank" rel="noopener">github</a>發issue給我。或是有任何意見也可以直接發信給我</p>
        <address><a href="mailto:krvpb024@protonmail.com">krvpb024@protonmail.com</a> </address>
      </article>
    </section>
  </section-container>
</template>

<script>
// @ is an alias to /src
import sectionHeader from '@/components/sectionHeader.vue'
import sectionHeaderBtn from '@/components/sectionHeaderBtn.vue'
import sectionContainer from '@/components/sectionContainer.vue'

export default {
  components: {
    sectionHeader,
    sectionHeaderBtn,
    sectionContainer
  }
}
</script>

<style>
h2 {
  color: var(--mainColor);
  text-align: center;
}
.about-container {
  padding: 20px 10%;
}
.about-container p {
  line-height: 1.3rem;
}
.about-container a {
  color: var(--mainColor);
}
</style>
