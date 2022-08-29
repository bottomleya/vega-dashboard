
class Point {
  constructor(name) {
    this.name           =   name;
    this.displayName    =   name;
    this.units          =   "";
    this.feature        =   false;
    this.label          =   false;
    this.categorical    =   false;
    this.color          =   'rgb(54, 162, 235)';
    this.value          =   null;
  }
  
  setName(name) {
    this.name = name;
  }
  setDisplayName(displayName) {
    this.displayName = displayName;
  }
  setUnits(units) {
    this.units = units;
  }
  setAsFeature() {
    this.feature = true;
    this.label = false;
  }
  setAsLabel() {
    this.feature = false;
    this.label = true;
    this.categorical = false;
  }
  setColor(color) {
    this.color = color;
  }
  setValue(value) {
    this.value = value;
  }
}
