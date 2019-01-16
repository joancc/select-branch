<template>
  <!-- selecciona sucursal -->
  <div class="select-branch">
    <div class="outer-20-b">
      <a href="#">&lt; Regresar</a>
    </div>
    <div class="columns">
      <GxCompanies/>
      <GxBranches />
    </div>
  </div>
</template>

<script>
import GxCompanies from "@/components/GxCompanies.vue";
import GxBranches from "@/components/GxBranches.vue";
export default {
  name: "SelectBranch",
  components: {
    GxCompanies,
    GxBranches
  }
};
</script>
<style></style>
