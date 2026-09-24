<template>
  <section class="about">
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

        <h1>關於</h1>
      </top-bar>
    </div>

    <div class="about__description">
      <p class="about-description__text">
        「記憶日文五十音網站」免網路即可使用，讓
        你坐車時輕鬆練習，可隱藏五十音方便默念，
        還可手寫練習。版面乾淨清新，無廣告干擾。
      </p>
    </div>

  </section>
</template>

<script>
import topBar from '@/components/topBar.vue'

export default {
  components: { topBar },
}
</script>

<style>
:root {
  --about-padding: 24px;
}
</style>

<style scoped>
.about__description {
  padding: 38px var(--about-padding);
  line-height: 1.5rem;
}

.about__team-member-container {
  padding-left: var(--about-padding);
}

.about-team-member-container__member-container {
  display: grid;
  grid-template:
    'profile-image job' 30px
    'profile-image name' 40px
    'profile-image links' 30px / 100px 1fr;
  grid-column-gap: 20px;
  column-gap: 20px;
}

.about-team-member-container__member-container
  + .about-team-member-container__member-container {
  margin-top: 24px;
}

.about-team-member-container__title {
  margin-bottom: 30px;
  font-weight: bold;
}

.about-member-container__profile-image {
  margin: 0;
  grid-area: profile-image;
}

.about-member-container__title {
  font-size: 1rem;
  grid-area: job;
}

.about-member-container__name {
  font-size: 1rem;
  grid-area: name;
}

.social-media-links__link {
  grid-area: links;
}

.social-media-links__link + .social-media-links__link {
  margin-left: 24px;
}
</style>
