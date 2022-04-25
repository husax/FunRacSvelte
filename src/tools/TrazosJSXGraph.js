const GraficaNueva = (brd, param) => {
  brd.suspendUpdate();
  BorraObjGraficos(brd, param);
  const fun1 = brd.create("functiongraph", [param.func], {
    strokewidth: 2,
    name: param.name,
    strokeColor: param.color,
  });
  brd.unsuspendUpdate();
  param.idFuns.push(fun1);
  return param.idFuns.slice();
};

//const CambiaAtrib= (brd, param) => {

//}

const EliminaMultiples = (arr) => {
  let rzant = null;
  const result = [];
  arr.forEach((elem) => {
    if (elem !== rzant) {
      result.push(elem);
    }
    rzant = elem;
  });
  return result;
};

const YaTrazadas = (r, p) => {
  const pant = p.idRaices;
  const rcoor = pant.map((valor) => valor.coords.usrCoords[1]);
  if (rcoor.length === 0) {
    return false;
  }
  for (let i = 0; i < rcoor.length; i++) {
    if (r[i] !== rcoor[i]) {
      return false;
    }
  }
  return true;
};

const GraficaRaices = (brd, param) => {
  const raices = EliminaMultiples(param.raices);
  if (YaTrazadas(raices, param)) {
    return param.idRaices;
  }
  brd.suspendUpdate();
  const ptos = raices.map((raiz, ind) => {
    return brd.create("point", [raiz, param.func(raiz)], {
      name: `r${ind + 1}`,
      face: "x",
      fixed: true,
    });
  });
  brd.unsuspendUpdate();
  param.idRaices = ptos;
  return param.idRaices; // ver esto
};

const BorraObjGraficos = (brd, param) => {
  brd.suspendUpdate();
  while (param.idFuns.length > 0) {
    brd.removeObject(param.idFuns.pop().id, false);
  }
  param.idRaices.forEach((pto) => {
    brd.removeObject(pto.id, false);
  });
  brd.unsuspendUpdate();
};

const AgregaGrafica = (brd, param) => {
  if (param.traza) {
    brd.suspendUpdate();
    let fun1 = brd.create("functiongraph", [param.func], {
      strokewidth: 2,
      name: param.name,
      strokecolor: param.color,
    });
    param.idFuns.push(fun1);
    brd.unsuspendUpdate();
  } else if (param.idFuns.length > 1) {
    brd.removeObject(param.idFuns.pop().id, false);
  }
  return param.idFuns;
};

const MuestraRT = (brd, param) => {
  let pg = brd.create("glider", [param.vxmin, 0, param.func], {
    name: "P",
    size: 3,
    fillColor: param.color,
    strokeColor: param.color,
    face: "[]",
  });
  console.log(brd.getBoundingBox(), brd.canvasHeight, brd.canvasWidth);
  const df = param.deriv;
  const pt1= brd.create("point", [pg.X(), 1], {size:2, strokeColor: "blue"});
  const pt2= brd.create("point", [pg.X() - 1, 1], {size:2, strokeColor: "blue"});
  const sg= brd.create("segment", [pt1, pt2],  {
    strokeColor: "red",
    strokeWidth: 1,
  });
  const rt = (x) => df(pg.X()) * (x - pg.X()) + pg.Y();
  const pga = brd.create("point", [() => pg.X() - .5, () => rt(pg.X() - .5)], {
    size: 2,
    visible: true,
  });
  const pgb = brd.create("point", [() => pg.X() + .5, () => rt(pg.X() + .5)], {
    size: 2,
    visible: true,
  });
  const stang = brd.create("segment", [pga, pgb], {
    strokeColor: "red",
    strokeWidth: 1,
  });

  console.log(pg);
};

export {
  GraficaNueva,
  GraficaRaices,
  AgregaGrafica,
  BorraObjGraficos,
  MuestraRT,
};
