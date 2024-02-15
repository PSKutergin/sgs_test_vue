<template>
  <button class="button" type="submit">Сохранить</button>
</template>

<style lang="scss" scoped>
.button {
  border-radius: 10px;
  background: #107eff;
  color: #fff;
  transition: all 0.3s;
  padding: 10px 20px;
  border: none;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    background: #1c40ff;
  }

  &:active {
    box-shadow: inset 0 0 10px 0 rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
</style>
