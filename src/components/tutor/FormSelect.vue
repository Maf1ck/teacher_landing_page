<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  value: string
  label: string
}

const props = defineProps<{
  modelValue: string
  options: Option[]
  placeholder?: string
  id?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)
const triggerRef = ref<HTMLButtonElement | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found ? found.label : null
})

function toggle() {
  isOpen.value = !isOpen.value
}

function select(val: string) {
  emit('update:modelValue', val)
  isOpen.value = false
}

function onClickOutside(e: MouseEvent) {
  const target = e.target as Node
  if (
    triggerRef.value && !triggerRef.value.contains(target) &&
    dropdownRef.value && !dropdownRef.value.contains(target)
  ) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<template>
  <div class="form-select-wrapper" :class="{ open: isOpen }">
    <!-- Hidden native select for form/accessibility -->
    <select
      :id="id"
      :value="modelValue"
      @change="e => emit('update:modelValue', (e.target as HTMLSelectElement).value)"
      aria-hidden="true"
      tabindex="-1"
      class="sr-only"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>

    <!-- Custom trigger -->
    <button
      type="button"
      ref="triggerRef"
      class="select-trigger"
      :class="{ 'has-value': !!selectedLabel }"
      @click="toggle"
      :aria-expanded="isOpen"
    >
      <span class="trigger-text">{{ selectedLabel ?? placeholder }}</span>
      <span class="trigger-arrow" :class="{ rotated: isOpen }">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </span>
    </button>

    <!-- Dropdown panel -->
    <Transition name="dropdown">
      <div v-if="isOpen" ref="dropdownRef" class="select-dropdown">
        <button
          v-for="opt in options"
          :key="opt.value"
          type="button"
          class="select-option"
          :class="{ selected: modelValue === opt.value }"
          @click="select(opt.value)"
        >
          <span class="option-label">{{ opt.label }}</span>
          <svg
            v-if="modelValue === opt.value"
            class="check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.form-select-wrapper {
  position: relative;
  width: 100%;
}

/* Hide native select visually but keep it accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Trigger button */
.select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background-color: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.65);
  font-size: 15px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  font-family: inherit;

  &.has-value {
    color: white;
  }

  &:focus {
    outline: none;
    border-color: white;
    background-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.12);
  }

  .open & {
    border-color: white;
    background-color: rgba(255, 255, 255, 0.18);
    border-radius: 8px 8px 0 0;
  }
}

.trigger-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trigger-arrow {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  transition: transform 0.25s ease;
  color: rgba(255, 255, 255, 0.7);

  svg {
    width: 100%;
    height: 100%;
  }

  &.rotated {
    transform: rotate(180deg);
  }
}

/* Dropdown panel */
.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  background: white;
  border-radius: 0 0 10px 10px;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.18),
    0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-top: none;
}

/* Option item */
.select-option {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: #1e293b;
  font-size: 15px;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #eff6ff;
    color: #2563eb;
  }

  &.selected {
    background-color: #dbeafe;
    color: #2563eb;
    font-weight: 600;
  }

  & + & {
    border-top: 1px solid #f1f5f9;
  }
}

.option-label {
  flex: 1;
}

.check-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #2563eb;
}

/* Transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top center;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.9) translateY(-4px);
}
</style>
