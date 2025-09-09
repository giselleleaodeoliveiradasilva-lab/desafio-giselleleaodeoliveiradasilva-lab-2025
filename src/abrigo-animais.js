class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
 
    const ANIMAIS = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] }
    };

   
    function atendeOrdem(brinquedosPessoa, brinquedosAnimal) {
      let i = 0;
      for (const brinquedo of brinquedosPessoa) {
        if (brinquedo === brinquedosAnimal[i]) {
          i++;
          if (i === brinquedosAnimal.length) return true;
        }
      }
      return false;
    }

  
    const pessoa1 = brinquedosPessoa1.split(",").map(b => b.trim());
    const pessoa2 = brinquedosPessoa2.split(",").map(b => b.trim());
    const ordem = ordemAnimais.split(",").map(a => a.trim());

   
    const nomesValidos = Object.keys(ANIMAIS);
    const duplicadosAnimais = new Set();
    for (const animal of ordem) {
      if (!nomesValidos.includes(animal)) {
        return { erro: "Animal inválido" };
      }
      if (duplicadosAnimais.has(animal)) {
        return { erro: "Animal inválido" };
      }
      duplicadosAnimais.add(animal);
    }

   
    const brinquedosValidos = new Set(
      Object.values(ANIMAIS).flatMap(a => a.brinquedos)
    );
    function validaBrinquedos(lista) {
      const usados = new Set();
      for (const b of lista) {
        if (!brinquedosValidos.has(b)) return false;
        if (usados.has(b)) return false;
        usados.add(b);
      }
      return true;
    }
    if (!validaBrinquedos(pessoa1) || !validaBrinquedos(pessoa2)) {
      return { erro: "Brinquedo inválido" };
    }

    
    let adotadosPessoa1 = 0;
    let adotadosPessoa2 = 0;
    const resultado = [];

    for (const animalNome of ordem) {
      const animal = ANIMAIS[animalNome];
      let adotante = "abrigo";

      if (animalNome === "Loco") {
       
        if (adotadosPessoa1 > 0) adotante = "pessoa 1";
        else if (adotadosPessoa2 > 0) adotante = "pessoa 2";
      } else {
        const p1ok = atendeOrdem(pessoa1, animal.brinquedos);
        const p2ok = atendeOrdem(pessoa2, animal.brinquedos);

        if (p1ok && !p2ok && adotadosPessoa1 < 3) {
          adotante = "pessoa 1";
          adotadosPessoa1++;
        } else if (!p1ok && p2ok && adotadosPessoa2 < 3) {
          adotante = "pessoa 2";
          adotadosPessoa2++;
        } else {
          adotante = "abrigo"; 
        }
      }

      resultado.push(`${animalNome} - ${adotante}`);
    }

    
    resultado.sort((a, b) => a.localeCompare(b));

    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
