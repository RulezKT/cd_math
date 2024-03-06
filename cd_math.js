const {
  AU,
  DEGREE_RATIO,
  PI,
  MED_EPS,
  SUN,
  MOON,
  oneLineInDec,
  oneColorInDec,
  oneToneInDec,
  oneBaseInDec,
  hexSortByDeg,
  monthsArr,
  zodiacNames,
  planetsNumbers,
  planetsArr,
  planetsPower,
  dispositors,
  SEC_IN_1_DAY,
  JD2000,
  DE440s,
} = require("cd_consts");

/*							atan2()
 *
 *	Quadrant correct inverse circular tangent
 *
 *
 *
 * SYNOPSIS:
 *
 * double x, y, z, atan2();
 *
 * z = atan2( x, y );
 *
 *
 *
 * DESCRIPTION:
 *
 * Returns radian angle between 0 and +2pi whose tangent
 * is y/x.
 *
 *
 *
 * ACCURACY:
 *
 * See atan.c.
 *
 */

/*
Cephes Math Library Release 2.0:  April, 1987
Copyright 1984, 1987 by Stephen L. Moshier
Direct inquiries to 30 Frost Street, Cambridge, MA 02140
Certain routines from the Library, including this one, may
be used and distributed freely provided this notice is retained
and source code is included with all distributions.
*/

function zatan2(x, y) {
  //console.log(`y =  ${y}, x =  ${x},`);

  let z,
    w = 0.0;
  let code;

  code = 0;

  if (x < 0.0) code = 2;
  if (y < 0.0) code |= 1;

  if (x == 0.0) {
    if (code & 1) return 1.5 * PI;
    if (y == 0.0) return 0.0;
    return 0.5 * PI;
  }

  if (y == 0.0) {
    if (code & 2) return PI;
    return 0.0;
  }

  switch (code) {
    default:
    case 0:
      w = 0.0;
      break;
    case 1:
      w = 2.0 * PI;
      break;
    case 2:
    case 3:
      w = PI;
      break;
  }

  z = Math.atan(y / x);

  console.log(`return value from zatan2 =  ${w + z}`);
  return w + z;
}

function atn2(y, x) {
  let phi = 0;

  //console.log(`!!!!!!!!!!! inside atn2`);
  //console.log(`y =  ${y}, x =  ${x},`);

  if (x == 0 && y == 0) {
    return 0;
  }

  const abs_y = Math.abs(y);
  const abs_x = Math.abs(x);

  //console.log(`abs_y =  ${abs_y}, abs_x =  ${abs_x},`);

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan
  // The Math.atan() method returns a numeric value between - π/2  and  π/2  radians. (+90 and -90 degrees)
  // The angle that the line [(0,0);(x,y)] forms with the x-axis in a Cartesian coordinate system - Math.atan(y / x);
  if (abs_x > abs_y) {
    //arctan
    phi = Math.atan(abs_y / abs_x) / RAD_RATIO;
  } else {
    //arctan
    phi = 90 - Math.atan(abs_x / abs_y) / RAD_RATIO;
  }

  // if(x < 0) phi = 180 - phi;
  // if(y < 0) phi = -phi;

  //console.log(`return value from atn2 =  ${phi}`);
  phi = phi / RAD_TO_DEG;

  //if (phi <0) phi = phi + 2*PI;

  return phi;
}

// на сегодня самая корректная
function atn2_RAD(y, x) {
  let phi = 0;

  //console.log(`!!!!!!!!!!! inside atn2`);
  //console.log(`y =  ${y}, x =  ${x},`);

  // азимут вектора
  if (x == 0 && y == 0) {
    return 0;
  }

  const abs_y = Math.abs(y);
  const abs_x = Math.abs(x);

  //console.log(`abs_y =  ${abs_y}, abs_x =  ${abs_x},`);

  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan
  // The Math.atan() method returns a numeric value between - π/2  and  π/2  radians. (+90 and -90 degrees)
  // The angle that the line [(0,0);(x,y)] forms with the x-axis in a Cartesian coordinate system - Math.atan(y / x);
  if (abs_x > abs_y) {
    //arctan
    phi = Math.atan(abs_y / abs_x);
  } else {
    //arctan
    phi = PI / 2 - Math.atan(abs_x / abs_y);
  }

  if (x < 0) phi = PI - phi;
  if (y < 0) phi = -phi;

  //console.log(`return value from atn2 =  ${phi}`);
  return phi;
}

// на сегодня самая корректная
function atn2_RAD_with_360_check(y, x) {
  let phi = atn2_RAD(y, x);

  //если меньше 0 или больше 360 градусов, корректируем
  if (phi < 0) phi = phi + 2 * PI;
  if (phi > 2 * PI) phi = phi - 2 * PI;

  return phi;
}

function atn2_RAD_with_90_check(y, x) {
  let theta = atn2_RAD(y, x);

  //не может быть больше 90 или меньше -90 градусов
  if (theta > PI / 2)
    console.log(
      "!!!atn2_RAD_with_90_check has Problems with +-90degrees %05.5f",
      phi
    );
  if (theta < -PI / 2)
    console.log(
      "!!!atn2_RAD_with_90_check has Problems with +-90degrees %05.5f",
      phi
    );

  return theta;
}

// убирает минус или значения больше 360
// если угол должен быть от 0 до 360
// все в Радианах
function convert_to_0_360_RAD(longitude) {
  const coeff = Math.abs(Math.trunc(longitude / (2 * PI)));
  return longitude < 0
    ? longitude + coeff * 2 * PI + 2 * PI
    : longitude - coeff * 2 * PI;
}

// убирает минус или значения больше 360
// если угол должен быть от 0 до 360
// все в Градусах
function convert_to_0_360_DEG(longitude) {
  const coeff = Math.abs(Math.trunc(longitude / 360));
  return longitude < 0
    ? longitude + coeff * 360 + 360
    : longitude - coeff * 360;
}

module.exports = {
  zatan2,
  atn2,
  atn2_RAD,
  atn2_RAD_with_360_check,
  atn2_RAD_with_90_check,
  convert_to_0_360_RAD,
  convert_to_0_360_DEG,
};
