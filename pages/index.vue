<template>
  <div>
    <div class="relative h-screen" @wheel="scrollToNextSection">
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="absolute h-full w-full bg-gradient-to-r transform transition-all duration-500 ease-in-out flex content-center items-center mx-auto"
        :class="{
          ['-translate-y-full']: section.offscreen,
          [`${section.background} translate-y-0 z-${section.priority}`]: true,
        }"
      >
        <section
          v-if="section.id === 1"
          :ref="`section${section.id}`"
          :class="`section${section.id}`"
          class="section container mx-auto content-center items-center md:pr-12"
        >
          <div class="flex flex-col content-center items-center mx-auto">
            <Logo class="neon-effect" width="300px" />
            <div class="w-max mt-8">
              <h1 class="typewriter-effect text-xs md:text-base">
                Tecnologia que reúne
                <strong class="font-black">relacionamento</strong> e
                <strong class="font-black">resultado</strong>!
              </h1>
            </div>
          </div>
        </section>
        <section
          v-if="section.id === 2"
          :ref="`section${section.id}`"
          :class="`section${section.id}`"
          class="section w-full mx-auto text-black overflow-y-scroll overflow-x-hidden py-36 h-screen md:pr-12"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-6">
            <div
              v-for="(item, e) in items"
              :key="e"
              class="step-1 bg-black text-white w-full h-full p-6 rounded block"
            >
              {{ item }}
              <h1
                v-gsap.to="{
                  rotation: 360,
                  x: 150,
                  duration: 2,
                }"
              >
                NUXT GSAP
              </h1>
            </div>
          </div>
        </section>
        <section
          v-if="section.id === 3"
          :ref="`section${section.id}`"
          :class="`section${section.id}`"
          class="section w-full mx-auto text-black overflow-y-scroll overflow-x-hidden py-36 h-screen md:pr-12"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-6">
            <div
              v-for="(item, e) in items"
              :key="e"
              class="step-1 bg-black text-white w-full h-full p-6 rounded block"
            >
              {{ item }}
            </div>
          </div>
        </section>
      </div>
      <div
        class="fixed z-50 inset-x-2/4 md:inset-x-auto md:right-0 h-full flex md:items-center mr-5"
      >
        <div class="flex flex-col justify-between">
          <div
            class="flex justify-center bg-gray-800 rounded-full bg-opacity-25 mb-3"
          >
            <div class="flex flex-col hidden md:flex">
              <div class="grid grid-cols-1 gap-4 py-4 px-2.5">
                <div
                  v-for="(section, index) in sections"
                  :key="index"
                  class="w-2.5 h-2.5 group ring-1 ring-white p-px ring-opacity-100 rounded-full"
                >
                  <button
                    type="button"
                    class="h-full w-full focus:outline-none block rounded-full group-hover:bg-white cursor-pointer"
                    :class="{
                      'bg-white': section.active,
                    }"
                    aria-hidden="true"
                    aria-label="Set active section"
                    :aria-checked="section.active"
                    role="switch"
                    @click="setActiveSection(section.id)"
                  ></button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col transition-all duration-500 ease-in-out"
            :class="{
              'opacity-100': activeSection < sections.length,
              'opacity-0': activeSection === sections.length,
            }"
          >
            <div class="flex justify-center">
              <div class="w-6 h-10 border border-white rounded-full">
                <div
                  class="w-1 h-2 rounded-full bg-white bg-opacity-75 m-auto mt-3"
                ></div>
              </div>
            </div>
            <div class="flex justify-center">
              <div class="animate-bounce motion-safe:animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-white transform translate-y-3 opacity-95"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-white opacity-40"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      lmS: null,
      activeSection: 1,
      sections: [
        {
          id: 1,
          priority: 50,
          active: true,
          background: 'bg-black',
          offscreen: false,
        },
        {
          id: 2,
          priority: 40,
          active: false,
          background: 'bg-consilio-500',
          offscreen: false,
        },
        {
          id: 3,
          priority: 30,
          active: false,
          background: 'bg-yellow-500',
          offscreen: false,
        },
      ],
      items: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    }
  },
  created() {
    this.scrollToNextSectionDebounce = _.debounce(
      (deltaY) => {
        this.activeSection += deltaY
        this.setActiveSection(this.activeSection)
      },
      100,
      {
        leading: true,
        trailing: false,
        maxWait: 800,
      }
    )
  },
  methods: {
    checkEndsY(deltaY) {
      const el = document.getElementsByClassName(`section${this.activeSection}`)
      if (el && el.length) {
        if (
          deltaY === 1 &&
          el[0].scrollTop + el[0].offsetHeight >= el[0].scrollHeight - 3
        ) {
          return true
        }
        if (deltaY === -1 && el[0].scrollTop === 0) {
          return true
        }
        return false
      }
      return false
    },
    scrollToNextSection(event) {
      const deltaY = Math.sign(event.deltaY)

      if (this.checkEndsY(deltaY)) {
        if (deltaY > 0) {
          if (
            this.activeSection >= 1 &&
            this.activeSection < this.sections.length
          ) {
            this.scrollToNextSectionDebounce(deltaY)
          }
        }
        if (deltaY < 0) {
          if (this.activeSection > 1) {
            this.scrollToNextSectionDebounce(deltaY)
          }
        }
      }
    },
    setActiveSection(id) {
      this.activeSection = id

      this.sections = this.sections.map((section) => {
        section.active = section.id === id
        section.offscreen = section.id < this.activeSection
        return section
      })
    },
  },
}
</script>
