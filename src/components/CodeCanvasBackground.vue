<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const canvasRef = ref<HTMLCanvasElement | null>(null)

// ============================================================================
// 🎛️ CUSTOMIZATION CONTROLS & VARIABLE SETTINGS
// Adjust these parameters to easily dial in different visual and physics effects!
//
// 💡 PRESET INSPIRATIONS:
// - "💧 Fluid Water (Default)": springTension: 0.034, springDamping: 0.86, trailTension: 0.02, trailDamping: 0.82
// - "⚡ Snappy & Responsive":   springTension: 0.12,  springDamping: 0.72, trailTension: 0.08, trailDamping: 0.75
// - "🌌 Dreamy Nebula":         springTension: 0.018, springDamping: 0.92, radius: 180,       falloffExponent: 1.5
// - "🎯 Tight Spotlight":       radius: 80,           falloffExponent: 3.0, peakGlowDark: 0.35
// ============================================================================
const CONFIG = {
  // 1. 🌊 Physics & Elasticity (Controls how the highlight eases and tracks the cursor)
  physics: {
    /** Pull strength of primary highlight towards cursor.
     *  Lower (e.g. 0.018 - 0.022) = slower, softer ease-in glide.
     *  Higher (e.g. 0.06 - 0.10) = snappy, immediate response.
     */
    springTension: 0.020,
    /** Elastic friction for primary highlight (0.85 - 0.90 = smooth deceleration without abrupt stops) */
    springDamping: 0.88,
    /** Secondary trailing ripple tension (drifts behind with extra liquid lag) */
    trailTension: 0.012,
    /** Secondary trailing ripple damping */
    trailDamping: 0.85
  },

  // 2. ✨ Highlight Bloom & Ease-In Curve
  highlight: {
    /** How gradually the highlight blooms / eases into view.
     *  Lower (e.g. 0.025 - 0.035) = slow, gradual cinematic ease-in.
     *  Higher (e.g. 0.15) = immediate pop-in.
     */
    easeInSpeed: 0.032,
    /** How gradually the highlight fades out when the cursor leaves */
    easeOutSpeed: 0.020,
    /** Radius of illumination in pixels around cursor */
    radius: 140,
    /** Falloff sharpness curve: 1 = linear, 2.2 = soft smooth feather, 3 = focused point */
    falloffExponent: 2.2,
    /** Strength of secondary trailing fluid glow relative to primary (0 = off, 1 = equal) */
    trailIntensity: 0.45,
    /** Minimum threshold before a character starts glowing */
    threshold: 0.025
  },

  // 3. 📜 Parallax Depth & Page Scrolling
  parallax: {
    /** Parallax scrolling factor (0 = static background, 0.32 = gentle depth, 1 = scrolls 1:1) */
    speed: 0.32,
    /** Scroll inertia smoothing (0.05 = silky coasting momentum, 1.0 = instant locking) */
    inertia: 0.08
  },

  // 4. 👁️ Code Opacity & Readability (Ensures code remains subtle beneath foreground text)
  opacity: {
    /** Ambient base opacity for unlit code in Dark Mode */
    baseDark: 0.028,
    /** Ambient base opacity for unlit code in Light Mode (gentle watermark) */
    baseLight: 0.035,
    /** Peak hover brightness added to lit characters in Dark Mode */
    peakGlowDark: 0.23,
    /** Peak hover brightness added to lit characters in Light Mode (soft watercolor bloom) */
    peakGlowLight: 0.14
  },

  // 5. 🎨 Color Palette (RGB channels as string 'R, G, B')
  colors: {
    darkMode: {
      /** Core direct-center highlight (Emerald green) */
      core: '52, 211, 153',
      /** Mid-range highlight (Cyan blue) */
      mid: '56, 189, 248',
      /** Outer perimeter glow (Soft slate) */
      outer: '203, 213, 225',
      /** Ambient unlit text color */
      ambient: '148, 163, 184'
    },
    lightMode: {
      /** Light mode hover highlight (Calm, soothing oceanic blue) */
      highlight: '3, 105, 161',
      /** Ambient unlit text color (Warm soft slate, avoids harsh stark black) */
      ambient: '100, 116, 139'
    }
  },

  // 6. 📐 Grid & Typography Layout
  typography: {
    fontSize: 12.5,
    lineHeight: 20,
    charWidth: 7.6,
    paddingX: 24,
    /** Height of top navigation bar (keeps code from going behind header) */
    headerHeight: 70,
    /** Vertical position for the first line when scrolled to the top (pushed down below header) */
    startY: 92,
    fontFamily: '"JetBrains Mono", Consolas, Menlo, monospace'
  }
}

