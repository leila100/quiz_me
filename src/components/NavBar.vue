<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item to="/" class="item" href="#">Home</b-nav-item>
        <b-nav-item to="/random" class="item" href="#">Random</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
.navbar-dark .navbar-nav .nav-link {
  color: blueviolet;
  font-size: 20px;
}
</style>
