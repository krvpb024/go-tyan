<template>
  <section class="donate">
    <div class="app-sticky-top">
      <top-bar>
        <template #leftContainer>
          <a
            @click.prevent="$router.go(-1)"
            href="/"
            class="app-top-bar-link-icon"
            aria-labelledby="nav-return-label"
          >
            <svg
              role="img"
              aria-labelledby="nav-return-label"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width="18.035"
              height="16.297"
            >
              <title id="nav-return-label">返回</title>

              <filter id="shadow">
                <feDropShadow
                  dx="2.2"
                  dy="2.2"
                  stdDeviation="0"
                  flood-color="#ffffff"
                />
              </filter>

              <path
                aria-labelledby="nav-return-label"
                d="M7.865 16.414L.684 9.233a.967.967 0 0 1 0-1.368L7.865.684a.967.967 0 0 1 1.368 1.368L3.792 7.493h13.676a.967.967 0 1 1 0 1.934H3.614l5.619 5.619a.967.967 0 1 1-1.368 1.368z"
                stroke="#313131"
                filter="url(#shadow)"
                stroke-width="0.6"
              />
            </svg>
          </a>
        </template>

        <h1>贊助我們</h1>
      </top-bar>
    </div>

    <div class="donate__description">
      <p class="donate-description__text">
        由於維持一個網站的運作，需要一定的成本，如果你很喜歡阿五，或是你覺得阿五很實用，你可以通過小額贊助的方式來鼓勵我們，讓我們可以繼續維護、更新。
      </p>
    </div>

    <div class="donate__link-block">
      <img class="donate-link-block__image" src="@/assets/donate.png" alt="小額贊助網址 QR code" width="200" height="200">
      <a target="_blank" rel="noopener" class="donate-link-block__link" href="https://p.ecpay.com.tw/7CCB8">透過綠界科技贊助</a>
    </div>
  </section>
</template>

<script>
import topBar from '@/components/topBar.vue'

export default {
  components: { topBar },
}
</script>

<style scoped>
.donate__description {
  padding: 38px 24px;
  line-height: 1.5rem;
}

.donate-link-block__image {
  margin-bottom: 20px;
}

.donate__link-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.donate-link-block__link {
  text-decoration: underline;
}
</style>
