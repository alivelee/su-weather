export function unixTimeToDate( time ) {
  let date = new Date(time * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  return hours + ':' + minutes.substr(-2);
}
export function convert(kelvin) {

  var celsius = kelvin - 273.16;

  if ( typeof celsius !== 'undefined' ) {
    return  Math.round(celsius);
  } else {
    return 'celsius not defined';
  }
}
export function getDay(time) {
  let date = new Date(time*1000);
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return days[date.getDay()];
}