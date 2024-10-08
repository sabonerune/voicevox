<template>
  <ToggleGroupItem :value class="ToggleGroupItem">
    <QIcon class="check" name="check" />
    {{ label }}
  </ToggleGroupItem>
</template>

<script setup lang="ts">
import { ToggleGroupItem } from "radix-vue";

defineProps<{
  label: string;
  value: string;
}>();
</script>

<style scoped lang="scss">
@use "@/styles/v2/variables" as vars;
@use "@/styles/v2/colors" as colors;
@use "@/styles/v2/mixin" as mixin;

.ToggleGroupItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: vars.$size-control;
  border: 1px solid;
  transition:
    background-color vars.$transition-duration,
    padding vars.$transition-duration;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:active:not(:disabled) {
    box-shadow: 0 0 0 transparent;
  }

  &:focus-visible {
    @include mixin.on-focus;
  }

  &:first-child {
    border-top-left-radius: vars.$radius-1;
    border-bottom-left-radius: vars.$radius-1;
  }
  &:last-child {
    border-top-right-radius: vars.$radius-1;
    border-bottom-right-radius: vars.$radius-1;
  }

  &[data-state="off"] {
    padding: 0
      calc(#{vars.$padding-1} + (#{vars.$size-icon} + #{vars.$gap-1}) / 2);
    color: colors.$display;
    border-color: colors.$border;
    background-color: colors.$control;

    &:hover:not(:disabled) {
      background-color: colors.$control-hovered;
    }

    &:active:not(:disabled) {
      background-color: colors.$control-pressed;
    }
  }

  &[data-state="on"] {
    padding: 0 vars.$padding-1;
    color: colors.$display-oncolor;
    border-color: colors.$border;
    background-color: colors.$primary;

    &:hover:not(:disabled) {
      background-color: colors.$primary-hovered;
    }

    &:active:not(:disabled) {
      background-color: colors.$primary-pressed;
    }
  }
}

.check {
  width: vars.$size-icon;
  height: vars.$size-icon;
  opacity: 1;
  margin-right: vars.$gap-1;
  transition:
    width vars.$transition-duration,
    margin-right vars.$transition-duration,
    opacity vars.$transition-duration;
}

[data-state="off"] > .check {
  width: 0;
  opacity: 0;
  margin-right: 0;
}
</style>
