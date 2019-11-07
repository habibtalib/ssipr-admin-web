<template>
  <div>
    <h1>TEST</h1>
  </div>
</template>

<script>
export default {
  validate(data) {
    return /^\d+$/.test(data.params.id)
  }
}
</script>
