<template>
  <div class="item office">
    <button
      class="select-item"
      :class="{ active: isActive }"
      :disabled="!branch.active"
      @click="selectBranch"
    >
      <div class="info">
        <p>
          <strong>{{ branch.name }}</strong>
          <span v-if="branch.active" class="on"></span>
          <span>{{ branch.description }}</span>
        </p>
      </div>
    </button>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "CompanyBranch",
  props: {
    branch: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      selectedBranchId: state => state.selectedBranchId
    }),
    isActive() {
      return this.selectedBranchId === this.branch.branch_id;
    }
  },
  methods: {
    selectBranch() {
      this.$store.commit("selectBranch", this.branch.branch_id);
    }
  }
};
</script>