// ============================================================================
// 📜 AUTHENTIC KOTLIN CODE PER PAGE (Tailored to each section)
// ============================================================================
const PAGE_SNIPPETS: Record<string, string[]> = {
  // 1. HOME: adfleshner/Random-Love (DataAboutAppViewModel with Kotlin Coroutines & StateFlow)
  home: [
    'package com.flesh.dataaboutapp.dataaboutapp',
    '',
    'import androidx.lifecycle.ViewModel',
    'import androidx.lifecycle.viewModelScope',
    'import kotlinx.coroutines.flow.MutableSharedFlow',
    'import kotlinx.coroutines.flow.MutableStateFlow',
    'import kotlinx.coroutines.flow.asSharedFlow',
    'import kotlinx.coroutines.flow.asStateFlow',
    'import kotlinx.coroutines.launch',
    '',
    'class DataAboutAppViewModel(',
    '    private val repo: DataAboutAppRepository',
    ') : ViewModel() {',
    '',
    '    private val _state = MutableStateFlow<State>(State.Init)',
    '    val state = _state.asStateFlow()',
    '',
    '    private val _events = MutableSharedFlow<Event>()',
    '    val events = _events.asSharedFlow()',
    '',
    '    fun handleIntent(intent: Intent) {',
    '        viewModelScope.launch {',
    '            when (intent) {',
    '                is Intent.LoadData -> {',
    '                    _state.value = State.Loading',
    '                    try {',
    '                        val data = repo.getDataAboutApp()',
    '                        _state.value = State.Success(data)',
    '                    } catch (e: Exception) {',
    '                        _state.value = State.Error(e.localizedMessage ?: "Unknown error")',
    '                    }',
    '                }',
    '                is Intent.TriggerAction -> _events.emit(Event.ActionCompleted)',
    '            }',
    '        }',
    '    }',
    '',
    '    sealed class State {',
    '        object Init : State()',
    '        object Loading : State()',
    '        data class Success(val data: Any) : State()',
    '        data class Error(val message: String) : State()',
    '    }',
    '',
    '    sealed class Intent {',
    '        object LoadData : Intent()',
    '        object TriggerAction : Intent()',
    '    }',
    '}'
  ],

  // 2. PROJECTS: adfleshner/Using-DiffUtil (UserAdapter & UserDiffUtil ListAdapter)
  projects: [
    'package io.coding.usingdiffutil',
    '',
    'import android.view.LayoutInflater',
    'import android.view.View',
    'import android.view.ViewGroup',
    'import androidx.recyclerview.widget.DiffUtil',
    'import androidx.recyclerview.widget.ListAdapter',
    'import androidx.recyclerview.widget.RecyclerView',
    'import kotlinx.android.synthetic.main.item_user.view.*',
    '',
    'class UserAdapter : ListAdapter<User, UserAdapter.UserViewHolder>(UserDiffUtil()) {',
    '',
    '    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {',
    '        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_user, parent, false)',
    '        return UserViewHolder(view)',
    '    }',
    '',
    '    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {',
    '        holder.bind(getItem(position))',
    '    }',
    '',
    '    inner class UserViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {',
    '        fun bind(user: User) {',
    '            itemView.tv_name.text = user.name',
    '            itemView.tv_age.text = "${user.age}"',
    '        }',
    '    }',
    '}',
    '',
    'class UserDiffUtil : DiffUtil.ItemCallback<User>() {',
    '    override fun areItemsTheSame(oldItem: User, newItem: User): Boolean {',
    '        return oldItem.id == newItem.id',
    '    }',
    '',
    '    override fun areContentsTheSame(oldItem: User, newItem: User): Boolean {',
    '        return oldItem == newItem',
    '    }',
    '}'
  ],

  // 3. ABOUT & RESUME: adfleshner/Furballs (FurBallsApp & Dagger 2 Architecture)
  about: [
    'package com.flesh.furballs',
    '',
    'import android.app.Application',
    'import com.flesh.furballs.injection.AppComponent',
    'import com.flesh.furballs.injection.AppModule',
    'import com.flesh.furballs.injection.DaggerAppComponent',
    'import com.flesh.furballs.injection.RestApiModule',
    'import com.flesh.furballs.injection.RetrofitModule',
    'import com.flesh.furballs.injection.GlideModule',
    '',
    'class FurBallsApp : Application() {',
    '',
    '    lateinit var component: AppComponent',
    '        private set',
    '',
    '    override fun onCreate() {',
    '        super.onCreate()',
    '        instance = this',
    '        component = DaggerAppComponent.builder()',
    '            .appModule(AppModule(this))',
    '            .retrofitModule(RetrofitModule())',
    '            .restApiModule(RestApiModule())',
    '            .glideModule(GlideModule())',
    '            .build()',
    '        component.inject(this)',
    '    }',
    '',
    '    companion object {',
    '        lateinit var instance: FurBallsApp',
    '            private set',
    '    }',
    '}'
  ],

  // 4. CONTACT: adfleshner/Furballs (DogApi & BaseWebProvider Networking with RxJava & Retrofit)
  contact: [
    'package com.flesh.furballs.web',
    '',
    'import io.reactivex.Observable',
    'import retrofit2.http.GET',
    'import retrofit2.http.Path',
    'import retrofit2.Retrofit',
    'import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory',
    'import retrofit2.converter.gson.GsonConverterFactory',
    '',
    'interface DogApi {',
    '    @GET("api/breeds/image/random")',
    '    fun getRandomDog(): Observable<DogResponse>',
    '',
    '    @GET("api/breed/{breed}/images/random")',
    '    fun getRandomDogByBreed(@Path("breed") breed: String): Observable<DogResponse>',
    '',
    '    @GET("api/breeds/list/all")',
    '    fun getAllBreeds(): Observable<BreedListResponse>',
    '}',
    '',
    'open class BaseWebProvider<T>(private val serviceClass: Class<T>, private val baseUrl: String) {',
    '    protected val service: T by lazy {',
    '        Retrofit.Builder()',
    '            .baseUrl(baseUrl)',
    '            .addConverterFactory(GsonConverterFactory.create())',
    '            .addCallAdapterFactory(RxJava2CallAdapterFactory.create())',
    '            .build()',
    '            .create(serviceClass)',
    '    }',
    '}',
    '',
    'class DogProvider : BaseWebProvider<DogApi>(DogApi::class.java, "https://dog.ceo/") {',
    '    fun fetchRandomDog(): Observable<DogResponse> = service.getRandomDog()',
    '}'
  ]
}

