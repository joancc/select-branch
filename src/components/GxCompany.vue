<template>
  <div class="item company">
    <button
      :data-testid="`${company.emitter.commercial_name}_button`"
      class="select-item"
      :class="{ active: isActive }"
      @click="getBranches()"
    >
      <div class="info">
        <p>
          <strong>{{ companyDisplayName }}</strong> <span class="on"></span>
          <span v-if="company.emitter.tax_id"
            >RFC: {{ company.emitter.tax_id }}</span
          >
          <button @click="showButton = !showButton" class="showButton">
            Show button
          </button>
          <button v-if="isActive && showButton" class="boton">Botón</button>
        </p>
      </div>
    </button>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "GxCompany",
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showButton: false
    };
  },
  computed: {
    ...mapState({
      selectedCompanyId: state => state.selectedCompanyId
    }),
    isActive() {
      return this.selectedCompanyId === this.company.company_id;
    },
    companyDisplayName() {
      return this.company.emitter.business_name ===
        this.company.emitter.commercial_name
        ? this.company.emitter.business_name
        : `${this.company.emitter.business_name} (${
            this.company.emitter.commercial_name
          })`;
    }
  },
  methods: {
    getBranches() {
      this.$store.dispatch("getBranches", this.company.company_id);
    }
  }
};
</script>
