<template>
    <label class="check-wrapper">
      <input type="checkbox" checked="checked">
      <span class="mark"></span>
    </label>
</template>

<style lang="scss" scoped>
.check-wrapper {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  height: 25px;
  width: 25px;
}

.check-wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.mark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #fff;
  border-radius: 4px;
}


.check-wrapper:hover input ~ .mark {
  background-color: #ccc;
}


.check-wrapper input:checked ~ .mark {
  background-color: #00C853;
}


.mark:after {
  content: "";
  position: absolute;
  display: none;
}


.check-wrapper input:checked ~ .mark:after {
  display: block;
}


.check-wrapper .mark:after {
  left: 10px;
  top: 7px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>