const currentSnippets = computed(() => {
  const routeName = (route.name as string) || 'home'
  return PAGE_SNIPPETS[routeName] || PAGE_SNIPPETS.home
})

// Cross-fade opacity between page changes
const pageFade = ref(1)

watch(
  () => route.name,
  () => {
    // Soft quick fade out and in
    pageFade.value = 0.2
    setTimeout(() => {
      pageFade.value = 1
    }, 180)
  }
)

let animationFrameId: number | null = null

// Mouse target coordinates
let targetX = -1000
let targetY = -1000
let isPointerInside = false

// Elastic spring physics coordinates
let springX = -1000
let springY = -1000
let vx = 0
let vy = 0

// Secondary elastic trailing ripple
let trailX = -1000
let trailY = -1000
let trailVx = 0
let trailVy = 0

// Parallax scroll tracking
let targetScrollY = 0
let currentScrollY = 0

// Smooth pointer hover intensity (blooms in and out gradually)
let pointerIntensity = 0

function initPhysicsAt(x: number, y: number) {
  targetX = x
  targetY = y
  if (springX < -500) {
    springX = x
    springY = y
    trailX = x
    trailY = y
  }
}

function handleMouseMove(e: MouseEvent) {
  isPointerInside = true
  initPhysicsAt(e.clientX, e.clientY)
}

