<template>
  <div class="flex">
    <div class="flex-1 h-screen relative" @wheel="scrollToNextSection">
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
          :class="`section-${section.id}`"
          class="section flex container mx-auto content-center items-center relative md:pr-2 w-full h-full"
        >
          <div class="flex flex-col justify-center items-center mx-auto">
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
          :class="`section-${section.id}`"
          class="section mx-auto content-center items-center md:pr-12 w-full h-full relative overflow-y-scroll overflow-x-hidden"
        >
          <div class="flex flex-col mx-auto my-36 section-2-inner">
            <div style="min-height: 1500px">
              <div class="trigger-1"></div>
              <div class="step section-2__title w-full text-black text-center">
                <h2 class="uppercase font-extrabold text-5xl tracking-tighter">
                  Foco no que realmente importa
                </h2>
                <span
                  >Foque nos seus objetivos que nós te ajudaremos a alcançá-los
                </span>
              </div>
              <div class="flex items-center h-full">
                <div class="step section-2__1 bg-black w-full h-24">
                  Seus Objetivos
                </div>
                <div class="step section-2__2 bg-black w-full h-24">
                  Nosso Planejamento
                </div>
                <div class="step section-2__3 bg-black w-full h-24">
                  Execução
                </div>
                <div class="step section-2__4 bg-black w-full h-24">
                  Verificação de Resultados
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          v-if="section.id === 3"
          :class="`section-${section.id}`"
          class="section container mx-auto content-center items-center md:pr-12 w-full h-full"
        >
          Teste
        </section>
      </div>
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
            <div class="w-6 h-10 border-2 border-white rounded-full">
              <div class="w-1 h-2 rounded-full bg-white m-auto mt-3"></div>
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
</template>

<script>
import _ from 'lodash'
import { TimelineMax } from 'gsap'

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
      items: [1, 1, 1, 1, 1],
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
  mounted() {
    this.initScroll()
  },
  methods: {
    initScroll() {
      if (process.client && window) {
        const scrollmagic = window.ScrollMagic
        const section2Controller = new scrollmagic.Controller({
          container: '.section-2',
        })

        const TL = new TimelineMax()

        TL.fromTo(
          '.section-2__title',
          { autoAlpha: 1, scale: 1.2, y: 280 },
          {
            autoAlpha: 1,
            scale: 1.0,
            y: 800,
            duration: 2500,
            ease: 'power3.inOut',
          },
          '-=2'
        )

        TL.fromTo(
          '.section-2__1',
          { autoAlpha: 0, x: -500 },
          { autoAlpha: 1, x: 0, ease: 'power3.inOut' }
        )

        TL.fromTo(
          '.section-2__2',
          { autoAlpha: 0, x: -500 },
          { autoAlpha: 1, x: 0, ease: 'power3.inOut' }
        )

        TL.fromTo(
          '.section-2__3',
          { autoAlpha: 0, x: -500 },
          { autoAlpha: 1, x: 0, ease: 'power3.inOut' }
        )

        TL.fromTo(
          '.section-2__4',
          { autoAlpha: 0, x: -500 },
          { autoAlpha: 1, x: 0, ease: 'power3.inOut' }
        )

        new scrollmagic.Scene({
          triggerElement: '.trigger-1',
          triggerHook: 0,
          duration: '90%',
        })
          .setTween(TL)
          .addTo(section2Controller)
      }
    },
    checkEndsY(deltaY) {
      const el = document.getElementsByClassName(
        `section-${this.activeSection}`
      )
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
