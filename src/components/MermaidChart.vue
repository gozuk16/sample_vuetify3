<template>
  <div class="mermaid">
    gantt
    dateFormat  YYYY-MM-DDTHH:mm
    title Sample Gantt Chart with Time

    section Section A
    Task A      :a1, 2023-03-24T09:00, 4h
    Task B      :a2, after a1, 2h

    section Section B
    Task C      :b1, 2023-03-25T10:00, 3h
    Task D      :b2, after b1, 6h
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import mermaid from "mermaid";

onMounted(() => {
  mermaid.initialize({ startOnLoad: false });
  mermaid.init(undefined, document.querySelectorAll(".mermaid"));
});
</script>