function handleMouseEnter(e: MouseEvent) {
  isPointerInside = true
  initPhysicsAt(e.clientX, e.clientY)
}

function handleMouseLeave() {
  isPointerInside = false
}

function handleScroll() {
  targetScrollY = window.scrollY
}

function render() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return

  const width = canvas.width / (window.devicePixelRatio || 1)
  const height = canvas.height / (window.devicePixelRatio || 1)

  const radius = CONFIG.highlight.radius
  const radiusSq = radius * radius
  const falloff = CONFIG.highlight.falloffExponent
  const lineHeight = CONFIG.typography.lineHeight
  const charWidth = CONFIG.typography.charWidth
  const paddingX = CONFIG.typography.paddingX
  const startY = CONFIG.typography.startY

  // 1. Smoothly ease highlight bloom in and out
  const targetIntensity = isPointerInside ? 1 : 0
  const easeRate = isPointerInside ? CONFIG.highlight.easeInSpeed : CONFIG.highlight.easeOutSpeed
  pointerIntensity += (targetIntensity - pointerIntensity) * easeRate
  if (pointerIntensity < 0.001) pointerIntensity = 0

  // 2. Elastic Spring Physics Simulation (Silky, soft fluid lag)
  if (isPointerInside) {
    const k1 = CONFIG.physics.springTension
    const damp1 = CONFIG.physics.springDamping
    const ax = (targetX - springX) * k1
    const ay = (targetY - springY) * k1
    vx = (vx + ax) * damp1
    vy = (vy + ay) * damp1
    springX += vx
    springY += vy

    // Secondary soft trailing drift (creates fluid water inertia)
    const k2 = CONFIG.physics.trailTension
    const damp2 = CONFIG.physics.trailDamping
    const tax = (springX - trailX) * k2
    const tay = (springY - trailY) * k2
    trailVx = (trailVx + tax) * damp2
    trailVy = (trailVy + tay) * damp2
    trailX += trailVx
    trailY += trailVy
  } else {
    vx *= 0.9
    vy *= 0.9
    trailVx *= 0.9
    trailVy *= 0.9
    springX += vx
    springY += vy
    trailX += trailVx
    trailY += trailVy
  }

  // Smooth Parallax Scroll Easing (Coasts with fluid inertia)
  currentScrollY += (targetScrollY - currentScrollY) * CONFIG.parallax.inertia
  const parallaxOffset = currentScrollY * CONFIG.parallax.speed
  const subPixelShift = ((parallaxOffset % lineHeight) + lineHeight) % lineHeight
  const baseLineIndex = Math.floor(parallaxOffset / lineHeight)

  ctx.clearRect(0, 0, width, height)

  // Clip rendering strictly below the header so code never appears behind it
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, CONFIG.typography.headerHeight, width, height - CONFIG.typography.headerHeight)
  ctx.clip()

  const isDarkMode = document.documentElement.getAttribute('data-theme') !== 'light'

  ctx.font = `${CONFIG.typography.fontSize}px ${CONFIG.typography.fontFamily}`
  ctx.textBaseline = 'middle'

  const snippets = currentSnippets.value
  const linesCount = snippets.length
  const totalRows = Math.ceil(height / lineHeight) + 4

  const baseAmbientAlpha = (isDarkMode ? CONFIG.opacity.baseDark : CONFIG.opacity.baseLight) * pageFade.value
  const baseAmbientColor = isDarkMode
    ? `rgba(${CONFIG.colors.darkMode.ambient}, ${baseAmbientAlpha})`
    : `rgba(${CONFIG.colors.lightMode.ambient}, ${baseAmbientAlpha})`

  // 3. Render code with parallax vertical position and proximity illumination
  for (let row = -1; row < totalRows; row++) {
    const lineIndex = (((row + baseLineIndex) % linesCount) + linesCount) % linesCount
    const line = snippets[lineIndex]
    const y = startY + row * lineHeight - subPixelShift

    const distY1 = Math.abs(y - springY)
    const distY2 = Math.abs(y - trailY)
    const rowInSpringRange = pointerIntensity > 0.001 && distY1 < radius
    const rowInTrailRange = pointerIntensity > 0.001 && distY2 < radius

    if (!rowInSpringRange && !rowInTrailRange) {
      ctx.fillStyle = baseAmbientColor
      ctx.fillText(line, paddingX, y)
      continue
    }

    for (let col = 0; col < line.length; col++) {
      const char = line[col]
      if (char === ' ') continue

      const x = paddingX + col * charWidth

      const dx1 = x - springX
      const dy1 = y - springY
      const d1Sq = dx1 * dx1 + dy1 * dy1

      const dx2 = x - trailX
      const dy2 = y - trailY
      const d2Sq = dx2 * dx2 + dy2 * dy2

      let glowRatio = 0

      if (d1Sq < radiusSq) {
        const dist = Math.sqrt(d1Sq)
        glowRatio = Math.max(glowRatio, (1 - dist / radius) ** falloff)
      }

      if (d2Sq < radiusSq) {
        const dist = Math.sqrt(d2Sq)
        const trailRatio = (1 - dist / radius) ** falloff * CONFIG.highlight.trailIntensity
        glowRatio = Math.max(glowRatio, trailRatio)
      }

      // Smooth gradual ease-in bloom
      const effectiveGlow = glowRatio * pointerIntensity

      if (effectiveGlow > CONFIG.highlight.threshold) {
        if (isDarkMode) {
          const alpha = (CONFIG.opacity.baseDark + effectiveGlow * CONFIG.opacity.peakGlowDark) * pageFade.value
          if (effectiveGlow > 0.6) {
            ctx.fillStyle = `rgba(${CONFIG.colors.darkMode.core}, ${alpha})`
          } else if (effectiveGlow > 0.3) {
            ctx.fillStyle = `rgba(${CONFIG.colors.darkMode.mid}, ${alpha})`
          } else {
            ctx.fillStyle = `rgba(${CONFIG.colors.darkMode.outer}, ${alpha})`
          }
        } else {
          const alpha = (CONFIG.opacity.baseLight + effectiveGlow * CONFIG.opacity.peakGlowLight) * pageFade.value
          ctx.fillStyle = `rgba(${CONFIG.colors.lightMode.highlight}, ${alpha})`
        }
      } else {
        ctx.fillStyle = baseAmbientColor
      }

      ctx.fillText(char, x, y)
    }
  }

  ctx.restore()

  animationFrameId = requestAnimationFrame(render)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
  }
}

onMounted(() => {
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!hasFinePointer || prefersReducedMotion) return

  resizeCanvas()
  targetScrollY = window.scrollY
  currentScrollY = targetScrollY

  window.addEventListener('resize', resizeCanvas, { passive: true })
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('mouseenter', handleMouseEnter)
  window.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('scroll', handleScroll, { passive: true })

  animationFrameId = requestAnimationFrame(render)
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseenter', handleMouseEnter)
  window.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <canvas ref="canvasRef" class="code-canvas-background" aria-hidden="true" />
</template>

<style scoped>
.code-canvas-background {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  opacity: 1;
  transition: opacity 0.5s ease;
}

@media (pointer: coarse) {
  .code-canvas-background {
    display: none !important;
  }
}
</style>
